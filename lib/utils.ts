/** Minimal className merge utility (no external dependency). */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Format number as USD currency. */
export function formatMoney(amount: number, precise = false): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: precise ? 2 : 0,
    maximumFractionDigits: precise ? 2 : 0,
  }).format(amount);
}

/** Format decimal as percentage string. */
export function formatPct(rate: number): string {
  return `${(rate * 100).toFixed(1)}%`;
}
