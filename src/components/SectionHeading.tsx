type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  tone?: "ink" | "white";
};

export default function SectionHeading({ eyebrow, title, lead, align = "left", tone = "ink" }: Props) {
  const isCenter = align === "center";
  const isWhite = tone === "white";

  return (
    <div className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.14em] ${
            isWhite ? "text-white/70" : "text-ink-faint"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-2 text-3xl font-semibold leading-tight sm:text-4xl ${
          isWhite ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-4 text-base leading-relaxed ${isWhite ? "text-white/80" : "text-ink-soft"}`}>
          {lead}
        </p>
      )}
    </div>
  );
}
