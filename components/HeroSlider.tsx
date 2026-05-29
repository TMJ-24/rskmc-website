"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

interface Slide {
  src: string;
  eyebrow: string;
  heading: [string, string];
  sub: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

const staticSlides: Slide[] = [
  {
    src: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?auto=format&fit=crop&w=1920&q=80",
    eyebrow: "Welcome to RSKMC",
    heading: ["Rev Sione Kami", "Memorial Church"],
    sub: "Building Lives. Transforming Communities. Glorifying God.",
    primary: { label: "Join Us Sunday", href: "/services" },
    secondary: { label: "Learn More", href: "/about" },
  },
  {
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80",
    eyebrow: "Come & Worship",
    heading: ["Every Sunday,", "Join Us in Praise"],
    sub: "Morning Service at 9:00 AM · Evening Service at 6:00 PM",
    primary: { label: "Service Times", href: "/services" },
    secondary: { label: "Our Sermons", href: "/sermons" },
  },
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=80",
    eyebrow: "Our Community",
    heading: ["A Family Where", "Everyone Belongs"],
    sub: "Rooted in faith, grounded in love, united in purpose.",
    primary: { label: "Our Ministries", href: "/ministries" },
    secondary: { label: "Upcoming Events", href: "/events" },
  },
  {
    src: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1920&q=80",
    eyebrow: "Grounded in the Word",
    heading: ["Built on Scripture", "and Prayer"],
    sub: "Sound biblical teaching every week for every season of life.",
    primary: { label: "Latest Sermons", href: "/sermons" },
    secondary: { label: "Give Now", href: "/give" },
  },
];

const AUTOPLAY_MS = 5500;

export default function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>(staticSlides);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    async function loadSlides() {
      try {
        const res = await client.models.HeroSlide.list();
        const active = res.data.filter((s) => s.active !== false);
        if (active.length > 0) {
          const sorted = [...active].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          setSlides(
            sorted.map((s) => ({
              src: s.imageUrl,
              eyebrow: s.eyebrow,
              heading: [s.headingLine1, s.headingLine2],
              sub: s.sub,
              primary: { label: s.primaryLabel, href: s.primaryHref },
              secondary: { label: s.secondaryLabel, href: s.secondaryHref },
            }))
          );
        }
      } catch {
        // fall back to static slides
      }
    }
    loadSlides();
  }, []);

  const goTo = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 800);
  }, [animating]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo, slides.length]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo, slides.length]);

  useEffect(() => {
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, next]);

  return (
    <section className="relative h-[88vh] min-h-[580px] max-h-[920px] overflow-hidden bg-navy-900">

      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.eyebrow}
            fill
            className="object-cover scale-105"
            priority={i === 0}
            sizes="100vw"
          />
          {/* Stronger left-leaning gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/60 to-navy-900/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent" />
        </div>
      ))}

      {/* Text content — left-aligned, full-width container */}
      <div className="relative z-20 h-full flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ease-in-out ${
                i === current
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6 pointer-events-none absolute"
              }`}
            >
              {/* Eyebrow with decorative line */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-0.5 bg-gold-500" />
                <p className="text-gold-400 uppercase tracking-widest text-xs sm:text-sm font-semibold">
                  {slide.eyebrow}
                </p>
              </div>

              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-5 drop-shadow-lg max-w-3xl">
                {slide.heading[0]}
                <br />
                <span className="text-gold-400">{slide.heading[1]}</span>
              </h1>

              <p className="text-blue-100 text-base sm:text-lg md:text-xl max-w-xl mb-8 drop-shadow leading-relaxed">
                {slide.sub}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={slide.primary.href}
                  className="bg-gold-500 text-navy-800 font-bold px-8 py-3.5 rounded-lg hover:bg-gold-400 transition-colors text-sm sm:text-base"
                >
                  {slide.primary.label}
                </Link>
                <Link
                  href={slide.secondary.href}
                  className="border-2 border-white/70 text-white px-8 py-3.5 rounded-lg hover:bg-white hover:text-navy-700 transition-colors text-sm sm:text-base backdrop-blur-sm"
                >
                  {slide.secondary.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide counter + Prev / Next arrows — right side */}
      <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/35 border border-white/25 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-white/60 text-xs font-mono tabular-nums">
          {String(current + 1).padStart(2, "0")}/{String(slides.length).padStart(2, "0")}
        </span>
        <button
          onClick={next}
          aria-label="Next slide"
          className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/35 border border-white/25 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 h-2 bg-gold-500"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-1 text-white/40">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-0.5 bg-white/10">
        <div
          key={current}
          className="h-full bg-gold-500 animate-progress"
          style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
        />
      </div>
    </section>
  );
}
