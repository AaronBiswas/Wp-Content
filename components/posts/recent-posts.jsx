import CompactPostCard from "./CompactPostCard";

export default function RecentPosts({ posts = [] }) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="w-full">
            <CompactPostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
