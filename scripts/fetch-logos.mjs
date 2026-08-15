// One-off script: resolve official logos for a list of universities via
// Wikidata (P154 = logo image), falling back to P41/P18 or Wikipedia
// pageimage, then download to public/images/university-logos/. Not part of
// the app — delete after use.
import fs from "node:fs";
import path from "node:path";

const UA = "ApexWebsiteLogoFetch/1.0 (contact: tbuksh47@gmail.com)";
const OUT_DIR = path.resolve("public/images/university-logos");

const targets = [
  { slug: "university-of-kent", title: "University of Kent" },
  { slug: "anglia-ruskin-university", title: "Anglia Ruskin University" },
  { slug: "birmingham-city-university", title: "Birmingham City University" },
  { slug: "arden-university", title: "Arden University" },
  { slug: "brunel-university-london", title: "Brunel University of London" },
  { slug: "middlesex-university-london", title: "Middlesex University" },
  { slug: "manchester-metropolitan-university", title: "Manchester Metropolitan University" },
  { slug: "teesside-university", title: "Teesside University" },
  { slug: "the-university-of-law", title: "The University of Law" },
  { slug: "the-university-of-buckingham", title: "University of Buckingham" },
  { slug: "london-south-bank-university", title: "London South Bank University" },
  { slug: "curtin-college", title: "Curtin College" },
  { slug: "auckland-university-of-technology", title: "Auckland University of Technology" },
  { slug: "lincoln-university-nz", title: "Lincoln University, New Zealand" },
  { slug: "unitec-institute-of-technology", title: "Unitec Institute of Technology" },
  { slug: "the-university-of-auckland", title: "University of Auckland" },
  { slug: "the-university-of-otago", title: "University of Otago" },
  { slug: "the-university-of-waikato", title: "University of Waikato" },
  { slug: "massey-university", title: "Massey University" },
  { slug: "university-of-canterbury", title: "University of Canterbury" },
  { slug: "university-of-birmingham-dubai", title: "University of Birmingham" },
  { slug: "university-of-wollongong-in-dubai", title: "University of Wollongong in Dubai" },
  { slug: "heriot-watt-university-dubai", title: "Heriot-Watt University" },
  { slug: "middlesex-university-dubai", title: "Middlesex University Dubai" },
  { slug: "university-college-dublin", title: "University College Dublin" },
  { slug: "icn-business-school", title: "ICN Business School" },
  { slug: "kedge-business-school", title: "KEDGE Business School" },
  { slug: "macromedia-university", title: "Macromedia University of Applied Sciences" },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function jget(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function findQid(title) {
  const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(title)}&language=en&type=item&format=json&limit=1`;
  const data = await jget(url);
  return data.search?.[0]?.id ?? null;
}

async function getClaimFile(qid, prop) {
  const url = `https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${qid}&property=${prop}&format=json`;
  const data = await jget(url);
  const claim = data.claims?.[prop]?.[0];
  return claim?.mainsnak?.datavalue?.value ?? null;
}

async function wikipediaPageImage(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=800&redirects=1`;
  const data = await jget(url);
  const pages = data.query?.pages ?? {};
  const page = Object.values(pages)[0];
  return page?.thumbnail?.source ?? null;
}

function commonsFilePath(filename, width = 800) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=${width}`;
}

async function download(url, destBase) {
  const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) throw new Error(`download failed ${res.status}`);
  const ct = res.headers.get("content-type") || "";
  let ext = "png";
  if (ct.includes("svg")) ext = "svg";
  else if (ct.includes("jpeg")) ext = "jpg";
  else if (ct.includes("webp")) ext = "webp";
  else if (ct.includes("png")) ext = "png";
  const buf = Buffer.from(await res.arrayBuffer());
  const dest = `${destBase}.${ext}`;
  fs.writeFileSync(dest, buf);
  return { dest, size: buf.length, contentType: ct };
}

const results = [];

for (const t of targets) {
  const destBase = path.join(OUT_DIR, t.slug);
  let source = null;
  let note = "";
  try {
    const qid = await findQid(t.title);
    await sleep(300);
    if (qid) {
      let logoVal = await getClaimFile(qid, "P154"); // logo image
      await sleep(300);
      if (logoVal?.value) {
        source = commonsFilePath(logoVal.value);
        note = `wikidata P154 (${logoVal.value})`;
      } else {
        // try coat of arms / seal as a fallback official mark
        let sealVal = await getClaimFile(qid, "P41"); // flag - rarely applies, skip
        void sealVal;
      }
    }
    if (!source) {
      const pageImg = await wikipediaPageImage(t.title);
      await sleep(300);
      if (pageImg) {
        source = pageImg.split("?")[0].replace(/\/thumb\//, "/").replace(/\/[0-9]+px-[^/]+$/, "");
        // fall back to the thumbnail URL itself if the un-thumb transform guess is wrong
        if (!source || source === pageImg) source = pageImg;
        note = "wikipedia pageimage (may be a crest/photo, not a wordmark)";
      }
    }
    if (!source) {
      results.push({ ...t, status: "NOT_FOUND", note: "no wikidata logo, no wikipedia pageimage" });
      continue;
    }
    const { dest, size, contentType } = await download(source, destBase);
    results.push({ ...t, status: "OK", source, dest, size, contentType, note });
  } catch (err) {
    results.push({ ...t, status: "ERROR", error: String(err) });
  }
  await sleep(400);
}

fs.writeFileSync(path.resolve("scripts/fetch-logos-results.json"), JSON.stringify(results, null, 2));
for (const r of results) {
  console.log(`${r.status.padEnd(10)} ${t_pad(r.slug)} ${r.size ? r.size + "b" : ""} ${r.note ?? r.error ?? ""}`);
}
function t_pad(s) {
  return s.padEnd(38);
}
