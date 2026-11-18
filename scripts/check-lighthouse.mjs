// Mobile Lighthouse gate, run separately from `npm run build` via
// `npm run lighthouse` (see CI: it runs after the build, against the
// already-built dist/). Audits each representative URL 3 times and scores
// the median of each metric individually, so ordinary run-to-run variance
// doesn't flip a pass/fail on a single noisy run.
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const DIST = path.resolve("dist");
const RUNS_PER_URL = 3;

const TARGETS = {
  performance: 95, // minimum score (0-100)
  lcp: 2500, // ms, max
  tbt: 200, // ms, max
  cls: 0, // max
};

// One representative URL per unique template — every destination/service/
// blog/partner-university page shares identical CSS/JS/image structure
// with its template, so this is a faithful proxy for "every page" without
// a 50+ minute Lighthouse run on every push to main.
const ROUTES = [
  "/",
  "/about-us",
  "/contact-us",
  "/courses",
  "/destinations",
  "/faqs",
  "/success-stories",
  "/blogs",
  "/partner-universities",
  "/terms",
  "/privacy-policy",
  "/404",
  "/study-in-uk",
  "/student-visa-assistance",
  "/blogs/step-by-step-guide-to-applying-for-a-student-visa",
  "/partner-universities/university-of-cambridge",
];

const MIME = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".json": "application/json", ".png": "image/png", ".webp": "image/webp",
  ".avif": "image/avif", ".svg": "image/svg+xml", ".jpg": "image/jpeg",
  ".ico": "image/x-icon", ".txt": "text/plain", ".xml": "application/xml",
  ".woff2": "font/woff2", ".woff": "font/woff",
};

// Gzips text responses when the client accepts it, same as the
// mod_deflate rule in public/.htaccess — without this, local Lighthouse
// numbers would be pessimistic vs. the real HostGator deploy (which does
// compress these), since AVIF/WebP already are and get no benefit.
const COMPRESSIBLE = new Set([".html", ".css", ".js", ".json", ".xml", ".txt", ".svg", ".woff", ".woff2"]);

function serveFile(req, res, filePath) {
  const ext = path.extname(filePath);
  const contentType = MIME[ext] || "application/octet-stream";
  const acceptsGzip = (req.headers["accept-encoding"] || "").includes("gzip");
  if (COMPRESSIBLE.has(ext) && acceptsGzip) {
    res.writeHead(200, { "Content-Type": contentType, "Content-Encoding": "gzip" });
    fs.createReadStream(filePath).pipe(zlib.createGzip()).pipe(res);
  } else {
    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
  }
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  const clean = urlPath === "/" ? "/index.html" : urlPath;
  const direct = path.join(DIST, clean);
  const withHtml = path.join(DIST, clean.replace(/\/$/, "") + ".html");
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return serveFile(req, res, direct);
  if (fs.existsSync(withHtml) && fs.statSync(withHtml).isFile()) return serveFile(req, res, withHtml);
  res.writeHead(404);
  res.end("404");
});

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function auditOnce(url, port, chrome) {
  const result = await lighthouse(
    `http://127.0.0.1:${port}${url}`,
    { port: chrome.port, output: "json", logLevel: "error" },
    {
      extends: "lighthouse:default",
      settings: {
        formFactor: "mobile",
        screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 3, disabled: false },
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
          requestLatencyMs: 150 * 3.75,
          downloadThroughputKbps: 1638.4 * 0.9,
          uploadThroughputKbps: 675 * 0.9,
        },
      },
    }
  );
  const lhr = result.lhr;
  return {
    performance: Math.round((lhr.categories.performance.score ?? 0) * 100),
    lcp: lhr.audits["largest-contentful-paint"].numericValue,
    tbt: lhr.audits["total-blocking-time"].numericValue,
    cls: lhr.audits["cumulative-layout-shift"].numericValue,
  };
}

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const port = server.address().port;
console.log(`Serving dist/ on http://127.0.0.1:${port}\n`);
console.log(`Lighthouse mobile targets: Performance >= ${TARGETS.performance}, LCP < ${TARGETS.lcp}ms, TBT < ${TARGETS.tbt}ms, CLS <= ${TARGETS.cls}`);
console.log(`${RUNS_PER_URL} runs per URL, scored on the median.\n`);

let failed = false;
for (const route of ROUTES) {
  const chrome = await launch({ chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox"] });
  const runs = [];
  try {
    for (let i = 0; i < RUNS_PER_URL; i++) {
      runs.push(await auditOnce(route, port, chrome));
    }
  } finally {
    await chrome.kill();
  }
  const perf = median(runs.map((r) => r.performance));
  const lcp = median(runs.map((r) => r.lcp));
  const tbt = median(runs.map((r) => r.tbt));
  const cls = median(runs.map((r) => r.cls));

  const ok = perf >= TARGETS.performance && lcp < TARGETS.lcp && tbt < TARGETS.tbt && cls <= TARGETS.cls;
  if (!ok) failed = true;

  console.log(
    `${ok ? "PASS" : "FAIL"}  ${route.padEnd(55)} perf=${String(perf).padStart(3)}  lcp=${lcp.toFixed(0).padStart(5)}ms  tbt=${tbt.toFixed(0).padStart(4)}ms  cls=${cls.toFixed(3)}`
  );
}

server.close();

if (failed) {
  console.error("\nLighthouse budget check FAILED.");
  process.exit(1);
}
console.log("\nAll representative pages meet the Lighthouse mobile targets.");
