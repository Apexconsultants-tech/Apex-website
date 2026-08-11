import fs from "node:fs";
import path from "node:path";

// Split out from services-data.ts because that module is transitively
// imported by Header.tsx (a client component, via site-config.ts's
// serviceLinks) — a top-level "node:fs" import there breaks the client
// bundle. This file is only ever imported by server components
// (ServiceTemplate), so it's safe to touch the filesystem.

/** Every service slug matches a hero photo at the same name under
 * /images/services, so the page's hero has real imagery, not just text on
 * a gradient. Returns null (rather than a path that 404s) if that photo
 * hasn't been sourced for a given service yet. */
export function serviceImage(slug: string): string | null {
  const relative = `images/services/${slug}.webp`;
  const exists = fs.existsSync(path.join(process.cwd(), "public", relative));
  return exists ? `/${relative}` : null;
}
