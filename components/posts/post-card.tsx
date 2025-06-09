import Image from "next/image";
import Link from "next/link";

import { Post } from "@/lib/wordpress.d";
import {
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
} from "@/lib/wordpress";

export async function PostCard({ post }: { post: Post }) {
  const media = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;
  const category = post.categories?.[0]
    ? await getCategoryById(post.categories[0])
    : null;

  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex flex-col gap-2 rounded-md p-4 bg-background shadow-sm hover:shadow-md transition-shadow"
    >
      {media?.source_url && (
        <Image
          className="w-full h-48 object-cover"
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
        className="text-xl font-semibold leading-tight group-hover:underline underline-offset-2"
      />

      <div
        className="text-sm text-muted-foreground leading-snug"
        dangerouslySetInnerHTML={{
          __html: post.excerpt?.rendered
            ? post.excerpt.rendered.split(" ").slice(0, 20).join(" ").trim() +
              "..."
            : "No excerpt available",
        }}
      />

      <div className="text-xs text-muted-foreground mt-1">
        <span>{category?.name || "Uncategorized"}</span> · <span>{date}</span>
      </div>
    </Link>
  );
}
