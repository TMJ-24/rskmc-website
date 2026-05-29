"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
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
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 800);
  }, [animating]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, next]);

  return (
    <section className="relative h-[92vh] min-h-[560px] max-h-[900px] overflow-hidden bg-navy-900">

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
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          {/* Gradient overlay — deeper at bottom so service-times banner blends */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/50 to-navy-900/80" />
        </div>
      ))}

      {/* Text content — only active slide text is interactive */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 flex flex-col items-center justify-center px-4 transition-all duration-700 ease-in-out ${
              i === current
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <p className="text-gold-400 uppercase tracking-widest text-xs sm:text-sm font-semibold mb-4">
              {slide.eyebrow}
            </p>
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5 drop-shadow-lg">
              {slide.heading[0]}
              <br />
              {slide.heading[1]}
            </h1>
            <p className="text-blue-100 text-base sm:text-lg max-w-xl mb-8 drop-shadow">
              {slide.sub}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={slide.primary.href}
                className="bg-gold-500 text-navy-800 font-bold px-8 py-3 rounded-full hover:bg-gold-400 transition-colors"
              >
                {slide.primary.label}
              </Link>
              <Link
                href={slide.secondary.href}
                className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-navy-700 transition-colors"
              >
                {slide.secondary.label}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 border border-white/30 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 border border-white/30 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-7 h-2.5 bg-gold-500"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
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
