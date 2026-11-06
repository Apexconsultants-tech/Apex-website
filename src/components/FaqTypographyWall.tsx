// Texture only: real words associated with the process, scattered wide,
// rotated, and kept extremely faint so it reads as a subtle wall pattern
// rather than competing with the FAQ text sitting on top of it. Positions
// deliberately favor the edges outside the centered max-w-3xl FAQ column on
// wide screens, and stay low-opacity enough everywhere that it's still
// texture, not a legibility problem, once that column goes full-width.
const FAQ_WALL_WORDS = [
  { text: "VISA", top: "6%", left: "4%", size: "5rem", rotate: -10, opacity: 0.05 },
  { text: "CAMPUS", top: "16%", left: "78%", size: "3.5rem", rotate: 8, opacity: 0.045 },
  { text: "HOUSING", top: "2%", left: "62%", size: "2.75rem", rotate: -6, opacity: 0.04 },
  { text: "PLANNING", top: "34%", left: "2%", size: "3rem", rotate: 6, opacity: 0.045 },
  { text: "SUPPORT", top: "80%", left: "80%", size: "4rem", rotate: -8, opacity: 0.05 },
  { text: "ADMISSION", top: "48%", left: "83%", size: "2.5rem", rotate: 10, opacity: 0.04 },
  { text: "UNIVERSITY", top: "88%", left: "3%", size: "3.25rem", rotate: -5, opacity: 0.045 },
  { text: "TRAVEL", top: "62%", left: "0%", size: "3.75rem", rotate: 12, opacity: 0.045 },
  { text: "DOCUMENTS", top: "22%", left: "24%", size: "2.25rem", rotate: -14, opacity: 0.03 },
  { text: "SCHOLARSHIP", top: "70%", left: "30%", size: "2.25rem", rotate: 9, opacity: 0.03 },
  { text: "APPLICATION", top: "0%", left: "18%", size: "2.5rem", rotate: 4, opacity: 0.035 },
  { text: "STUDENT LIFE", top: "92%", left: "45%", size: "2.5rem", rotate: -7, opacity: 0.035 },
  { text: "DESTINATION", top: "40%", left: "40%", size: "2.25rem", rotate: 5, opacity: 0.028 },
  { text: "EDUCATION", top: "10%", left: "40%", size: "2.5rem", rotate: -4, opacity: 0.03 },
  { text: "PASSPORT", top: "56%", left: "88%", size: "3rem", rotate: -11, opacity: 0.045 },
  { text: "ARRIVAL", top: "78%", left: "12%", size: "2.5rem", rotate: 7, opacity: 0.035 },
] as const;

export default function FaqTypographyWall() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {FAQ_WALL_WORDS.map((w) => (
        <span
          key={w.text}
          className="absolute whitespace-nowrap font-display font-bold uppercase tracking-tight text-ink"
          style={{
            top: w.top,
            left: w.left,
            fontSize: w.size,
            opacity: w.opacity,
            transform: `rotate(${w.rotate}deg)`,
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}
