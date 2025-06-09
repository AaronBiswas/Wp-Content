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
      <Container>
        <div className="space-y-8">
          <div className="flex justify-between items-center gap-4">
            <h2 className="text-2xl font-semibold">Retax</h2>
            <Selector search={search} />
          </div>
          <Separator />
          <Prose>
            <p className="text-muted-foreground">
              {posts.length} {posts.length === 1 ? "post" : "posts"} found
              {search && " matching your search"}
            </p>
          </Prose>

          <div className="w-full">
            <RecentPosts count={4} />
          </div>

          <Separator />

          {paginatedPosts.length > 0 ? (
            <div className="flex flex-col gap-8">
              {paginatedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
              <p>No posts found</p>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={
                      page <= 1 ? "pointer-events-none opacity-50" : ""
                    }
                    href={createPaginationUrl(page - 1)}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href={createPaginationUrl(page)}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className={
                      page >= totalPages ? "pointer-events-none opacity-50" : ""
                    }
                    href={createPaginationUrl(page + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </Container>
    </Section>
  );
}
