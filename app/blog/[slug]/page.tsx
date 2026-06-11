import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogInternalLinks } from "@/components/blog/BlogInternalLinks";
import { BlogPostMeta } from "@/components/blog/BlogPostMeta";
import { BlogPrevNextNav } from "@/components/blog/BlogPrevNextNav";
import { BlogRelatedPosts } from "@/components/blog/BlogRelatedPosts";
import { BlogTableOfContents } from "@/components/blog/BlogTableOfContents";
import { BlogToolEmbed } from "@/components/blog/BlogToolEmbed";
import {
  buildBlogBreadcrumbs,
  buildBlogMetadata,
  getAdjacentPosts,
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedPosts,
  renderBlogPost,
} from "@/lib/blog";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildJsonLdGraph,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/constants";

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return buildBlogMetadata(post);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const rendered = await renderBlogPost(slug);
  if (!rendered) notFound();

  const { post, content } = rendered;
  const [relatedPosts, adjacent] = await Promise.all([
    getRelatedPosts(slug, 3),
    getAdjacentPosts(slug),
  ]);

  const breadcrumbs = buildBlogBreadcrumbs(post);
  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema(breadcrumbs),
    buildWebPageSchema({
      name: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `${siteConfig.url}${post.path}`,
      dateModified: post.lastUpdated,
    }),
    buildArticleSchema({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: ``,
      datePublished: post.frontmatter.date,
      dateModified: post.lastUpdated,
      keywords: post.frontmatter.keywords,
      articleSection: post.frontmatter.category,
    }),
    ...(post.frontmatter.faq && post.faqItems.length > 0
      ? [buildFaqSchema(post.faqItems)]
      : []),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="bg-slate-50">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <Breadcrumbs items={breadcrumbs} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              {post.frontmatter.category}
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {post.frontmatter.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {post.frontmatter.description}
            </p>
            <div className="mt-6 space-y-3">
              <BlogPostMeta post={post} />
              <p className="max-w-3xl text-sm leading-6 text-slate-600">
                Reviewed by the ToolsZila editorial team using published tax sources, versioned data inputs, and calculator methodology notes for clarity and accuracy.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-10">
            <BlogToolEmbed toolId={post.frontmatter.tool} />

            <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
              {content}
            </article>

            <BlogInternalLinks items={post.internalLinks} />
            <BlogPrevNextNav previous={adjacent.previous} next={adjacent.next} />
            <BlogRelatedPosts posts={relatedPosts} />
          </div>

          <div className="space-y-6">
            <BlogTableOfContents items={post.headings} />
          </div>
        </div>
      </div>
    </>
  );
}
