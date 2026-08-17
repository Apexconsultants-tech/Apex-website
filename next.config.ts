import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for HostGator shared hosting: no Node server or
  // serverless functions at runtime, just the prerendered files in out/
  // served directly by Apache.
  output: "export",
  poweredByHeader: false,
  agentRules: false,
  images: {
    // The image optimization API needs a live server to resize/convert
    // images per-request, which doesn't exist here — next/image still
    // works, it just serves the original file as-is. Source images are
    // already .webp, so the practical loss is responsive multi-size
    // variants and AVIF conversion, not format entirely.
    unoptimized: true,
  },
  // headers()/redirects()/rewrites() need a server to apply per-request,
  // so they're not supported (and were previously a no-op) under a static
  // export. The equivalent security headers this used to set
  // (X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
  // Permissions-Policy) would need to be configured in .htaccess on
  // HostGator instead, if wanted.
};

export default nextConfig;
