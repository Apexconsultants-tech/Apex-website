import fs from "node:fs";
import path from "node:path";
import { destinationPhoto } from "@/lib/destinations-data";

// Split out from destinations-data.ts because that module is also imported
// by client components (CourseFinder) — a top-level "node:fs" import there
// would break the client bundle. This file is only ever imported by server
// components (DestinationTemplate), so it's safe to touch the filesystem.

/** A second, genuinely different country-specific photo (campus/student-life
 * themed rather than the hero's landmark shot) for the "Life as a student"
 * section, so no destination page repeats its hero image lower on the page.
 * Falls back to the landmark photo if a life-specific shot hasn't been
 * sourced for a given country yet, rather than 500ing on a missing file. */
export function destinationLifePhoto(slug: string) {
  const name = slug.replace("study-in-", "");
  const relative = `images/destinations/${name}-life.webp`;
  const exists = fs.existsSync(path.join(process.cwd(), "public", relative));
  return exists ? `/${relative}` : destinationPhoto(slug);
}
