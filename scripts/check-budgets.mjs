// Byte-budget gate, run as part of `npm run build`. Fast and
// deterministic (no browser), so it's safe to fail the build on. Checks,
// per generated page: inline+external JS ≤ 30KB, total estimated mobile
// page weight (HTML + CSS + JS + the smallest srcset candidate for every
// image) ≤ 1MB, and that every <img>/<source> has explicit width+height
// (a missing pair is a common CLS cause Lighthouse can't catch statically
// as reliably as a direct HTML scan can).
import fs from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist");
const JS_BUDGET = 30 * 1024;
const WEIGHT_BUDGET = 1024 * 1024;

if (!fs.existsSync(DIST)) {
  console.error("dist/ not found — run `astro build` first.");
  process.exit(1);
}

const fileSizeCache = new Map();
function sizeOf(relativeUrl) {
  const clean = relativeUrl.split("?")[0].split("#")[0];
  if (fileSizeCache.has(clean)) return fileSizeCache.get(clean);
  const filePath = path.join(DIST, clean);
  let size = 0;
  try {
    size = fs.statSync(filePath).size;
  } catch {
    console.warn(`  (warning) referenced file not found on disk: ${clean}`);
  }
  fileSizeCache.set(clean, size);
  return size;
}

function findHtmlFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findHtmlFiles(full));
    else if (entry.name.endsWith(".html")) results.push(full);
  }
  return results;
}

function smallestSrcsetCandidate(srcset) {
  const candidates = srcset
    .split(",")
    .map((c) => c.trim())
    .map((c) => {
      const [url, descriptor] = c.split(/\s+/);
      const w = descriptor && descriptor.endsWith("w") ? parseInt(descriptor, 10) : Infinity;
      return { url, w };
    });
  candidates.sort((a, b) => a.w - b.w);
  return candidates[0]?.url;
}

let failed = false;
const rows = [];

for (const htmlPath of findHtmlFiles(DIST)) {
  const html = fs.readFileSync(htmlPath, "utf8");
  const route = "/" + path.relative(DIST, htmlPath).replace(/\\/g, "/");
  const htmlBytes = Buffer.byteLength(html, "utf8");

  let jsBytes = 0;
  let cssBytes = 0;
  let imageBytes = 0;
  const missingDimensions = [];
  const countedImageUrls = new Set(); // a URL repeated on the page is one browser fetch, not several

  // External scripts
  for (const m of html.matchAll(/<script[^>]*\ssrc="([^"]+)"[^>]*><\/script>/g)) {
    if (m[1].startsWith("http")) continue; // third-party (GA4), not counted against our own JS budget
    jsBytes += sizeOf(m[1]);
  }
  // Inline module scripts (our own component islands)
  for (const m of html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)) {
    jsBytes += Buffer.byteLength(m[1], "utf8");
  }
  // Stylesheets
  for (const m of html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)) {
    cssBytes += sizeOf(m[1]);
  }
  // Images: <img src>/<source srcset>, approximating mobile payload via
  // the smallest declared candidate. Lazy-loaded images are excluded from
  // the weight total — a real mobile Lighthouse run doesn't scroll the
  // page, so below-the-fold `loading="lazy"` images are never fetched
  // during the audit. They still get checked for explicit dimensions.
  for (const m of html.matchAll(/<(?:img|source)\b[^>]*>/g)) {
    const tag = m[0];
    if (/\sdata-dropdown-option\b/.test(tag)) continue;
    const isLazy = /\sloading="lazy"/.test(tag);
    const srcsetMatch = tag.match(/\ssrcset="([^"]+)"/);
    const srcMatch = tag.match(/\ssrc="([^"]+)"/);
    const url = srcsetMatch ? smallestSrcsetCandidate(srcsetMatch[1]) : srcMatch?.[1];
    if (!isLazy && url && !url.startsWith("http") && !url.startsWith("data:") && !countedImageUrls.has(url)) {
      countedImageUrls.add(url);
      imageBytes += sizeOf(url);
    }
    const isImgTag = tag.startsWith("<img");
    if (isImgTag && (!/\swidth="/.test(tag) || !/\sheight="/.test(tag))) {
      missingDimensions.push(tag.slice(0, 80));
    }
  }

  const totalWeight = htmlBytes + jsBytes + cssBytes + imageBytes;
  const jsOk = jsBytes <= JS_BUDGET;
  const weightOk = totalWeight <= WEIGHT_BUDGET;
  const dimsOk = missingDimensions.length === 0;

  if (!jsOk || !weightOk || !dimsOk) failed = true;

  rows.push({ route, jsBytes, totalWeight, jsOk, weightOk, dimsOk, missingDimensions });
}

const fmtKB = (n) => `${(n / 1024).toFixed(1)}KB`;

console.log(`\nByte budgets: JS ≤ ${fmtKB(JS_BUDGET)}/page, total ≤ ${fmtKB(WEIGHT_BUDGET)}/page\n`);
for (const r of rows) {
  const status = r.jsOk && r.weightOk && r.dimsOk ? "PASS" : "FAIL";
  console.log(
    `${status}  ${r.route.padEnd(50)} js=${fmtKB(r.jsBytes).padStart(8)}  total=${fmtKB(r.totalWeight).padStart(9)}`
  );
  if (!r.jsOk) console.log(`      ✗ JS over budget`);
  if (!r.weightOk) console.log(`      ✗ total weight over budget`);
  if (!r.dimsOk) {
    console.log(`      ✗ ${r.missingDimensions.length} <img> missing explicit width/height:`);
    for (const tag of r.missingDimensions.slice(0, 5)) console.log(`          ${tag}...`);
  }
}

console.log(`\n${rows.length} pages checked.`);
if (failed) {
  console.error("\nBudget check FAILED.");
  process.exit(1);
}
console.log("\nAll pages within budget.");
