import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

type Crumb = { label: string; href?: string };

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center justify-start gap-1 text-blue-300/80 text-sm mb-6">
      <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
        <Home size={13} />
        <span>Home</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={13} className="text-blue-400/50" />
          {item.href ? (
            <Link href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white/90">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
