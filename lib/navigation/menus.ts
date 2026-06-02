import {
  TOOL_CATEGORIES,
  getLiveTools,
  getPopularTools,
  toolPath,
} from "./site-architecture";

/** Live calculators shown in the header Calculators dropdown only. */
function getHeaderCalculatorLinks(): NavLink[] {
  return getLiveTools().map((tool) => ({
    label: tool.title,
    href: tool.slug === "paycheck-calculator" ? "/" : toolPath(tool),
    description: tool.description,
  }));
}

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavDropdown {
  label: string;
  id: string;
  sections: { title?: string; links: NavLink[] }[];
}

export const MAIN_NAV: (NavLink | NavDropdown)[] = [
  { label: "Home", href: "/" },
  {
    label: "Calculators",
    id: "calculators",
    sections: [{ links: getHeaderCalculatorLinks() }],
  },
  {
    label: "Tools",
    id: "tools",
    sections: [
      {
        links: [
          { label: "All Tools", href: "/tools" },
          { label: "Popular Tools", href: "/tools/popular" },
          { label: "New Tools", href: "/tools/new" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    id: "resources",
    sections: [
      {
        links: [
          { label: "Guides", href: "/guides" },
          { label: "Articles", href: "/articles" },
          { label: "FAQ", href: "/faq" },
          { label: "Methodology", href: "/methodology" },
        ],
      },
    ],
  },
  {
    label: "Company",
    id: "company",
    sections: [
      {
        links: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
        ],
      },
    ],
  },
];

export const FOOTER_COLUMNS = {
  product: {
    title: "Product",
    links: [
      { label: "All Calculators", href: "/calculators" },
      { label: "Popular Tools", href: "/tools/popular" },
      ...TOOL_CATEGORIES.map((c) => ({
        label: c.label.replace(" Calculators", ""),
        href: c.path,
      })),
    ] as NavLink[],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Blog", href: "/articles" },
      { label: "Guides", href: "/guides" },
      { label: "FAQ", href: "/faq" },
      { label: "Methodology", href: "/methodology" },
    ] as NavLink[],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
    ] as NavLink[],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Cookie Policy", href: "/cookies" },
      { label: "GDPR Notice", href: "/gdpr" },
      { label: "CCPA Notice", href: "/ccpa" },
    ] as NavLink[],
  },
};

export function getFooterPopularTools(): NavLink[] {
  return getPopularTools().map((t) => ({
    label: t.title,
    href: `/calculators/${t.category}/${t.slug}`,
  }));
}

export function getFooterAllLiveTools(): NavLink[] {
  return getLiveTools().map((t) => ({
    label: t.title,
    href: `/calculators/${t.category}/${t.slug}`,
  }));
}

export function isNavDropdown(item: NavLink | NavDropdown): item is NavDropdown {
  return "sections" in item;
}
