import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  buildCategoryBreadcrumbs,
  getBlogCategories,
  getBlogPostsByCategory,
} from "@/lib/blog";

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getBlogCategories();
  return categories.map((category) => ({ category: category.slug }));
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categories = await getBlogCategories();
  const current = categories.find((item) => item.slug === category);
  if (!current) return {};

  return buildPageMetadata({
    title: `${current.label} Blog Posts`,
    description: `Browse ${current.label.toLowerCase()} articles and calculator-backed guides from ToolsZila.`,
    path: `/blog/category/${current.slug}`,
  });
}

export default async function BlogCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categories = await getBlogCategories();
  const current = categories.find((item) => item.slug === category);
  if (!current) notFound();

  const posts = await getBlogPostsByCategory(category);
  const breadcrumbs = buildCategoryBreadcrumbs(current.label, current.slug);

  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            {current.label}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            {posts.length} article{posts.length === 1 ? "" : "s"} in this category.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
