import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { formatBlogDate } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog/types";

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card className="h-full">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-emerald-700">
          <span>{post.frontmatter.category}</span>
          <span>{formatBlogDate(post.frontmatter.date)}</span>
        </div>
        <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
          <Link href={post.path} className="hover:text-emerald-700">
            {post.frontmatter.title}
          </Link>
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {post.frontmatter.description}
        </p>
        <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
          <span>{post.readingTime}</span>
          <Link
            href={post.path}
            className="font-medium text-emerald-700 hover:text-emerald-800"
          >
            Read article
          </Link>
        </div>
      </div>
    </Card>
  );
}
