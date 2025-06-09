import {
  getAllPosts,
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
} from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Compact PostCard component for Recent Posts
export default async function CompactPostCard({ post }) {
  const media = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
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
        "group flex flex-col gap-3 transition-shadow shadow-sm hover:shadow-md rounded-lg overflow-hidden bg-transparent border-none"
      )}
    >
      {media?.source_url && (
        <Image
          className="rounded-lg object-cover w-full h-48"
          src={media.source_url}
          alt={post.title?.rendered || "Post thumbnail"}
          width={400}
          height={192}
          priority
        />
      )}
      <div className="flex flex-col gap-2">
        <div
          dangerouslySetInnerHTML={{
            __html: post.title?.rendered || "Untitled Post",
          }}
          className="text-lg font-semibold text-primary group-hover:underline underline-offset-2 line-clamp-2"
        ></div>
        <div
          className="text-sm text-muted-foreground line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: post.excerpt?.rendered
              ? post.excerpt.rendered.split(" ").slice(0, 15).join(" ").trim() +
                "..."
              : "No excerpt available",
          }}
        ></div>
        <div className="flex flex-col text-xs text-muted-foreground gap-1 mt-1">
          <span>{category?.name || "Uncategorized"}</span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}
