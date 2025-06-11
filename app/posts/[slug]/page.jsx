import {
  getPostBySlug,
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
  getAllPosts,
} from "@/lib/wordpress";

import { Section, Container, Article, Prose } from "@/components/craft";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/app/site.config";

import Link from "next/link";
import Balancer from "react-wrap-balancer";

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
  ogUrl.searchParams.append("title", post.title.rendered);
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").trim();
  ogUrl.searchParams.append("description", description);

  return {
    title: post.title.rendered,
    description: description,
    openGraph: {
      title: post.title.rendered,
      description: description,
      type: "article",
      url: `${siteConfig.site_domain}/posts/${post.slug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title.rendered,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.rendered,
      description: description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const featuredMedia = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;
  const author = await getAuthorById(post.author);
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = await getCategoryById(post.categories[0]);

  return (
    <Section>
      <Container className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-6 sm:mb-8">
          <Prose className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6 px-2 sm:px-0">
              <Balancer>
                <span
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                ></span>
              </Balancer>
            </h1>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 text-sm text-muted-foreground mb-6 sm:mb-8 border-b pb-4 sm:pb-6 px-2 sm:px-0">
              <div className="flex items-center gap-2">
                <Link
                  href={`/posts/?category=${category.id}`}
                  className={cn(
                    badgeVariants({ variant: "outline" }),
                    "!no-underline text-xs uppercase font-semibold px-3 py-1"
                  )}
                >
                  {category.name}
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left">
                <span className="whitespace-nowrap">Published {date}</span>
                {author.name && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span className="whitespace-nowrap">
                      By{" "}
                      <Link
                        href={`/posts/?author=${author.id}`}
                        className="font-medium hover:underline"
                      >
                        {author.name}
                      </Link>
                    </span>
                  </>
                )}
              </div>
            </div>
          </Prose>
        </div>

        {featuredMedia?.source_url && (
          <div className="mb-8 sm:mb-12 -mx-4 sm:mx-0">
            <div className="relative h-48 sm:h-64 md:h-96 lg:h-[500px] overflow-hidden sm:rounded-lg bg-accent/25">
              <img
                className="w-full h-full object-cover"
                src={featuredMedia.source_url}
                alt={post.title.rendered}
              />
            </div>
            {featuredMedia.caption && (
              <p className="text-sm text-muted-foreground mt-2 text-center italic max-w-2xl mx-auto px-4 sm:px-0">
                <span
                  dangerouslySetInnerHTML={{
                    __html: featuredMedia.caption.rendered,
                  }}
                />
              </p>
            )}
          </div>
        )}

        <div className="max-w-2xl mx-auto px-4 sm:px-0">
          <Article
            className="prose prose-sm sm:prose-base lg:prose-lg max-w-none leading-relaxed 
                     prose-headings:font-semibold prose-headings:leading-tight
                     prose-p:mb-4 prose-p:leading-relaxed
                     prose-img:rounded-lg prose-img:my-6
                     prose-blockquote:border-l-4 prose-blockquote:border-accent
                     prose-blockquote:pl-4 prose-blockquote:italic
                     prose-ul:my-4 prose-ol:my-4
                     prose-li:mb-2
                     dark:text-white
                     text-justify"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>

        <div className="max-w-2xl mx-auto mt-8 sm:mt-12 pt-6 sm:pt-8 border-t px-4 sm:px-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 text-sm text-muted-foreground">
            <div className="text-center sm:text-left">Last updated: {date}</div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span>Filed under:</span>
              <Link
                href={`/posts/?category=${category.id}`}
                className="font-medium hover:underline"
              >
                {category.name}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
