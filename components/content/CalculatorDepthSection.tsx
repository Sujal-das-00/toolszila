import { Card } from "@/components/ui/Card";
import type { ToolPageKind } from "@/lib/calculators/tool-content";

interface CalculatorDepthSectionProps {
  kind: ToolPageKind;
}

type DepthContent = {
  heading: string;
  intro: string[];
  cards: { title: string; body: string }[];
  detailTitle: string;
  detailBody: string[];
  limitsTitle: string;
  limits: string[];
};

const CONTENT: Partial<Record<ToolPageKind, DepthContent>> = {
  paycheck: {
    heading: "How to read a paycheck calculator result correctly",
    intro: [
      "A paycheck calculator is only useful when the result is interpreted as a withholding estimate rather than a perfect payroll reproduction. Gross pay, filing status, pay frequency, federal withholding, state rules, Social Security, and Medicare all interact, which is why a strong calculator page should explain the structure behind the number instead of only showing net pay.",
      "This page is designed for that practical use case. It helps users estimate take-home pay, compare states, review annual versus per-check results, and understand why two employees with the same salary can still see different paycheck amounts.",
    ],
    cards: [
      {
        title: "Gross pay comes first",
        body: "Take-home pay starts with annual salary or wages before taxes, pre-tax benefits, and custom payroll deductions are removed.",
      },
      {
        title: "Taxes do different jobs",
        body: "Federal and state income tax are different from Social Security and Medicare. Grouping them together too loosely leads to bad paycheck assumptions.",
      },
      {
        title: "Per-paycheck cash flow matters",
        body: "A weekly, biweekly, semi-monthly, and monthly schedule can produce very different paycheck views even when annual salary stays the same.",
      },
    ],
    detailTitle: "Why paycheck estimates often differ from real payroll",
    detailBody: [
      "Employers may apply custom W-4 settings, local taxes, pre-tax deductions, garnishments, insurance premiums, retirement elections, and payroll-system logic that are not fully represented in a general calculator. That does not make the tool useless. It means the tool is best for planning, comparison, and quick estimation rather than exact paystub replication.",
      "The strongest use case is decision support: comparing two salaries, two states, or two pay frequencies before you need exact HR or payroll-level precision.",
    ],
    limitsTitle: "Important paycheck-calculator limits",
    limits: [
      "Does not automatically include local wage taxes or every municipal payroll rule",
      "Does not fully model custom benefit deductions, garnishments, or employer-specific payroll settings",
      "Treat the result as a planning estimate, then compare it against a real pay stub when accuracy matters",
    ],
  },
  "salary-calculator": {
    heading: "How to use a salary calculator for better planning",
    intro: [
      "A salary calculator is more than an annual-to-monthly converter when it includes tax context. Users usually arrive with questions like how much is a salary after tax, how much lands in each paycheck, or how one state compares with another. That means a deeper page should explain not just the math of salary conversion, but also the limits of salary-based net-pay estimates.",
      "The best use of this page is to turn one annual gross-pay figure into annual, monthly, and paycheck-level planning numbers that are easier to compare across jobs, locations, and household budgets.",
    ],
    cards: [
      {
        title: "Annual salary is only the starting point",
        body: "Real take-home pay still changes with state taxes, filing status, pre-tax deductions, and pay frequency.",
      },
      {
        title: "Monthly budgeting needs after-tax numbers",
        body: "A salary can look strong on paper while monthly usable cash flow feels tighter once taxes and withholding are layered in.",
      },
      {
        title: "State comparison is often the real question",
        body: "Many users search salary figures, but the underlying decision is usually whether the same compensation package works in a different state or metro area.",
      },
    ],
    detailTitle: "When a salary calculator is more useful than a generic income converter",
    detailBody: [
      "Simple converters divide salary by 12 or by the number of paychecks. That is fine for rough gross-pay math, but it misses the main reason most people search for salary tools: they want realistic take-home expectations. Once federal, state, and payroll taxes are added, the page becomes much more decision-relevant for offer evaluation and budgeting.",
      "This also helps with salary negotiation. A higher gross salary does not always mean a proportionally better financial outcome if taxes, cost of living, or benefit elections change at the same time.",
    ],
    limitsTitle: "Important salary-calculator limits",
    limits: [
      "Does not automatically include bonus pay, overtime, equity compensation, or commissions",
      "Does not capture every local tax or employer benefit setup",
      "Best used as a salary-planning tool before deeper payroll review",
    ],
  },
  "tax-calculator": {
    heading: "What a broad tax calculator should help you understand",
    intro: [
      "A broad tax calculator is useful when the user wants one combined estimate rather than separate tax modules. That means it needs to explain how federal income tax, state income tax, Social Security, and Medicare stack together into one annual burden.",
      "Thin tax pages often stop at one total. Better pages also explain what is inside that total, which taxes are marginal versus flat, and why the result is good for planning but not a substitute for a full tax return.",
    ],
    cards: [
      {
        title: "Income tax and payroll tax are different layers",
        body: "A combined tax result is only meaningful if the user understands that federal and state income taxes follow different rules than Social Security and Medicare.",
      },
      {
        title: "Annual tax is not the same as withholding",
        body: "Tax owed for the year and tax withheld through payroll can differ materially, especially with bonuses, side income, or changing filing situations.",
      },
      {
        title: "After-tax income is the planning output",
        body: "Many users care less about tax as an abstract number and more about what remains available to save, spend, or compare across locations.",
      },
    ],
    detailTitle: "Why combined tax estimates are useful",
    detailBody: [
      "A dedicated federal or state tax tool can answer narrower questions, but many planning decisions start with a broader one: how much of my annual income is likely to go to taxes overall. This page is strongest when used for that wide-angle estimate before moving into specialized calculators for federal-only, income-tax-only, or payroll-tax-only analysis.",
      "That makes it useful for salary comparison, freelance planning, relocation scenarios, and annual budgeting where the user needs one headline total plus a basic breakdown.",
    ],
    limitsTitle: "Important tax-calculator limits",
    limits: [
      "Not a full tax-return engine with credits, itemized deductions, or all special-case rules",
      "Local taxes and complex edge cases may not be fully represented",
      "Best used for comparison and planning, not final filing decisions",
    ],
  },
  "income-tax-calculator": {
    heading: "Why an income tax calculator is narrower than a paycheck tool",
    intro: [
      "An income tax calculator is useful when the user specifically wants federal and state income tax without payroll taxes. That narrower scope is valuable because many people use the phrase income tax when they actually mean every deduction on a paycheck, even though Social Security and Medicare are separate systems.",
      "This page works best when it helps users isolate taxable-income questions, compare jurisdictions, and understand what happens before payroll taxes are layered back in elsewhere.",
    ],
    cards: [
      {
        title: "Income tax is not the full paycheck story",
        body: "Federal and state income tax can be analyzed without Social Security and Medicare when the goal is relocation planning or bracket review.",
      },
      {
        title: "Marginal and effective rates answer different questions",
        body: "A strong estimate helps users see both the tax on the next dollar earned and the average burden across total income.",
      },
      {
        title: "States change the result fast",
        body: "The same gross income can lead to very different after-income-tax outcomes depending on state rules, deductions, and bracket structure.",
      },
    ],
    detailTitle: "When this page is the better tool",
    detailBody: [
      "Use an income tax calculator when you want to isolate bracket behavior, compare state tax drag, or study taxable income after deductions without mixing in payroll taxes. That makes it a cleaner tool for many search intents than a full paycheck calculator.",
      "It is especially helpful when users are comparing job locations, modeling freelance income before payroll treatment, or trying to separate income-tax effects from FICA effects.",
    ],
    limitsTitle: "Important income-tax-calculator limits",
    limits: [
      "Excludes Social Security and Medicare by design",
      "Not a substitute for a return-level analysis with credits and itemized deductions",
      "Best used when the question is specifically about income tax rather than total take-home pay",
    ],
  },
  "federal-tax-calculator": {
    heading: "What a federal tax calculator should clarify",
    intro: [
      "Federal tax pages are strongest when they answer one narrow question cleanly: how much federal income tax applies to annual income after the standard deduction and current bracket rules. That means the page should focus on taxable income, bracket layering, and why a top marginal rate does not apply to every dollar earned.",
      "This tool is especially useful for users who are searching for federal tax brackets, taxable income, and federal tax only, without state taxes or payroll taxes added in.",
    ],
    cards: [
      {
        title: "Taxable income matters more than gross salary",
        body: "The standard deduction reduces the income actually run through federal brackets, which is why gross pay alone does not equal federal tax base.",
      },
      {
        title: "Federal brackets are progressive",
        body: "Only the income that falls inside a bracket is taxed at that bracket’s rate, not all income at the highest marginal rate reached.",
      },
      {
        title: "Federal-only views are still useful",
        body: "A narrower page can be easier to reason about when you are trying to understand raises, side income, or bracket effects before adding other tax layers.",
      },
    ],
    detailTitle: "How to use a federal-only estimate well",
    detailBody: [
      "This page is helpful when users want a quick bracket-based estimate or want to study the effect of higher income on federal tax alone. That makes it useful for negotiating compensation, reviewing year-end tax exposure, and understanding why withholding or estimated payments may need adjustment.",
      "Because it excludes state and payroll taxes, it is often a better educational tool than a broader page when the user is specifically trying to understand federal mechanics.",
    ],
    limitsTitle: "Important federal-tax-calculator limits",
    limits: [
      "Does not include state income tax, Social Security, or Medicare",
      "Does not fully model credits, itemized deductions, or special return situations",
      "Best used for federal planning and bracket understanding",
    ],
  },
  "self-employment-tax-calculator": {
    heading: "How to interpret self-employment tax correctly",
    intro: [
      "Self-employment tax confuses many users because it is not the same thing as federal income tax. It is the self-employed equivalent of the Social Security and Medicare payroll tax system, and it follows its own adjustment rules before the tax is applied.",
      "A stronger page should explain that difference clearly so users understand why a self-employment tax result can feel large even before federal and state income tax are added on top of business profits.",
    ],
    cards: [
      {
        title: "Business profit is adjusted first",
        body: "The Schedule SE style calculation starts with adjusted net earnings rather than simply applying payroll-tax rates to gross revenue.",
      },
      {
        title: "The Social Security cap still matters",
        body: "Existing W-2 income can reduce the remaining wage-base room available for the Social Security portion of self-employment tax.",
      },
      {
        title: "This is not your full tax bill",
        body: "Federal and state income tax on business profit still exist separately from the payroll-tax estimate shown here.",
      },
    ],
    detailTitle: "Why self-employment tax feels heavier than many expect",
    detailBody: [
      "Employees usually see only their own payroll-tax share on a pay stub. Self-employed workers effectively carry both the employee and employer sides for Social Security and Medicare purposes. That is one reason the result can look surprisingly large when someone is moving from W-2 income to contract income.",
      "This page is best used for preliminary business-income planning, contractor comparisons, and deciding whether estimated-tax workflows need closer review.",
    ],
    limitsTitle: "Important self-employment-tax-calculator limits",
    limits: [
      "Does not include federal or state income tax on business profit",
      "Not a replacement for full Schedule C and Schedule SE filing review",
      "Best used for planning self-employment payroll-tax exposure early",
    ],
  },
  "social-security-tax-calculator": {
    heading: "What a Social Security tax calculator should help you see",
    intro: [
      "Social Security tax is often one of the least understood paycheck deductions even though the core formula is straightforward. The confusion usually comes from the wage-base cap, the employer match, and how the self-employed equivalent relates to employee withholding.",
      "This page is most useful when it helps users see how much of current wages are still subject to Social Security tax and how the cap changes the result for higher earners.",
    ],
    cards: [
      {
        title: "The wage base creates a hard cap",
        body: "Once wages exceed the annual Social Security wage base, the employee Social Security tax does not keep increasing on wages above that threshold.",
      },
      {
        title: "Employer and self-employed views differ",
        body: "Employees see one side of the tax, employers generally match it, and self-employed workers often care about the combined equivalent.",
      },
      {
        title: "This page is intentionally narrow",
        body: "A focused Social Security page can answer cap-related questions more clearly than a broader tax tool that mixes in Medicare and income tax at the same time.",
      },
    ],
    detailTitle: "When this page is the right tool",
    detailBody: [
      "Use this page when you are near the wage base, comparing high-income payroll scenarios, or trying to understand why Social Security withholding stops increasing after a certain threshold. That is a distinct question from federal tax planning or total paycheck modeling.",
      "It is also useful for business owners and self-employed workers who want a cleaner view of the Social Security layer before considering Medicare and income tax separately.",
    ],
    limitsTitle: "Important Social Security tax limits",
    limits: [
      "Does not model full Medicare or income-tax exposure",
      "Best for wage-base and payroll-cap questions rather than total take-home pay",
      "A narrow payroll-tax tool should be paired with broader calculators when needed",
    ],
  },
  "hourly-to-salary": {
    heading: "Why hourly-to-salary conversion needs context",
    intro: [
      "An hourly-to-salary calculator looks simple, but the usefulness of the result depends on whether the hours assumption is realistic. Converting an hourly wage into annual salary is easy mathematically. Interpreting that annual figure correctly is where the content depth matters.",
      "A stronger page should help users think about overtime, unpaid time off, seasonal schedules, and whether the resulting annual number is a gross-pay comparison tool or a real household budgeting number.",
    ],
    cards: [
      {
        title: "Weekly hours drive the result",
        body: "The largest assumption is not the hourly wage itself. It is how many hours are worked consistently across the year.",
      },
      {
        title: "Gross conversion is not take-home pay",
        body: "This page converts wages into annual gross salary. Users should switch to a paycheck or tax calculator if they need after-tax planning.",
      },
      {
        title: "Schedules are rarely perfectly flat",
        body: "Part-time work, overtime, unpaid leave, and variable shifts can make a simple 40-hour model look cleaner than reality.",
      },
    ],
    detailTitle: "How to get more value from a wage conversion",
    detailBody: [
      "This tool is best for quick job comparisons, freelance rate benchmarking, and rough annual-income framing. It becomes especially helpful when the user wants to compare an hourly role with a salaried role without building a full tax model yet.",
      "Once the gross-pay comparison looks useful, the next step is usually a paycheck or salary calculator so the user can estimate how much of that converted income may actually land after tax.",
    ],
    limitsTitle: "Important hourly-to-salary limits",
    limits: [
      "Does not automatically include overtime, variable schedules, or unpaid time off",
      "Shows gross-pay conversion, not net-pay planning",
      "Best used as a first-step comparison tool",
    ],
  },
  "salary-to-hourly": {
    heading: "How to interpret salary-to-hourly conversion well",
    intro: [
      "A salary-to-hourly calculator is useful because many people receive annual compensation offers but evaluate workload in hours. That means the page should do more than divide salary by a standard number of hours. It should help the user understand when the implied hourly rate is realistic and when the assumptions are too generous.",
      "This is particularly important when users are comparing salaried roles with contract work, freelancing, side gigs, or heavy-workload positions where the published salary may look better than the effective hourly value.",
    ],
    cards: [
      {
        title: "Hours assumption changes everything",
        body: "A salary spread across 35 hours a week and the same salary spread across 55 hours a week produce very different effective hourly rates.",
      },
      {
        title: "Role comparisons need context",
        body: "Salary-to-hourly conversion is often less about payroll and more about negotiation, workload, and opportunity cost.",
      },
      {
        title: "Gross rate is not total value",
        body: "Benefits, bonuses, equity, and paid leave can still make a salaried role more attractive even when the implied hourly rate looks lower.",
      },
    ],
    detailTitle: "Why salary-to-hourly conversion is still useful",
    detailBody: [
      "Even with those limits, this page is valuable because it makes workloads comparable. Many users are trying to answer a practical question: if I actually work this many hours, what is the job paying me on an hourly basis. That can materially change how an offer is perceived.",
      "It also helps freelancers compare a salaried role against a target hourly consulting rate before moving into tax and benefit comparisons.",
    ],
    limitsTitle: "Important salary-to-hourly limits",
    limits: [
      "Does not account for benefits, bonuses, or equity automatically",
      "Depends heavily on realistic weekly-hours assumptions",
      "Best used for role comparison and negotiation framing",
    ],
  },
  overtime: {
    heading: "What overtime calculators help with best",
    intro: [
      "An overtime calculator is strongest when it stays focused on one job: separating regular pay from premium pay and showing how extra hours change weekly gross earnings. That sounds narrow, but it is a high-value use case because many workers struggle to estimate overtime impact quickly and correctly.",
      "A deeper page should explain the role of the overtime multiplier, why regular rate matters, and why overtime math is still gross-pay math unless taxes are layered on elsewhere.",
    ],
    cards: [
      {
        title: "Regular hours and overtime hours are different buckets",
        body: "A correct overtime estimate starts by separating base-pay hours from hours that qualify for premium treatment.",
      },
      {
        title: "The multiplier changes outcomes fast",
        body: "Moving from 1.5x to 2.0x or a custom contractual rate can materially change weekly gross pay.",
      },
      {
        title: "Gross overtime is not net overtime",
        body: "The page helps with gross-pay estimation first. Real take-home impact still depends on withholding and payroll treatment.",
      },
    ],
    detailTitle: "Why overtime pay feels unpredictable",
    detailBody: [
      "Workers often know their hourly rate but still underestimate overtime because the number of premium hours and the exact multiplier can vary week to week. Add taxes, shift differentials, or employer-specific regular-rate rules, and intuition becomes unreliable quickly.",
      "That is why a focused overtime tool is useful even for people who already understand basic hourly math. It reduces friction in a recurring weekly planning task.",
    ],
    limitsTitle: "Important overtime-calculator limits",
    limits: [
      "Does not automatically model labor-law edge cases, bonuses, or complex regular-rate definitions",
      "Shows gross-pay impact first, not exact take-home pay",
      "Best used for weekly premium-pay estimation and comparisons",
    ],
  },
  "bonus-tax": {
    heading: "Why bonus checks often feel overtaxed",
    intro: [
      "A bonus tax calculator is useful because users often confuse supplemental withholding with final tax liability. Bonus checks can look heavily reduced compared with regular salary checks, which leads people to search whether bonuses are taxed differently, why the net bonus looks small, and how much of the bonus they actually keep.",
      "This page is strongest when it explains that the visible withholding on a bonus payment is often a payroll-stage estimate rather than the final annual tax outcome.",
    ],
    cards: [
      {
        title: "Withholding is not always final tax",
        body: "The amount withheld from a bonus check may differ from the ultimate year-end tax effect once all annual income is reconciled.",
      },
      {
        title: "Federal, state, and FICA can all apply",
        body: "A strong bonus estimate separates the major withholding layers so the net result is easier to interpret.",
      },
      {
        title: "Cash-flow planning is the main use case",
        body: "Most users care less about textbook tax theory and more about how much bonus money may actually be available after payroll withholding.",
      },
    ],
    detailTitle: "How to use a bonus estimate well",
    detailBody: [
      "This tool is best for planning the immediate cash effect of supplemental wages. It is especially helpful when the user is deciding how much of a bonus can be allocated to savings, debt payoff, or a major expense without overestimating the net amount.",
      "It also helps set expectations. A bonus can still be valuable even when the initial paycheck withholding looks aggressive.",
    ],
    limitsTitle: "Important bonus-tax-calculator limits",
    limits: [
      "Payroll withholding on bonuses may differ from final year-end tax liability",
      "Employer payroll methods and state rules can change the exact deduction pattern",
      "Best used for cash-flow estimates and quick planning",
    ],
  },
  ipo: {
    heading: "How to use this IPO calculator with more confidence",
    intro: [
      "An IPO calculator is most useful when the market is noisy. Search interest often spikes around listing day, unofficial grey-market chatter, headline valuations, and early stock price moves, but the decision most investors still need to make is simpler: how much money is actually committed, how many shares are actually received, and what return is implied at different prices.",
      "This page is designed for that narrower planning task. It turns issue price, lot size, allotted lots, listing-price assumptions, and exit-price assumptions into a clean scenario view.",
    ],
    cards: [
      {
        title: "Start with actual capital at risk",
        body: "Issue price by itself is not enough. Total allotted shares determine real application amount and exposure.",
      },
      {
        title: "Model more than one outcome",
        body: "Listing day can be volatile, so downside, base-case, and stronger-opening scenarios are usually better than one headline estimate.",
      },
      {
        title: "Separate listing gain from exit gain",
        body: "A later exit price can tell a different story than the first trade, so the page should help users compare both.",
      },
    ],
    detailTitle: "What this IPO page helps clarify",
    detailBody: [
      "The goal is not to predict whether an IPO is good or bad. The goal is to make the capital-at-risk math easier to audit. That includes application amount, listing value, exit value, and percentage return.",
      "This is useful for investors comparing issue price against probable market pricing without having to build a separate spreadsheet for every scenario.",
    ],
    limitsTitle: "Important IPO-calculator limits",
    limits: [
      "Does not predict allocation probability or future market performance",
      "Does not include all fees, taxes, or slippage automatically",
      "Best used for scenario planning rather than investment advice",
    ],
  },
  "net-worth": {
    heading: "How to use a net worth calculator as a real balance-sheet tool",
    intro: [
      "A net worth calculator is often treated like a vanity number, but it is more useful as a simple household balance sheet. When you total assets, subtract liabilities, and repeat the same method over time, you get a clearer picture of progress than you would from income alone.",
      "That is why this page is broader than a single output. It helps users think through liquid assets, long-term assets, debt structure, and which category is actually driving the change in net worth.",
    ],
    cards: [
      {
        title: "Assets explain what you own",
        body: "Cash, investments, retirement balances, property, and business interests all shape the asset side of the balance sheet.",
      },
      {
        title: "Liabilities explain what you owe",
        body: "Mortgages, student loans, auto loans, and revolving debt can materially reduce wealth even when income is solid.",
      },
      {
        title: "Trend matters more than one snapshot",
        body: "Repeated monthly or quarterly tracking is more useful than one isolated reading because it shows direction, not just level.",
      },
    ],
    detailTitle: "Why net worth pages need more than one number",
    detailBody: [
      "A deeper page should help users distinguish total net worth from liquid net worth and explain why leverage, illiquid assets, and debt structure matter. Two households can have similar total net worth and very different short-term flexibility.",
      "That is why this tool is valuable for budgeting, resilience planning, and long-term wealth tracking, not just curiosity about a headline number.",
    ],
    limitsTitle: "Important net-worth-calculator limits",
    limits: [
      "Asset values may still require judgment, especially for real estate and business interests",
      "The page does not replace formal financial statements or tax valuations",
      "Best used for consistent tracking over time with the same categories",
    ],
  },
};

export function CalculatorDepthSection({ kind }: CalculatorDepthSectionProps) {
  const content = CONTENT[kind];
  if (!content) return null;

  return (
    <section className="mt-12 space-y-8" aria-labelledby="calculator-depth-section-heading">
      <div className="max-w-4xl">
        <h2
          id="calculator-depth-section-heading"
          className="text-2xl font-bold tracking-tight text-slate-900"
        >
          {content.heading}
        </h2>
        {content.intro.map((paragraph) => (
          <p key={paragraph} className="mt-3 text-sm leading-relaxed text-slate-600">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {content.cards.map((card) => (
          <Card key={card.title}>
            <h3 className="font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.body}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <h3 className="font-semibold text-slate-900">{content.detailTitle}</h3>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
            {content.detailBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-slate-900">{content.limitsTitle}</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
            {content.limits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
