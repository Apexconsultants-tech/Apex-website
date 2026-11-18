// Screenshots every generated page at desktop and mobile widths, for
// visual before/after review. Not part of the build or CI — a manual dev
// tool. Usage: node scripts/screenshot.mjs <siteDir> <outDir>
import { launch } from "chrome-launcher";
import puppeteerCore from "puppeteer-core";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const [, , siteDirArg, outDirArg] = process.argv;
if (!siteDirArg || !outDirArg) {
  console.error("Usage: node scripts/screenshot.mjs <siteDir> <outDir>");
  process.exit(1);
}
const siteDir = path.resolve(siteDirArg);
const outDir = path.resolve(outDirArg);
fs.mkdirSync(outDir, { recursive: true });

const MIME = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".json": "application/json", ".png": "image/png", ".webp": "image/webp",
  ".avif": "image/avif", ".svg": "image/svg+xml", ".jpg": "image/jpeg",
  ".ico": "image/x-icon", ".txt": "text/plain", ".xml": "application/xml",
  ".woff2": "font/woff2", ".woff": "font/woff",
};

function serveFile(res, filePath) {
  const ext = path.extname(filePath);
  res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  const clean = urlPath === "/" ? "/index.html" : urlPath;
  const direct = path.join(siteDir, clean);
  const withHtml = path.join(siteDir, clean.replace(/\/$/, "") + ".html");
  const asDirIndex = path.join(siteDir, clean, "index.html");
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return serveFile(res, direct);
  if (fs.existsSync(withHtml) && fs.statSync(withHtml).isFile()) return serveFile(res, withHtml);
  if (fs.existsSync(asDirIndex)) return serveFile(res, asDirIndex);
  const notFound = path.join(siteDir, "404.html");
  res.writeHead(404, { "Content-Type": "text/html" });
  if (fs.existsSync(notFound)) fs.createReadStream(notFound).pipe(res);
  else res.end("404");
});

function findRoutes(dir) {
  const routes = new Set();
  function walk(d) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      if (entry.name === "_astro" || entry.name === "_next") continue;
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".html")) {
        const rel = path.relative(siteDir, full).replace(/\\/g, "/");
        if (rel === "404.html") continue;
        const route = rel === "index.html" ? "/" : "/" + rel.replace(/\.html$/, "");
        routes.add(route);
      }
    }
  }
  walk(dir);
  return [...routes].sort();
}

function slugify(route) {
  return route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "__");
}

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const port = server.address().port;
const routes = findRoutes(siteDir);
console.log(`Serving ${siteDir} on http://127.0.0.1:${port} — ${routes.length} routes`);

const chrome = await launch({ chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars"] });
const browser = await puppeteerCore.connect({ browserURL: `http://127.0.0.1:${chrome.port}` });

const viewports = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const manifest = [];

for (const route of routes) {
  for (const [vpName, vp] of Object.entries(viewports)) {
    const page = await browser.newPage();
    await page.setViewport({ ...vp, deviceScaleFactor: 1 });
    try {
      await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: "networkidle0", timeout: 30000 });
      await new Promise((r) => setTimeout(r, 400));
      const fileName = `${slugify(route)}__${vpName}.png`;
      await page.screenshot({ path: path.join(outDir, fileName), fullPage: true });
      manifest.push({ route, viewport: vpName, file: fileName });
      console.log(`OK   ${vpName.padEnd(7)} ${route}`);
    } catch (err) {
      console.error(`FAIL ${vpName.padEnd(7)} ${route}: ${err.message}`);
      manifest.push({ route, viewport: vpName, file: null, error: String(err.message) });
    } finally {
      await page.close();
    }
  }
}

fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
await browser.disconnect();
await chrome.kill();
server.close();
console.log(`Done. ${manifest.filter((m) => m.file).length}/${manifest.length} captured.`);
