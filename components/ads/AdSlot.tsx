"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AdProvider = "adsense" | "mediavine" | "raptive";

interface AdSlotProps {
  /** Ad slot identifier — map to provider-specific IDs in production. */
  slotId: string;
  provider?: AdProvider;
  format?: "banner" | "sidebar" | "in-content";
  className?: string;
}

/**
 * Lazy-loaded ad placeholder — loads only when visible to protect Core Web Vitals.
 * Replace placeholder content with actual ad scripts after approval.
 *
 * Architecture decision: ads are client-only and intersection-observed
 * so they never block LCP or increase initial JS on server-rendered pages.
 */
export function AdSlot({
  slotId,
  provider = "adsense",
  format = "banner",
  className,
}: AdSlotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const heightClass =
    format === "banner"
      ? "min-h-[90px] md:min-h-[250px]"
      : format === "sidebar"
        ? "min-h-[600px]"
        : "min-h-[280px]";

  return (
    <div
      ref={ref}
      className={cn(
        "ad-slot mx-auto w-full max-w-4xl overflow-hidden rounded-lg border border-dashed border-slate-200 bg-slate-50",
        heightClass,
        className,
      )}
      data-ad-slot={slotId}
      data-ad-provider={provider}
      aria-hidden={!visible}
    >
      {visible ? (
        <div className="flex h-full items-center justify-center p-4 text-center text-xs text-slate-400">
          {/* Production: inject provider script here */}
          Ad slot: {slotId} ({provider})
        </div>
      ) : (
        <div className="h-full w-full animate-pulse bg-slate-100" />
      )}
    </div>
  );
}
