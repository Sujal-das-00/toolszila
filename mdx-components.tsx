import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";

const components: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    if (href.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} {...props} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    );
  },
  img: ({ alt = "", ...props }) => (
    <Image
      alt={alt}
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      {...props}
      width={1200}
      height={675}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
