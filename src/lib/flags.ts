// Real width/height ratios read from each flag SVG's own dimensions.
// Flags are not all the same shape (UK/Canada/Australia/Ireland are 2:1,
// most others are 3:2 or close to it) — rendering every flag inside one
// fixed-ratio box stretches or squashes whichever ones don't match it.
// Look up the real ratio here and size the box from it instead.
export const FLAG_RATIO: Record<string, number> = {
  gb: 2,
  us: 1.9,
  ca: 2,
  au: 2,
  de: 1.6667,
  cn: 1.5,
  fr: 1.5,
  ie: 2,
  nz: 2,
  it: 1.5,
  ae: 2,
  es: 1.5,
  nl: 1.5,
  fi: 1.6364,
  se: 1.6,
  my: 2,
  kr: 1.5,
  cy: 1.5,
  sg: 1.5,
};

/** Given a target height in px, returns the correctly proportioned width for this flag code. */
export function flagSize(code: string, height: number) {
  const ratio = FLAG_RATIO[code] ?? 1.5;
  return { width: Math.round(height * ratio), height };
}
