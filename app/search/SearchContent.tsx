"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";

const pages = [
  {
    href: "/",
    title: "Home",
    description: "Welcome to Rev Sione Kami Memorial Church. Sunday services, latest sermons and upcoming events.",
    keywords: ["home", "welcome", "church", "rskmc", "sunday", "service"],
  },
  {
    href: "/about",
    title: "About Us",
    description: "Our story, vision, mission, core values and leadership team.",
    keywords: ["about", "story", "vision", "mission", "values", "leadership", "history", "pastor"],
  },
  {
    href: "/services",
    title: "Services & Schedule",
    description: "Weekly service times — Sunday, Wednesday and Friday gatherings.",
    keywords: ["services", "schedule", "times", "sunday", "wednesday", "friday", "worship", "gathering"],
  },
  {
    href: "/ministries",
    title: "Ministries",
    description: "Youth, women, men, outreach and worship ministries at RSKMC.",
    keywords: ["ministries", "youth", "women", "men", "outreach", "worship", "ministry", "children"],
  },
  {
    href: "/sermons",
    title: "Sermons",
    description: "Listen to and download messages preached at RSKMC.",
    keywords: ["sermons", "messages", "preach", "teaching", "word", "audio", "download", "listen"],
  },
  {
    href: "/events",
    title: "Events",
    description: "Upcoming church events, conferences, prayer nights and community gatherings.",
    keywords: ["events", "conference", "prayer", "night", "community", "upcoming", "calendar"],
  },
  {
    href: "/testimonials",
    title: "Testimonials",
    description: "Stories of lives transformed by God's grace through RSKMC.",
    keywords: ["testimonials", "stories", "testimony", "transformed", "faith", "grace", "changed"],
  },
  {
    href: "/give",
    title: "Give & Contact",
    description: "Support the ministry and get in touch with our church.",
    keywords: ["give", "donate", "offering", "tithe", "contact", "support", "phone", "email", "location"],
  },
];

function score(page: typeof pages[number], query: string): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  const terms = q.split(/\s+/);
  let total = 0;
  for (const term of terms) {
    if (page.title.toLowerCase().includes(term)) total += 3;
    if (page.description.toLowerCase().includes(term)) total += 2;
    if (page.keywords.some((k) => k.includes(term) || term.includes(k))) total += 1;
  }
  return total;
}

export default function SearchContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [inputValue, setInputValue] = useState(initialQ);
  const router = useRouter();

  const results = pages
    .map((p) => ({ ...p, score: score(p, initialQ) }))
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score);

  function handleNewSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = inputValue.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-700 text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=75" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: "Search" }]} />
          <h1 className="text-3xl sm:text-4xl font-bold mb-5 md:mb-6 mt-1">Search RSKMC</h1>
          <form onSubmit={handleNewSearch} className="flex gap-2 max-w-2xl">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search pages, sermons, events…"
              className="flex-1 bg-white text-navy-800 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
            <button
              type="submit"
              className="bg-gold-500 text-navy-800 font-bold px-5 py-3 rounded-lg hover:bg-gold-400 transition-colors flex items-center gap-2"
            >
              <Search size={18} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {initialQ ? (
              <>
                <p className="text-gray-500 text-sm mb-8">
                  {results.length > 0
                    ? `${results.length} result${results.length === 1 ? "" : "s"} for `
                    : "No results for "}
                  <span className="font-semibold text-navy-700">&ldquo;{initialQ}&rdquo;</span>
                </p>

                {results.length > 0 ? (
                  <div className="space-y-4">
                    {results.map((page) => (
                      <Link
                        key={page.href}
                        href={page.href}
                        className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 hover:border-gold-400 hover:shadow-sm transition-all group"
                      >
                        <div className="w-9 h-9 bg-navy-700 text-gold-400 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                          <ChevronRight size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-navy-700 group-hover:text-navy-600 mb-1">{page.title}</p>
                          <p className="text-gray-500 text-sm leading-relaxed">{page.description}</p>
                          <p className="text-gold-600 text-xs mt-2 font-medium">rskmc.com{page.href}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Search size={40} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">No pages matched your search.</p>
                    <p className="text-gray-400 text-sm">Try different keywords like &ldquo;sermons&rdquo;, &ldquo;events&rdquo;, or &ldquo;give&rdquo;.</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <Search size={40} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Enter a search term to find pages on our site.</p>
              </div>
            )}

            {/* All pages */}
            {!initialQ && (
              <div className="mt-8">
                <p className="text-sm font-semibold text-navy-700 uppercase tracking-wide mb-4">Browse All Pages</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {pages.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-gold-400 hover:shadow-sm transition-all group"
                    >
                      <ChevronRight size={15} className="text-gold-500 shrink-0" />
                      <div>
                        <p className="font-semibold text-navy-700 text-sm group-hover:text-navy-600">{page.title}</p>
                        <p className="text-gray-400 text-xs line-clamp-1">{page.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
