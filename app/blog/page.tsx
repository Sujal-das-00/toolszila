import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import {
  getAllBlogPosts,
  getBlogCategories,
  getBlogPagination,
  getFeaturedPosts,
  getLatestPosts,
} from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description: "Guides, explainers, and calculator-backed articles from ToolsZila.",
  path: "/blog",
});

interface BlogIndexPageProps {
  searchParams?: Promise<{
    page?: string;
    q?: string;
    category?: string;
  }>;
}

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const params = (await searchParams) ?? {};
  const page = Number(params.page ?? "1");
  const query = params.q?.trim() ?? "";
  const category = params.category?.trim() ?? "";
  const [{ posts, currentPage, totalPages, totalPosts }, categories, allPosts] =
    await Promise.all([
      getBlogPagination(page, query, category || undefined),
      getBlogCategories(),
      getAllBlogPosts(),
    ]);

  const featuredPosts = getFeaturedPosts(allPosts).slice(0, 2);
  const latestPosts = getLatestPosts(allPosts, 5);

  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
            ]}
          />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            ToolsZila Blog
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            In-depth guides, calculator-backed explainers, and practical finance content designed to help
            you make better money decisions with clearer numbers and fewer assumptions.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          <form className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 md:grid-cols-[minmax(0,1fr)_220px_auto]">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search blog posts"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-500"
            />
            <select
              name="category"
              defaultValue={category}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500"
            >
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.label} ({item.count})
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Search
            </button>
          </form>

          {featuredPosts.length > 0 && !query && !category ? (
            <section className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-900">Featured posts</h2>
                <p className="text-sm text-slate-500">
                  Selected guides and explainers worth starting with.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {featuredPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          ) : null}

          <section className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-slate-900">
                {query || category ? "Search results" : "All posts"}
              </h2>
              <p className="text-sm text-slate-500">{totalPosts} posts</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
            {posts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
                No posts matched this search.
              </div>
            ) : null}
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              query={query || undefined}
              category={category || undefined}
            />
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">Categories</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/blog" className="text-slate-700 hover:text-emerald-700">
                  All posts ({allPosts.length})
                </Link>
              </li>
              {categories.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog?category=${item.slug}`}
                    className="text-slate-700 hover:text-emerald-700"
                  >
                    {item.label} ({item.count})
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-900">Latest posts</h2>
              <Link href="/blog" className="text-sm text-emerald-700 hover:text-emerald-800">
                View all
              </Link>
            </div>
            <ul className="mt-4 space-y-4">
              {latestPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={post.path} className="block hover:opacity-90">
                    <p className="font-medium text-slate-900">{post.frontmatter.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{post.frontmatter.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
