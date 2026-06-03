import { formatBlogDate } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog/types";

export function BlogPostMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
      <span>{formatBlogDate(post.frontmatter.date)}</span>
      <span>{post.readingTime}</span>
      <span>Updated {formatBlogDate(post.lastUpdated)}</span>
      <span>{post.wordCount} words</span>
      <span>{post.frontmatter.category}</span>
    </div>
  );
}
