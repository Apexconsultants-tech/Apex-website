import Link from "next/link";

export default function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-faint">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="hover:text-brand">Home</Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="text-ink">{current}</li>
      </ol>
    </nav>
  );
}
