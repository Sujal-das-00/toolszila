/** Server component for JSON-LD structured data injection. */
export function JsonLd({ data }: { data: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: data.replace(/</g, "\u003c") }}
    />
  );
}
