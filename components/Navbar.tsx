"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/ministries", label: "Ministries" },
  { href: "/sermons", label: "Sermons" },
  { href: "/events", label: "Events" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/give", label: "Give" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSearch(e: React.FormEvent) {
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
    <nav className={`bg-navy-700 text-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-xl shadow-navy-900/40" : "shadow-lg"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative">
              <Image
                src="/logo.jpg"
                alt="RSKMC Logo"
                width={40}
                height={40}
                className="rounded-full object-cover ring-2 ring-gold-500/30 group-hover:ring-gold-500/70 transition-all duration-200"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-gold-400 font-bold text-sm tracking-widest uppercase">RSKMC</span>
              <span className="text-blue-300/80 text-xs hidden sm:block tracking-wide">Rev Sione Kami Memorial Church</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {!searchOpen &&
              navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    pathname === href
                      ? "bg-gold-500 text-navy-900 font-semibold shadow-sm"
                      : "text-blue-200 hover:text-white hover:bg-navy-600/70"
                  }`}
                >
                  {label}
                </Link>
              ))}

            {/* Search bar (expanded) */}
            {searchOpen && (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search RSKMC…"
                  className="bg-navy-800/80 text-white placeholder-blue-400 border border-navy-500 rounded-md px-3 py-1.5 text-sm w-60 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="p-1.5 rounded-md text-blue-200 hover:text-white hover:bg-navy-600 transition-all duration-200"
                  aria-label="Submit search"
                >
                  <Search size={17} />
                </button>
              </form>
            )}

            {/* Search toggle */}
            <button
              onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
              className="ml-1 p-2 rounded-md text-blue-200 hover:text-white hover:bg-navy-600/70 transition-all duration-200"
              aria-label={searchOpen ? "Close search" : "Open search"}
            >
              {searchOpen ? <X size={17} /> : <Search size={17} />}
            </button>
          </div>

          {/* Mobile icons */}
          <div className="md:hidden flex items-center gap-0.5">
            <button
              onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false); }}
              className="p-2 rounded-md text-blue-200 hover:text-white hover:bg-navy-600/70 transition-all duration-200"
              aria-label="Toggle search"
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
            <button
              onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }}
              className="p-2 rounded-md text-blue-200 hover:text-white hover:bg-navy-600/70 transition-all duration-200"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="md:hidden border-t border-navy-600 bg-navy-800/95 backdrop-blur-sm px-4 py-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search RSKMC…"
              autoFocus
              className="flex-1 bg-navy-900/80 text-white placeholder-blue-400 border border-navy-500 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all duration-200"
            />
            <button
              type="submit"
              className="bg-gold-500 text-navy-800 px-4 py-2.5 rounded-md text-sm font-bold hover:bg-gold-400 active:scale-95 transition-all duration-200"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-navy-600 bg-navy-800/95 backdrop-blur-sm px-4 pb-5 pt-3">
          <div className="space-y-0.5">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  pathname === href
                    ? "bg-gold-500 text-navy-900 font-semibold"
                    : "text-blue-200 hover:text-white hover:bg-navy-700"
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
