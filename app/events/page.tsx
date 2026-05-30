"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Clock, MapPin, Newspaper, CalendarDays } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";

const client = generateClient<Schema>();
type Event = Schema["Event"]["type"];

const staticNews = [
  {
    id: "n1",
    date: "27 May 2026",
    category: "Announcement",
    title: "Building Fund Milestone Reached",
    body: "We praise God that our sanctuary extension building fund has surpassed the 60% mark. Thank you to every member and partner who has contributed. The project remains on track for completion by end of year.",
  },
  {
    id: "n2",
    date: "20 May 2026",
    category: "Ministry",
    title: "New Youth Leadership Team Commissioned",
    body: "Eight young leaders were commissioned during the Sunday morning service to lead our youth ministry for the 2026 season. Please keep them in your prayers as they serve the next generation.",
  },
  {
    id: "n3",
    date: "12 May 2026",
    category: "Outreach",
    title: "Community Feeding Programme Expands",
    body: "Our weekly community feeding programme has expanded to serve two additional settlements in the NCD area, bringing the total number of families served each week to over 120.",
  },
];

const staticEvents = [
  { id: "1", day: "8",  month: "Jun", title: "Youth Camp 2026",           time: "All Weekend",        location: "Church Grounds",  description: "Annual youth camp with worship, games, and discipleship sessions. Open to all ages 13–25.", category: "Youth" },
  { id: "2", day: "15", month: "Jun", title: "Community Food Drive",       time: "10:00 AM – 2:00 PM", location: "Community Centre",description: "Serving hot meals and food parcels to families in need. Volunteers welcome.", category: "Outreach" },
  { id: "3", day: "22", month: "Jun", title: "Church Anniversary Service", time: "9:00 AM",             location: "Main Sanctuary",  description: "A special anniversary service celebrating the founding of RSKMC with praise, thanksgiving, and fellowship lunch.", category: "Special Service" },
  { id: "4", day: "29", month: "Jun", title: "Men's Breakfast & Prayer",   time: "7:00 AM",             location: "Church Hall",     description: "Monthly men's breakfast with devotion, discussion, and prayer. All men welcome.", category: "Men's Ministry" },
  { id: "5", day: "6",  month: "Jul", title: "Women's Bible Study Day",    time: "9:00 AM – 1:00 PM",  location: "Church Hall",     description: "A full morning of women's Bible study, worship, and fellowship. Lunch provided.", category: "Women's Ministry" },
  { id: "6", day: "20", month: "Jul", title: "Prayer & Fasting Week",      time: "All Week",            location: "Church & Online", description: "A week of corporate prayer and fasting. Daily 6:00 AM prayer meetings and evening devotionals.", category: "Prayer" },
];

const categoryColour: Record<string, string> = {
  Youth:             "bg-purple-50 text-purple-700",
  Outreach:          "bg-emerald-50 text-emerald-700",
  "Special Service": "bg-gold-50 text-gold-700",
  "Men's Ministry":  "bg-blue-50 text-blue-700",
  "Women's Ministry":"bg-pink-50 text-pink-700",
  Prayer:            "bg-indigo-50 text-indigo-700",
  Announcement:      "bg-navy-50 text-navy-700",
  Ministry:          "bg-gold-50 text-gold-700",
};

const newsTagColour: Record<string, string> = {
  Announcement: "bg-navy-100 text-navy-700",
  Ministry:     "bg-gold-100 text-gold-600",
  Outreach:     "bg-emerald-50 text-emerald-700",
};

export default function NewsEvents() {
  const [events,  setEvents]  = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await client.models.Event.list();
        const published = res.data.filter((e) => e.published !== false);
        setEvents(published.length > 0 ? published : (staticEvents as unknown as Event[]));
      } catch {
        setEvents(staticEvents as unknown as Event[]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-800 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=75"
            alt=""
            fill
            className="object-cover opacity-15"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "News & Events" }]} />
          <p className="eyebrow text-gold-400 mb-4">Stay Informed</p>
          <h1 className="h-section text-white mb-4">News &amp; Events</h1>
          <p className="body-lg text-blue-200 max-w-2xl">
            The latest announcements, ministry updates, and upcoming gatherings at RSKMC.
          </p>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper size={18} className="text-gold-600" />
            <p className="eyebrow text-gold-600">Latest News</p>
          </div>
          <h2 className="h-section text-navy-700 mb-12">Church Updates</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {staticNews.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${newsTagColour[item.category] ?? "bg-gray-100 text-gray-500"}`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
                <h3 className="h-card text-navy-700 mb-3">{item.title}</h3>
                <p className="body text-gray-500 flex-1">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <CalendarDays size={18} className="text-gold-600" />
            <p className="eyebrow text-gold-600">Calendar</p>
          </div>
          <h2 className="h-section text-navy-700 mb-12">Upcoming Events</h2>
          {loading ? (
            <div className="text-center text-gray-400 py-20">Loading events…</div>
          ) : (
            <div className="grid gap-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col sm:flex-row"
                >
                  {/* Date block */}
                  <div className="bg-navy-800 text-white flex flex-col items-center justify-center w-full sm:w-24 py-5 sm:py-0 shrink-0 group-hover:bg-navy-700 transition-colors duration-300">
                    <span className="text-3xl font-bold text-gold-400 leading-none">{event.day}</span>
                    <span className="text-[11px] uppercase tracking-widest text-blue-300 mt-1.5">{event.month}</span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={`text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${categoryColour[event.category] ?? "bg-gray-100 text-gray-500"}`}>
                        {event.category}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-400">
                        <Clock size={13} className="shrink-0" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-400">
                        <MapPin size={13} className="shrink-0" />
                        {event.location}
                      </span>
                    </div>
                    <h3 className="h-card text-navy-700 mb-2">{event.title}</h3>
                    <p className="body text-gray-500">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="h-section text-white mb-3">Want to Get Involved?</h2>
          <p className="body-lg text-blue-200 mb-8 max-w-xl">
            Contact us to volunteer, register for an event, or suggest a ministry activity.
          </p>
          <a
            href="mailto:info@rskmc.org.pg"
            className="inline-flex items-center gap-2 bg-gold-500 text-navy-800 font-bold px-8 py-3.5 rounded-xl hover:bg-gold-400 active:scale-95 transition-all duration-200 text-sm"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
