// Server-only geo prep for the hero world map. d3-geo/topojson-client never
// ship to the client: this module runs once (at build time, since its only
// inputs are the static files below) and hands the client component plain
// numbers and path strings.
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import type { Geometry, MultiPolygon, Polygon } from "geojson";
import worldLand from "./data/world-land-110m.json";
import pakistanGeometry from "./data/pakistan.geo.json";

export const MAP_WIDTH = 1000;
// Projected against a taller canvas, then cropped (see MAP_VIEWBOX) to trim
// the near-empty Arctic/Antarctic margins without distorting the projection.
const PROJECTION_HEIGHT = 620;
export const MAP_CROP_TOP = 18;
export const MAP_CROP_HEIGHT = 480;
export const MAP_VIEWBOX = `0 ${MAP_CROP_TOP} ${MAP_WIDTH} ${MAP_CROP_HEIGHT}`;

export type MapPoint = { x: number; y: number };

export type HeroMapDestination = {
  slug: string;
  name: string;
  short: string;
  flag: string;
  point: MapPoint;
};

export type HeroMapData = {
  landPath: string;
  pakistanPath: string;
  origin: MapPoint;
  destinations: HeroMapDestination[];
  /** Quadratic-bezier arc "d" attribute from origin to each destination, keyed by slug. */
  arcs: Record<string, string>;
};

// Representative city per destination (not always the capital) — the city
// Apex's students actually land in most often for that country.
const DESTINATION_CITIES: { slug: string; name: string; short: string; flag: string; lon: number; lat: number }[] = [
  { slug: "study-in-uk", name: "United Kingdom", short: "UK", flag: "gb", lon: -0.1278, lat: 51.5074 }, // London
  { slug: "study-in-usa", name: "United States", short: "USA", flag: "us", lon: -74.006, lat: 40.7128 }, // New York
  { slug: "study-in-canada", name: "Canada", short: "Canada", flag: "ca", lon: -79.3832, lat: 43.6532 }, // Toronto
  { slug: "study-in-australia", name: "Australia", short: "Australia", flag: "au", lon: 151.2093, lat: -33.8688 }, // Sydney
  { slug: "study-in-new-zealand", name: "New Zealand", short: "New Zealand", flag: "nz", lon: 174.7633, lat: -36.8485 }, // Auckland
  { slug: "study-in-china", name: "China", short: "China", flag: "cn", lon: 116.4074, lat: 39.9042 }, // Beijing
  { slug: "study-in-ireland", name: "Ireland", short: "Ireland", flag: "ie", lon: -6.2603, lat: 53.3498 }, // Dublin
  { slug: "study-in-italy", name: "Italy", short: "Italy", flag: "it", lon: 12.4964, lat: 41.9028 }, // Rome
];

// Karachi — Apex's home base — rather than the country's geometric
// centroid, so routes visibly originate from a real city on the coast.
const ORIGIN_CITY: [number, number] = [67.0011, 24.8607];

// Pulls the arc's control point up (toward smaller y, i.e. "above" the map
// plane) proportional to route length, then a touch further so longer
// routes read as higher, more dramatic arcs — the same shape airline route
// maps use to fake altitude on a flat projection.
function arcPath(from: MapPoint, to: MapPoint): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy);
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const lift = dist * 0.22 + 18;
  return `M${from.x.toFixed(2)},${from.y.toFixed(2)} Q${mx.toFixed(2)},${(my - lift).toFixed(2)} ${to.x.toFixed(2)},${to.y.toFixed(2)}`;
}

let cached: HeroMapData | null = null;

export function getHeroMapData(): HeroMapData {
  if (cached) return cached;

  const landTopology = worldLand as unknown as Topology<{ land: GeometryCollection }>;
  const landGeo = feature(landTopology, landTopology.objects.land);

  const projection = geoNaturalEarth1().fitSize([MAP_WIDTH, PROJECTION_HEIGHT], landGeo as never);
  const path = geoPath(projection);

  const landPath = path(landGeo as never) ?? "";
  const pakistanPath = path({ type: "Feature", geometry: pakistanGeometry as Geometry, properties: null }) ?? "";

  const project = (lon: number, lat: number): MapPoint => {
    const p = projection([lon, lat]);
    return p ? { x: p[0], y: p[1] } : { x: 0, y: 0 };
  };

  const origin = project(ORIGIN_CITY[0], ORIGIN_CITY[1]);

  const destinations: HeroMapDestination[] = DESTINATION_CITIES.map((d) => ({
    slug: d.slug,
    name: d.name,
    short: d.short,
    flag: d.flag,
    point: project(d.lon, d.lat),
  }));

  const arcs: Record<string, string> = {};
  for (const d of destinations) arcs[d.slug] = arcPath(origin, d.point);

  cached = { landPath, pakistanPath, origin, destinations, arcs };
  return cached;
}

// Re-exported for callers that only need the raw geometry types.
export type { Polygon, MultiPolygon };
