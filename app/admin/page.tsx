"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Mic, CalendarDays, MessageSquare, Image as ImageIcon, Users, UserRound, Clock } from "lucide-react";
import Link from "next/link";

const client = generateClient<Schema>();

interface Stats {
  sermons: number;
  events: number;
  unreadMessages: number;
  slides: number;
  ministries: number;
  leaders: number;
  serviceTimes: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ sermons: 0, events: 0, unreadMessages: 0, slides: 0, ministries: 0, leaders: 0, serviceTimes: 0 });
  const [recentMessages, setRecentMessages] = useState<Schema["ContactSubmission"]["type"][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [sermons, events, messages, slides, ministries, leaders, serviceTimes] = await Promise.all([
          client.models.Sermon.list(),
          client.models.Event.list(),
          client.models.ContactSubmission.list(),
          client.models.HeroSlide.list(),
          client.models.Ministry.list(),
          client.models.Leader.list(),
          client.models.ServiceTime.list(),
        ]);
        setStats({
          sermons: sermons.data.length,
          events: events.data.length,
          unreadMessages: messages.data.filter((m) => !m.read).length,
          slides: slides.data.length,
          ministries: ministries.data.length,
          leaders: leaders.data.length,
          serviceTimes: serviceTimes.data.length,
        });
        setRecentMessages(
          [...messages.data]
            .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
            .slice(0, 5)
        );
      } catch {
        // Backend may not be redeployed yet
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cards = [
    { label: "Sermons", value: stats.sermons, Icon: Mic, href: "/admin/sermons", color: "bg-navy-700" },
    { label: "Events", value: stats.events, Icon: CalendarDays, href: "/admin/events", color: "bg-gold-600" },
    { label: "Unread Messages", value: stats.unreadMessages, Icon: MessageSquare, href: "/admin/contact", color: "bg-red-600" },
    { label: "Hero Slides", value: stats.slides, Icon: ImageIcon, href: "/admin/slides", color: "bg-emerald-600" },
    { label: "Ministries", value: stats.ministries, Icon: Users, href: "/admin/ministries", color: "bg-purple-600" },
    { label: "Leaders", value: stats.leaders, Icon: UserRound, href: "/admin/leaders", color: "bg-blue-600" },
    { label: "Service Times", value: stats.serviceTimes, Icon: Clock, href: "/admin/services", color: "bg-teal-600" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-navy-700 mb-2">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-8">Overview of your church website content</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 mb-10">
        {cards.map(({ label, value, Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div className={`${color} text-white w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
              <Icon size={22} />
            </div>
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">{label}</p>
              <p className="text-2xl font-bold text-navy-700">{loading ? "—" : value}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-navy-700">Recent Contact Messages</h2>
          <Link href="/admin/contact" className="text-gold-600 text-sm font-semibold hover:underline">
            View all
          </Link>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">Loading...</div>
        ) : recentMessages.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">No messages yet.</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="px-6 py-4 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-navy-100 text-navy-700 flex items-center justify-center shrink-0 text-sm font-bold">
                  {msg.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-navy-700 text-sm">{msg.name}</p>
                    {!msg.read && (
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-medium">New</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm truncate">{msg.subject}</p>
                  <p className="text-gray-400 text-xs">{msg.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
