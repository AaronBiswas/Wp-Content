import {
  getAllPosts,
  getAllAuthors,
  getAllTags,
  getAllCategories,
  searchAuthors,
  searchTags,
  searchCategories,
} from "@/lib/wordpress";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Section, Container, Prose } from "@/components/craft";
import { PostCard } from "@/components/posts/post-card";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import Selector from "@/components/nav/Selector";
import { Separator } from "@/components/ui/separator";
import RecentPosts from "@/components/posts/recent-posts";

export const metadata = {
  title: "Blog Posts",
  description: "Browse all our blog posts",
};

export const dynamic = "auto";
export const revalidate = 600;

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const { author, tag, category, page: pageParam, search } = params;

  const [posts, authors, tags, categories] = await Promise.all([
    getAllPosts({ author, tag, category, search }),
    search ? searchAuthors(search) : getAllAuthors(),
    search ? searchTags(search) : getAllTags(),
    search ? searchCategories(search) : getAllCategories(),
  ]);

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const postsPerPage = 9;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const paginatedPosts = posts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  const createPaginationUrl = (newPage) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set("page", newPage.toString());
    if (category) params.set("category", category);
    if (author) params.set("author", author);
    if (tag) params.set("tag", tag);
    if (search) params.set("search", search);
    return `/posts${params.toString() ? `?${params.toString()}` : ""}`;
  };

  return (
    <Section>
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Retax</h2>
            <div className="w-full sm:w-auto">
              <Selector search={search} />
            </div>
          </div>

          <Separator />

          <Prose>
            <p className="text-muted-foreground text-sm sm:text-base">
              {posts.length} {posts.length === 1 ? "post" : "posts"} found
              {search && " matching your search"}
            </p>
          </Prose>

          <div className="w-full">
            <div className="mb-4 sm:mb-6">
              <RecentPosts count={4} />
            </div>
          </div>

          <Separator />

          {paginatedPosts.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Main Posts Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {paginatedPosts.map((post) => (
                    <div key={post.id} className="w-full">
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>
              </div>

              <aside className="w-full lg:w-[320px] mt-8 lg:mt-0">
                <div className="sticky top-6">
                  <h2 className="text-xl font-semibold mb-4 px-2 sm:px-0">
                    You might also like!
                  </h2>
                  <div className="flex flex-col gap-4 sm:gap-6">
                    {posts.slice(0, 3).map((post) => (
                      <div key={`sidebar-${post.id}`} className="w-full">
                        <PostCard post={post} />
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center mx-4 sm:mx-0">
              <p className="text-center text-muted-foreground">
                No posts found
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center pt-6 sm:pt-8">
              <Pagination>
                <PaginationContent className="flex-wrap gap-1 sm:gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      className={cn(
                        "text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2",
                        page <= 1 ? "pointer-events-none opacity-50" : ""
                      )}
                      href={createPaginationUrl(page - 1)}
                    />
                  </PaginationItem>

                  {(() => {
                    const showPages = [];
                    const maxVisiblePages = 5;

                    if (totalPages <= maxVisiblePages) {
                      for (let i = 1; i <= totalPages; i++) {
                        showPages.push(i);
                      }
                    } else {
                      const startPage = Math.max(1, page - 2);
                      const endPage = Math.min(totalPages, page + 2);

                      if (startPage > 1) {
                        showPages.push(1);
                        if (startPage > 2) showPages.push("...");
                      }

                      for (let i = startPage; i <= endPage; i++) {
                        showPages.push(i);
                      }

                      if (endPage < totalPages) {
                        if (endPage < totalPages - 1) showPages.push("...");
                        showPages.push(totalPages);
                      }
                    }

                    return showPages.map((pageNum, index) => (
                      <PaginationItem key={index}>
                        {pageNum === "..." ? (
                          <span className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm">
                            ...
                          </span>
                        ) : (
                          <PaginationLink
                            href={createPaginationUrl(pageNum)}
                            isActive={pageNum === page}
                            className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 min-w-[32px] sm:min-w-[40px]"
                          >
                            {pageNum}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ));
                  })()}

                  <PaginationItem>
                    <PaginationNext
                      className={cn(
                        "text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2",
                        page >= totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      )}
                      href={createPaginationUrl(page + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
