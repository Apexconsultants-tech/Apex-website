// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Static export for HostGator shared hosting: no Node server or serverless
// functions at runtime, just the prerendered files in dist/ served directly
// by Apache. build.format "file" emits flat about-us.html files (matching
// the previous Next.js export's URL scheme exactly), so .htaccess's
// extensionless-URL rewrite needs no changes.
export default defineConfig({
  site: "https://apexconsultants.org",
  output: "static",
  build: {
    format: "file",
  },
  image: {
    responsiveStyles: true,
  },
  vite: {
    // @ts-expect-error - @tailwindcss/vite and astro resolve slightly
    // different (but compatible at runtime) copies of Vite's plugin types.
    plugins: [tailwindcss()],
  },
});
