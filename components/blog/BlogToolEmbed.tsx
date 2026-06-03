import { Card } from "@/components/ui/Card";
import { getBlogTool } from "@/lib/blog/tool-registry";

export function BlogToolEmbed({ toolId }: { toolId: string }) {
  const tool = getBlogTool(toolId);

  if (!tool) {
    return (
      <Card>
        <p className="text-sm font-medium text-slate-900">Missing blog tool mapping</p>
        <p className="mt-2 text-sm text-slate-600">
          Add <code>{toolId}</code> to <code>lib/blog/tool-registry.ts</code> to
          render a tool above this article.
        </p>
      </Card>
    );
  }

  const ToolComponent = tool.component;

  return (
    <section aria-labelledby="blog-tool-heading" className="space-y-4">
      <div>
        <h2 id="blog-tool-heading" className="text-2xl font-bold text-slate-900">
          {tool.label}
        </h2>
        <p className="mt-2 text-slate-600">{tool.description}</p>
      </div>
      <ToolComponent />
    </section>
  );
}
