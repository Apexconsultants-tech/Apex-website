// Every raster image (webp/png/jpg) lives under src/assets/images so Astro's
// <Image>/<Picture> can optimize it at build time (AVIF+WebP, explicit
// width/height). Data files keep their existing "/images/..." path strings
// (unchanged from the old public/ layout) and resolve them through this map
// at render time, so content files never need to know about asset imports.
// SVGs (flags, a few vector logos) stay in public/ and are referenced
// directly as plain <img src="/images/...">, unprocessed — nothing to
// optimize on a vector file.
const modules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/**/*.{webp,png,jpg,jpeg}",
  { eager: true }
);

export function img(publicPath: string): ImageMetadata {
  const key = `/src/assets/images${publicPath.replace(/^\/images/, "")}`;
  const mod = modules[key];
  if (!mod) throw new Error(`Image not found: ${publicPath} (expected ${key})`);
  return mod.default;
}

// For <meta property="og:image">, which needs a real, final URL string —
// unlike <Image>, there's no build step left to resolve a processed
// asset's hashed path later, so this resolves it up front via Astro's
// image service.
export async function ogUrl(publicPath: string): Promise<string> {
  const { getImage } = await import("astro:assets");
  const image = await getImage({ src: img(publicPath), width: 1200, format: "webp" });
  return image.src;
}
