import { getAllPosts } from "@/lib/wordpress";
import CompactPostCard from "./CompactPostCard";


export default async function RecentPosts({ count = 4 }) {
  const posts = await getAllPosts();
  const sorted = [...posts]
  .filter(p => p.status === "publish")
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, count);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sorted.map((post) => (
          <div key={post.id} className="w-full">
            <CompactPostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}