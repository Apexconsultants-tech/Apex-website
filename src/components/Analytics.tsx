"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GA_MEASUREMENT_ID, trackEvent } from "@/lib/analytics";

// Delegated click tracking: any element site-wide with data-track="event_name"
// fires that GA4 event on click, without needing to convert every WhatsApp
// or phone link (many rendered from server components) into a client
// component just to attach a handler.
export default function Analytics() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-track]");
      if (!target) return;
      const eventName = target.dataset.track;
      if (!eventName) return;
      trackEvent(eventName, {
        link_text: target.textContent?.trim().slice(0, 60),
        page_path: window.location.pathname,
      });
    }
    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
