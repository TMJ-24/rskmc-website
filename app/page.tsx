"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Music, BookOpen, Users, Globe, ChevronRight, Mic, Calendar } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

const serviceSchedule = [
  { day: "Sunday", time: "9:00 AM", name: "Morning Service" },
  { day: "Sunday", time: "6:00 PM", name: "Evening Service" },
  { day: "Wednesday", time: "7:00 PM", name: "Bible Study" },
  { day: "Friday", time: "7:00 PM", name: "Prayer Meeting" },
];

const highlights = [
  { Icon: Music, title: "Worship", desc: "Spirit-filled worship services every Sunday" },
  { Icon: BookOpen, title: "The Word", desc: "Sound biblical teaching rooted in Scripture" },
  { Icon: Users, title: "Community", desc: "A loving family where everyone belongs" },
  { Icon: Globe, title: "Outreach", desc: "Serving our community with the love of Christ" },
];

const fallbackSermons = [
  { id: "f1", title: "Walking in Faith", speaker: "Pastor John Kami", date: "May 25, 2026", scripture: "Hebrews 11:1" },
  { id: "f2", title: "The Power of Prayer", speaker: "Elder Mary Tora", date: "May 18, 2026", scripture: "James 5:16" },
  { id: "f3", title: "Love One Another", speaker: "Pastor John Kami", date: "May 11, 2026", scripture: "John 13:34-35" },
];

const fallbackEvents = [
  { id: "e1", day: "8", month: "Jun", title: "Youth Camp 2026", description: "Annual youth retreat for ages 13-25", time: "All Day" },
  { id: "e2", day: "15", month: "Jun", title: "Community Outreach", description: "Serving meals at the community center", time: "10:00 AM" },
  { id: "e3", day: "22", month: "Jun", title: "Church Anniversary", description: "Celebrating our church's founding", time: "9:00 AM" },
];

type SermonRow = { id: string; title: string; speaker: string; date: string; scripture: string };
type EventRow  = { id: string; day: string; month: string; title: string; description: string; time: string };

export default function Home() {
  const [sermons, setSermons] = useState<SermonRow[]>(fallbackSermons);
  const [events, setEvents] = useState<EventRow[]>(fallbackEvents);

  useEffect(() => {
    async function load() {
      try {
        const [sermonsRes, eventsRes] = await Promise.all([
          client.models.Sermon.list(),
          client.models.Event.list(),
        ]);

        const publishedSermons = sermonsRes.data
          .filter((s) => s.published !== false)
          .sort((a, b) => b.date.localeCompare(a.date))
          .slice(0, 3)
          .map((s) => ({ id: s.id, title: s.title, speaker: s.speaker, date: s.date, scripture: s.scripture }));

        if (publishedSermons.length > 0) setSermons(publishedSermons);

        const publishedEvents = eventsRes.data
          .filter((e) => e.published !== false)
          .slice(0, 3)
          .map((e) => ({ id: e.id, day: e.day, month: e.month, title: e.title, description: e.description, time: e.time }));

        if (publishedEvents.length > 0) setEvents(publishedEvents);
      } catch {
        // keep static fallbacks
      }
    }
    load();
  }, []);

  return (
    <div>
      {/* Hero */}
      <HeroSlider />

      {/* Service Times Banner */}
      <section className="bg-gold-500 text-navy-800 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold">
          {serviceSchedule.map((s, i) => (
            <span key={i}>
              <span className="font-bold">{s.day}</span> · {s.name}: {s.time}
            </span>
          ))}
        </div>
      </section>

      {/* Welcome */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600 mb-3 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-gold-500" />
            Our Church
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-700 mb-6">
            Welcome to Our Family
          </h2>
          <div className="max-w-3xl space-y-4">
            <p className="text-gray-600 text-lg leading-relaxed">
              Rev Sione Kami Memorial Church (RSKMC) is a vibrant, Christ-centered congregation dedicated
              to worship, discipleship, and community service. We honour the legacy of Rev Sione Kami
              through our unwavering commitment to God&apos;s Word and love for all people.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you are new to faith, returning after some time away, or deeply rooted in your walk
              with Christ — you are welcome here. Come as you are.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600 mb-3 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-gold-500" />
            Our Pillars
          </p>
          <h2 className="text-3xl font-bold text-navy-700 mb-12">
            What We&apos;re About
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map(({ Icon, title, desc }, i) => (
              <div
                key={i}
                className="group bg-white rounded-xl p-6 border border-gray-100 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-navy-700 text-gold-400 rounded-xl flex items-center justify-center mb-4 group-hover:bg-navy-600 transition-colors duration-300">
                  <Icon size={22} />
                </div>
                <h3 className="text-navy-700 font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Sermons */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-600 mb-3 flex items-center gap-2">
                <span className="inline-block w-6 h-px bg-gold-500" />
                Recent Messages
              </p>
              <h2 className="text-3xl font-bold text-navy-700">Latest Sermons</h2>
            </div>
            <Link href="/sermons" className="text-gold-600 font-semibold hover:underline text-sm flex items-center gap-1 mb-1 shrink-0">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sermons.map((sermon) => (
              <div
                key={sermon.id}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="bg-navy-700 h-1.5 group-hover:bg-gold-500 transition-colors duration-300" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-navy-700 text-gold-400 rounded-lg flex items-center justify-center">
                      <Mic size={14} />
                    </div>
                    <p className="text-gold-600 text-xs font-semibold uppercase tracking-wide">
                      {sermon.date}
                    </p>
                  </div>
                  <h3 className="text-navy-700 font-bold text-lg mb-1">{sermon.title}</h3>
                  <p className="text-gray-500 text-sm mb-1">{sermon.speaker}</p>
                  <p className="text-gray-400 text-xs italic">{sermon.scripture}</p>
                  <Link
                    href="/sermons"
                    className="mt-4 inline-flex items-center gap-1 text-gold-600 text-sm font-semibold hover:underline"
                  >
                    Listen <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-navy-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-3 flex items-center gap-2">
                <span className="inline-block w-6 h-px bg-gold-400" />
                What&apos;s On
              </p>
              <h2 className="text-3xl font-bold">Upcoming Events</h2>
            </div>
            <Link href="/events" className="text-gold-400 hover:underline text-sm font-semibold flex items-center gap-1 mb-1 shrink-0">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="flex gap-4 bg-navy-600 rounded-xl p-5 hover:bg-navy-500/80 transition-colors duration-200">
                <div className="bg-gold-500 text-navy-800 font-bold rounded-lg w-14 h-14 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xl font-bold leading-none">{event.day}</span>
                  <span className="text-xs uppercase">{event.month}</span>
                </div>
                <div>
                  <h3 className="font-bold mb-1">{event.title}</h3>
                  <p className="text-blue-200 text-sm">{event.description}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar size={12} className="text-gold-400" />
                    <p className="text-gold-400 text-xs">{event.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Give CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600 mb-3 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-gold-500" />
            Generosity
          </p>
          <h2 className="text-3xl font-bold text-navy-700 mb-4">Support Our Ministry</h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl">
            Your generous giving enables us to serve our congregation and community.
            Every contribution makes a difference.
          </p>
          <Link
            href="/give"
            className="bg-gold-500 text-navy-800 font-bold px-10 py-4 rounded-lg text-lg hover:bg-gold-400 active:scale-95 transition-all duration-200 inline-block"
          >
            Give Now
          </Link>
        </div>
      </section>
    </div>
  );
}
