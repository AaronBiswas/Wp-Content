import Image from "next/image";
import Link from "next/link";

import { Post } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";

import {
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
} from "@/lib/wordpress";

export async function PostCard({ post }: { post: Post }) {
  const media = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;
  const author = post.author ? await getAuthorById(post.author) : null;
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = post.categories?.[0]
    ? await getCategoryById(post.categories[0])
    : null;

  return (
    <Link
      href={`/posts/${post.slug}`}
      className={cn(
        "p-8 rounded-xl group flex flex-col gap-8 transition-shadow hover:shadow-lg bg-transparent border-none"
      )}
    >
      <div className="flex flex-col gap-4">
        {media?.source_url && (
          <Image
            className="rounded-lg object-cover w-full h-64"
            src={media.source_url}
            alt={post.title?.rendered || "Post thumbnail"}
            width={800}
            height={320}
            priority
          />
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: post.title?.rendered || "Untitled Post",
          }}
          className="text-3xl text-primary font-bold group-hover:underline underline-offset-4"
        ></div>
        <div
          className="text-lg text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: post.excerpt?.rendered
              ? post.excerpt.rendered.split(" ").slice(0, 24).join(" ").trim() +
                "..."
              : "No excerpt available",
          }}
        ></div>
      </div>
      <div className="flex flex-col items-start text-base text-muted-foreground mt-4 gap-1">
        <span>{category?.name || "Uncategorized"}</span>
        <span>{date}</span>
      </div>
    </Link>
  );
}
