// Real GA4 property confirmed live on apexconsultants.org during the site
// audit (crawled 2026-08-09). Carried forward unchanged, not a new ID.
export const GA_MEASUREMENT_ID = "G-59DYL2S7YT";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}
