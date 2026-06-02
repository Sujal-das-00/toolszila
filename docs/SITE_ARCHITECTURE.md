# ToolsZila — Site Architecture & SEO

## Brand positioning

- **Name:** ToolsZila
- **Tagline:** Smart Calculators & Financial Tools
- **Positioning:** Multi-category calculator platform (not a single paycheck site)

## URL hierarchy

```
/                                    Platform home
/calculators                         All calculators index
/calculators/{category}              Category hub (income, tax, insurance, finance, travel)
/calculators/{category}/{tool}       Live tool pages (canonical)
/tools                               All live tools directory
/tools/popular                       Popular tools
/{state}-paycheck-calculator         PSEO state pages (legacy path, retained)
/{amount}-salary-after-tax           PSEO salary pages (legacy path, retained)
```

### Breadcrumb pattern (tools)

`Home → Calculators → {Category} → {Tool Title}`

Example: `/calculators/income/paycheck-calculator`

## Adding a new tool (500+ scale)

1. Add entry to `lib/navigation/site-architecture.ts` (`TOOL_REGISTRY`)
2. Set `status: "live"` when ready
3. Add content in `lib/calculators/tool-content.ts` and wire `ToolRenderer`
4. Sitemap and nav update automatically

## Legacy redirects

Root paths like `/hourly-to-salary-calculator` redirect to `/calculators/income/hourly-to-salary-calculator` via `next.config.ts`.

## AdSense compliance checklist

| Requirement | URL |
|-------------|-----|
| Privacy Policy (cookies, AdSense, analytics, rights) | `/privacy` |
| Terms of Service | `/terms` |
| Disclaimer (financial, tax, insurance) | `/disclaimer` |
| About Us | `/about` |
| Contact (form + email) | `/contact` |
| Cookie Policy | `/cookies` |
| GDPR Notice | `/gdpr` |
| CCPA Notice | `/ccpa` |

**Trust signals:** methodology page, footer legal links, on-page disclaimers, contact email, last-reviewed dates.

## SEO recommendations

1. **Canonical URLs:** Use `/calculators/...` for all new tools; keep PSEO slugs until migrated.
2. **Internal linking:** Category hubs → tools; home → popular tools; footer columns.
3. **Schema:** `WebPage`, `BreadcrumbList`, `SoftwareApplication` on calculator pages.
4. **Index legal pages:** Privacy/terms are indexable (required for AdSense transparency).
5. **Core Web Vitals:** Sticky header uses `backdrop-blur`; reserve ad slot height (`ad-slot` class).

## Responsive design

- Desktop: hover-free dropdowns via click (`DesktopNav`)
- Mobile: slide-in drawer with expandable sections (`MobileNav`)
- Breakpoints: `md` nav hide, `lg` full desktop gap

## File map

| Concern | Location |
|---------|----------|
| Tool registry | `lib/navigation/site-architecture.ts` |
| Header/footer menus | `lib/navigation/menus.ts` |
| Header | `components/layout/Header.tsx` |
| Mobile nav | `components/layout/MobileNav.tsx` |
| Desktop nav | `components/layout/DesktopNav.tsx` |
| Footer | `components/layout/Footer.tsx` |
| Dynamic tool pages | `app/calculators/[category]/[tool]/page.tsx` |
