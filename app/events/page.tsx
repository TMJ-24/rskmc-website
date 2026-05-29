"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Clock, MapPin } from "lucide-react";

const client = generateClient<Schema>();
type Event = Schema["Event"]["type"];

const staticEvents = [
  { id: "1", day: "8", month: "Jun", title: "Youth Camp 2026", time: "All Weekend", location: "Church Grounds", description: "Annual youth camp with worship, games, and discipleship sessions. Open to all ages 13-25.", category: "Youth", published: true },
  { id: "2", day: "15", month: "Jun", title: "Community Food Drive", time: "10:00 AM - 2:00 PM", location: "Community Centre", description: "Serving hot meals and food parcels to families in need. Volunteers welcome — contact the church to help.", category: "Outreach", published: true },
  { id: "3", day: "22", month: "Jun", title: "Church Anniversary Service", time: "9:00 AM", location: "Main Sanctuary", description: "A special anniversary service celebrating the founding of RSKMC with praise, thanksgiving, and fellowship lunch.", category: "Special Service", published: true },
  { id: "4", day: "29", month: "Jun", title: "Men's Breakfast and Prayer", time: "7:00 AM", location: "Church Hall", description: "Monthly men's breakfast featuring devotion, discussion, and prayer. All men in the congregation are welcome.", category: "Men's Ministry", published: true },
  { id: "5", day: "6", month: "Jul", title: "Women's Bible Study Day", time: "9:00 AM - 1:00 PM", location: "Church Hall", description: "A full morning of women's Bible study, worship, and fellowship. Lunch provided.", category: "Women's Ministry", published: true },
  { id: "6", day: "20", month: "Jul", title: "Prayer and Fasting Week", time: "All Week", location: "Church and Online", description: "A week of corporate prayer and fasting. Daily 6:00 AM prayer meetings and evening devotionals.", category: "Prayer", published: true },
];

const categoryStyles: Record<string, string> = {
  Youth: "bg-purple-100 text-purple-700",
  Outreach: "bg-green-100 text-green-700",
  "Special Service": "bg-gold-100 text-gold-700",
  "Men's Ministry": "bg-blue-100 text-blue-700",
  "Women's Ministry": "bg-pink-100 text-pink-700",
  Prayer: "bg-indigo-100 text-indigo-700",
  Fellowship: "bg-amber-100 text-amber-700",
  Music: "bg-rose-100 text-rose-700",
  Special: "bg-gold-100 text-gold-700",
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
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
      <section className="bg-navy-700 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
        <p className="text-blue-200 text-xl max-w-2xl mx-auto">
          Stay connected with what&apos;s happening at RSKMC.
        </p>
      </section>

      {/* Events List */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading events...</div>
        ) : (
          <div className="grid gap-5">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col sm:flex-row"
              >
                <div className="bg-navy-700 text-white flex flex-col items-center justify-center w-full sm:w-24 py-4 sm:py-0 shrink-0">
                  <span className="text-3xl font-bold text-gold-400 leading-none">{event.day}</span>
                  <span className="text-xs uppercase tracking-wider text-blue-300 mt-1">{event.month}</span>
                </div>
                <div className="p-6 flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        categoryStyles[event.category] ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {event.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-navy-700 text-xl mb-2">{event.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-gold-600" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-gold-600" />
                      {event.location}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Get Involved CTA */}
      <section className="bg-gold-500 py-14 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-navy-800 mb-2">Want to Get Involved?</h2>
          <p className="text-navy-700 mb-6">
            Contact us to volunteer, register for an event, or suggest a ministry activity.
          </p>
          <a
            href="/give"
            className="bg-navy-700 text-white font-bold px-8 py-3 rounded-full hover:bg-navy-800 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
