"use client";

import dynamic from "next/dynamic";

// FloatingLuggageTag already renders nothing for the first 900ms (and
// nothing at all once dismissed for the session), so there's no SSR
// content to lose by deferring it — but it's mounted globally in the root
// layout, so without this split its JS ships in every page's initial
// bundle. ssr:false moves the import to a separate chunk fetched only
// after the rest of the page has hydrated. Root layout stays a Server
// Component (it exports `metadata`), so the dynamic()+ssr:false call has
// to live in this small client wrapper rather than inline there.
const FloatingLuggageTag = dynamic(() => import("@/components/FloatingLuggageTag"), {
  ssr: false,
});

export default FloatingLuggageTag;
