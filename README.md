# PaycheckCalc — US Paycheck Calculator

Production-grade US paycheck calculator built with Next.js 15, optimized for SEO, Core Web Vitals, and programmatic SEO at scale.

## Features

- **Paycheck Calculator** — Federal, state, Social Security, and Medicare tax estimates
- **50 State Pages** — `/texas-paycheck-calculator`, `/california-paycheck-calculator`, etc.
- **Salary Pages** — `/50000-salary-after-tax` through `/300000-salary-after-tax`
- **Special Calculators** — Hourly/salary conversion, overtime, bonus tax
- **SEO** — Dynamic metadata, JSON-LD (FAQ, Breadcrumb, Calculator, Article), sitemap, robots.txt
- **Performance** — SSG, server components, lazy-loaded ads, minimal client JS

## Tech Stack

- Next.js 15+ App Router
- TypeScript
- Tailwind CSS 4
- JSON tax data (no backend required)

## Project Structure

```
app/                    # Routes (SSG pages, sitemap, robots)
components/
  calculator/           # Interactive calculator (client) + results (server)
  content/              # FAQ, internal links
  layout/               # Header, footer
  seo/                  # JsonLd, breadcrumbs
  ads/                  # Lazy-loaded ad slots
data/
  federal/              # Federal tax brackets by year
  fica/                 # Social Security & Medicare rates
  states/               # All 50 state tax configurations
lib/
  tax/                  # Tax engine (federal, state, fica, salary)
  seo/                  # Metadata & schema builders
  pseo/                 # Programmatic SEO routing
  content/              # Content templates
types/                  # Shared TypeScript types
```

## Tax Engine

Tax logic lives in `lib/tax/` as pure functions:

| Module | Purpose |
|--------|---------|
| `federal.ts` | Progressive federal income tax |
| `state.ts` | Flat & progressive state tax |
| `fica.ts` | Social Security & Medicare |
| `salary.ts` | Paycheck orchestration, conversions |
| `data-loader.ts` | JSON data imports |

### Updating Tax Rates (Annual)

1. Add new JSON files: `data/federal/2026.json`, `data/fica/2026.json`, `data/states/2026.json`
2. Update `data/tax-year.json` to point to the new files
3. Update imports in `lib/tax/data-loader.ts`
4. Rebuild and deploy

## Programmatic SEO

All PSEO pages are generated via `generateStaticParams` in `app/[slug]/page.tsx`:

- **State pages**: `{state-slug}-paycheck-calculator` (50 pages)
- **Salary pages**: `{amount}-salary-after-tax` ($50k–$300k in $10k steps)

To add more salary tiers, extend `SALARY_AMOUNTS` in `lib/constants.ts`.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Production URL for canonical/OG tags |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console verification |

## Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy — all pages statically generated at build time

```bash
npm run build
npm run start
```

### Build Output

Expect ~80+ static pages at MVP (1 home + 4 calculators + 50 states + 26 salaries).

## Analytics & Ads

- **Google Analytics**: Set `NEXT_PUBLIC_GA_ID` — loaded `afterInteractive`
- **Google Search Console**: Set `NEXT_PUBLIC_GSC_VERIFICATION`
- **Ad slots**: `components/ads/AdSlot.tsx` — lazy-loaded via Intersection Observer

Replace ad placeholders with AdSense/Mediavine/Raptive scripts after approval.

## Core Web Vitals Strategy

| Metric | Approach |
|--------|----------|
| LCP | Server-rendered hero, system fonts with `display: swap` |
| CLS | Reserved ad slot heights, no dynamic font loading |
| INP | Minimal client JS; calculator only on interactive pages |

## Disclaimer

This calculator provides estimates only. Actual withholding depends on W-4 elections, pre-tax deductions, local taxes, credits, and other factors. Not tax advice — consult a qualified professional.

## License

Private — all rights reserved.
