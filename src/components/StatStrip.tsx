import { stats } from "@/lib/site-config";

export default function StatStrip() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-lg shadow-ink/5 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-surface px-5 py-6 text-center sm:text-left">
          <p className="font-display text-3xl font-semibold text-brand">{s.value}</p>
          <p className="mt-1 text-sm text-ink-soft">
            {s.label}
            {"sub" in s && s.sub ? <span className="block text-xs text-ink-faint">{s.sub}</span> : null}
          </p>
        </div>
      ))}
    </div>
  );
}
