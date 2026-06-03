import Link from "next/link";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import type { BlogPost } from "@/lib/blog/types";

export function BlogRelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Related posts</h2>
        <Link
          href="/blog"
          className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
        >
          Browse all posts
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
