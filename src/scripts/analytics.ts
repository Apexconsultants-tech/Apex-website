// GA4 + site-wide data-track click delegation. The <script src="gtag/js">
// tag loads with `defer` (see GoogleAnalytics.astro); the actual
// gtag('config', ...) bootstrap call is pushed to requestIdleCallback so it
// never competes with LCP/TBT on first paint.
import { GA_MEASUREMENT_ID } from "@/lib/ga";

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

function bootstrapGA() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
}

function initAnalytics() {
  const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback;
  if (idle) idle(bootstrapGA);
  else setTimeout(bootstrapGA, 1);

  document.addEventListener(
    "click",
    (e) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-track]");
      if (!target) return;
      const eventName = target.dataset.track;
      if (!eventName) return;
      trackEvent(eventName, {
        link_text: target.textContent?.trim().slice(0, 60),
        page_path: window.location.pathname,
      });
    },
    { capture: true }
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnalytics);
} else {
  initAnalytics();
}
