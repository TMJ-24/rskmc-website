"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Phone, Mail, ChevronRight } from "lucide-react";

const client = generateClient<Schema>();
type SiteSettings = Schema["SiteSettings"]["type"];
type ServiceTime  = Schema["ServiceTime"]["type"];

const staticServices = [
  { id: "s1", day: "Sunday",    time: "9:00 AM",  name: "Morning Service",  order: 1, published: true, createdAt: "", updatedAt: "" },
  { id: "s2", day: "Sunday",    time: "6:00 PM",  name: "Evening Service",  order: 2, published: true, createdAt: "", updatedAt: "" },
  { id: "s3", day: "Wednesday", time: "7:00 PM",  name: "Bible Study",      order: 3, published: true, createdAt: "", updatedAt: "" },
  { id: "s4", day: "Friday",    time: "7:00 PM",  name: "Prayer Meeting",   order: 4, published: true, createdAt: "", updatedAt: "" },
] as ServiceTime[];

const quickLinks = [
  { href: "/about",        label: "About Us" },
  { href: "/services",     label: "Services" },
  { href: "/ministries",   label: "Ministries" },
  { href: "/sermons",      label: "Sermons" },
  { href: "/events",       label: "News & Events" },
  { href: "/projects",     label: "Projects" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/give",         label: "Give & Contact" },
];

// Group service times by day for display
function groupByDay(services: ServiceTime[]) {
  const map: Record<string, ServiceTime[]> = {};
  for (const s of services) {
    if (!map[s.day]) map[s.day] = [];
    map[s.day].push(s);
  }
  return map;
}

export default function Footer() {
  const [settings,  setSettings]  = useState<Partial<SiteSettings> | null>(null);
  const [services,  setServices]  = useState<ServiceTime[]>(staticServices);

  useEffect(() => {
    async function load() {
      try {
        const [sRes, svRes] = await Promise.all([
          client.models.SiteSettings.list(),
          client.models.ServiceTime.list(),
        ]);
        if (sRes.data.length > 0) setSettings(sRes.data[0]);
        const published = svRes.data.filter((s) => s.published !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        if (published.length > 0) setServices(published);
      } catch { /* keep defaults */ }
    }
    load();
  }, []);

  const address     = settings?.addressLine1 ?? "Gabaka Street";
  const city        = settings?.city         ?? "Port Moresby, NCD 675";
  const country     = settings?.country      ?? "Papua New Guinea";
  const phone       = settings?.phone        ?? "325 5448";
  const email       = settings?.email        ?? "info@rskmc.org.pg";

  const grouped = groupByDay(services);
  const dayOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <footer className="bg-navy-800 text-blue-100 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Column 1: Church info */}
        <div>
          <h3 className="text-gold-500 font-bold text-lg mb-1">RSKMC</h3>
          <p className="text-blue-200 text-sm mb-3">Rev Sione Kami Memorial Church</p>
          <p className="text-blue-300 text-sm">{address}</p>
          <p className="text-blue-300 text-sm">{city}</p>
          <p className="text-blue-300 text-sm">{country}</p>
          <div className="mt-3 space-y-1">
            <p className="text-blue-300 text-sm flex items-center gap-2">
              <Phone size={13} className="shrink-0 text-gold-500/70" />
              {phone}
            </p>
            <p className="text-blue-300 text-sm flex items-center gap-2">
              <Mail size={13} className="shrink-0 text-gold-500/70" />
              {email}
            </p>
          </div>
        </div>

        {/* Column 2: Service Times (live from backend) */}
        <div>
          <h3 className="text-gold-500 font-bold text-lg mb-3">Service Times</h3>
          <div className="text-sm text-blue-300 space-y-2">
            {dayOrder.filter((d) => grouped[d]).map((day) => (
              <p key={day}>
                <span className="text-white font-semibold">{day}</span><br />
                {grouped[day].map((s) => `${s.name}: ${s.time}`).join(" · ")}
              </p>
            ))}
          </div>
        </div>

        {/* Column 3: Quick Links */}
        <div>
          <h3 className="text-gold-500 font-bold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-blue-300 text-sm hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                >
                  <ChevronRight size={13} className="text-gold-500/60 shrink-0" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5 text-xs text-blue-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-y-1">
          <span>© {new Date().getFullYear()} Rev Sione Kami Memorial Church. All rights reserved.</span>
          <div className="flex gap-x-6">
            <Link href="/terms"   className="hover:text-white transition-colors duration-200">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
