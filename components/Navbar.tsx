"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

const navLinks = [
  { href: "/",           label: "Home" },
  { href: "/about",      label: "About" },
  { href: "/ministries", label: "Ministries" },
  { href: "/services",   label: "Services" },
  { href: "/sermons",    label: "Sermons" },
  { href: "/events",     label: "News & Events" },
  { href: "/projects",   label: "Projects" },
  { href: "/give",       label: "Give" },
];

export default function Navbar() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery,setSearchQuery]= useState("");
  const [scrolled,   setScrolled]   = useState(false);
  const pathname = usePathname();
  const router   = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSearch(e: { preventDefault(): void }) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setSearchOpen(false);
    setSearchQuery("");
    setMenuOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  function closeSearch() {
    setSearchOpen(false);
    setSearchQuery("");
  }

  return (
    <nav className={`bg-navy-800 text-white sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "shadow-[0_4px_24px_-8px_hsl(215deg_50%_5%/0.5)]" : ""
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <Image
              src="/logo.jpg"
              alt="RSKMC"
              width={38}
              height={38}
              className="rounded-full object-cover ring-2 ring-white/10 group-hover:ring-gold-500/50 transition-all duration-200"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className="text-gold-400 font-bold text-sm tracking-widest uppercase">RSKMC</span>
              <span className="text-blue-300/60 text-[11px] hidden sm:block tracking-wide">Rev Sione Kami Memorial Church</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {!searchOpen && navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  pathname === href
                    ? "bg-gold-500/15 text-gold-400 font-semibold"
                    : "text-blue-200/80 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </Link>
            ))}

            {searchOpen && (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search RSKMC…"
                  className="bg-white/8 text-white placeholder-blue-300/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm w-56 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/30 transition-all duration-200"
                />
                <button type="submit" className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-white/8 transition-all duration-200" aria-label="Search">
                  <Search size={16} />
                </button>
              </form>
            )}

            <button
              onClick={() => searchOpen ? closeSearch() : setSearchOpen(true)}
              className="ml-1 p-2 rounded-lg text-blue-300/80 hover:text-white hover:bg-white/5 transition-all duration-200"
              aria-label={searchOpen ? "Close search" : "Open search"}
            >
              {searchOpen ? <X size={16} /> : <Search size={16} />}
            </button>
          </div>

          {/* Mobile icons */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false); }}
              className="p-2 rounded-lg text-blue-300/80 hover:text-white hover:bg-white/5 transition-all duration-200"
              aria-label="Toggle search"
            >
              {searchOpen ? <X size={19} /> : <Search size={19} />}
            </button>
            <button
              onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }}
              className="p-2 rounded-lg text-blue-300/80 hover:text-white hover:bg-white/5 transition-all duration-200"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div className="md:hidden border-t border-white/8 bg-navy-900/95 backdrop-blur-sm px-4 py-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search RSKMC…"
              autoFocus
              className="flex-1 bg-white/5 text-white placeholder-blue-300/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/30 transition-all duration-200"
            />
            <button type="submit" className="bg-gold-500 text-navy-800 px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-gold-400 transition-colors duration-200">
              Go
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/8 bg-navy-900/95 backdrop-blur-sm px-4 pb-4 pt-2">
          <div className="space-y-0.5">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === href
                    ? "bg-gold-500/15 text-gold-400 font-semibold"
                    : "text-blue-200/80 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
