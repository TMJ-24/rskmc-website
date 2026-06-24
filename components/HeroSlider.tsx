"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  src: string;
  eyebrow: string;
  heading: [string, string];
  sub: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

const slides: Slide[] = [
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

  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);

  useEffect(() => {
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, next]);

  return (
    <section className="relative h-[62vh] min-h-[400px] max-h-[640px] overflow-hidden bg-navy-900">

      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image src={slide.src} alt={slide.eyebrow} fill className="object-cover scale-105" priority={i === 0} sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/60 to-navy-900/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
        </div>
      ))}

      {/* Text content */}
      <div className="relative z-20 h-full flex flex-col justify-center pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ease-in-out ${
                i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none absolute"
              }`}
            >
              <p className="eyebrow text-gold-400 mb-4">{slide.eyebrow}</p>
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 drop-shadow-lg max-w-3xl">
                {slide.heading[0]}<br />
                <span className="text-gold-400">{slide.heading[1]}</span>
              </h1>
              <p className="text-blue-100 text-sm sm:text-base md:text-lg max-w-xl mb-6 drop-shadow leading-relaxed">
                {slide.sub}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={slide.primary.href} className="bg-gold-500 text-navy-800 font-bold px-6 py-2.5 rounded-lg hover:bg-gold-400 transition-colors text-sm">
                  {slide.primary.label}
                </Link>
                <Link href={slide.secondary.href} className="border border-white/70 text-white px-6 py-2.5 rounded-lg hover:bg-white hover:text-navy-700 transition-colors text-sm backdrop-blur-sm">
                  {slide.secondary.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom control bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="h-0.5 bg-white/10">
          <div key={current} className="h-full bg-gold-500 animate-progress" style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3 bg-navy-900/60 backdrop-blur-sm">
          <span className="text-white/50 text-xs font-mono tabular-nums">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-1.5 bg-gold-500" : "w-1.5 h-1.5 bg-white/35 hover:bg-white/60"}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prev} aria-label="Previous slide" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} aria-label="Next slide" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
