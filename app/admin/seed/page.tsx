"use client";

import { useState, useEffect, useCallback } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import {
  Database, CheckCircle2, AlertTriangle, Loader2, Play,
  RefreshCcw, ChevronDown, ChevronUp,
} from "lucide-react";

const client = generateClient<Schema>();

// ─── Seed data (mirrors all static fallbacks in the frontend) ──────────────

const SEED_SERVICES = [
  { day: "Sunday",    time: "9:00 AM",  name: "Morning Worship Service",  duration: "~90 min", description: "Our main Sunday service with praise and worship, prayer, and the preaching of God's Word. Children's church runs concurrently.", order: 1, published: true },
  { day: "Sunday",    time: "6:00 PM",  name: "Evening Service",          duration: "~60 min", description: "A reflective evening gathering with song, prayer, and a short devotional.", order: 2, published: true },
  { day: "Wednesday", time: "7:00 PM",  name: "Midweek Bible Study",      duration: "~75 min", description: "In-depth study of the Scriptures for spiritual growth and understanding of God's Word.", order: 3, published: true },
  { day: "Friday",    time: "7:00 PM",  name: "Prayer and Worship Night", duration: "~60 min", description: "A dedicated time of corporate prayer, intercession, and worship for the church and community.", order: 4, published: true },
];

const SEED_SERMONS = [
  { title: "Walking in Faith",      speaker: "Pastor John Kami",  date: "May 25, 2026", scripture: "Hebrews 11:1",       series: "Faith Series",      duration: "42 min", published: true },
  { title: "The Power of Prayer",   speaker: "Elder Mary Tora",   date: "May 18, 2026", scripture: "James 5:16",         series: "Standalone",        duration: "38 min", published: true },
  { title: "Love One Another",      speaker: "Pastor John Kami",  date: "May 11, 2026", scripture: "John 13:34-35",      series: "Standalone",        duration: "45 min", published: true },
  { title: "The Armor of God",      speaker: "Deacon Peter Rosi", date: "May 4, 2026",  scripture: "Ephesians 6:10-18", series: "Spiritual Warfare", duration: "50 min", published: true },
  { title: "Renewed by His Grace",  speaker: "Pastor John Kami",  date: "Apr 27, 2026", scripture: "Romans 12:2",        series: "Standalone",        duration: "40 min", published: true },
  { title: "Be Still and Know",     speaker: "Elder Mary Tora",   date: "Apr 20, 2026", scripture: "Psalm 46:10",        series: "Standalone",        duration: "35 min", published: true },
];

const SEED_EVENTS = [
  { day: "8",  month: "Jun", title: "Youth Camp 2026",          time: "All Weekend",         location: "Church Grounds",    description: "Annual youth camp with worship, games, and discipleship sessions. Open to all ages 13-25.",                                                        category: "Youth",            published: true },
  { day: "15", month: "Jun", title: "Community Food Drive",     time: "10:00 AM - 2:00 PM", location: "Community Centre",  description: "Serving hot meals and food parcels to families in need. Volunteers welcome — contact the church to help.",                                    category: "Outreach",         published: true },
  { day: "22", month: "Jun", title: "Church Anniversary Service",time: "9:00 AM",            location: "Main Sanctuary",    description: "A special anniversary service celebrating the founding of RSKMC with praise, thanksgiving, and fellowship lunch.",                            category: "Special Service",  published: true },
  { day: "29", month: "Jun", title: "Men's Breakfast and Prayer",time: "7:00 AM",            location: "Church Hall",       description: "Monthly men's breakfast featuring devotion, discussion, and prayer. All men in the congregation are welcome.",                              category: "Men's Ministry",   published: true },
  { day: "6",  month: "Jul", title: "Women's Bible Study Day",  time: "9:00 AM - 1:00 PM", location: "Church Hall",       description: "A full morning of women's Bible study, worship, and fellowship. Lunch provided.",                                                            category: "Women's Ministry", published: true },
  { day: "20", month: "Jul", title: "Prayer and Fasting Week",  time: "All Week",           location: "Church and Online", description: "A week of corporate prayer and fasting. Daily 6:00 AM prayer meetings and evening devotionals.",                                            category: "Prayer",           published: true },
];

const SEED_LEADERS = [
  { name: "Pastor John Kami",     role: "Senior Pastor",     order: 1, published: true },
  { name: "Elder Samuel Vatu",    role: "Board Elder",       order: 2, published: true },
  { name: "Deaconess Mary Tora",  role: "Women's Ministry",  order: 3, published: true },
  { name: "Deacon Peter Rosi",    role: "Outreach Ministry", order: 4, published: true },
  { name: "Sis. Grace Kami",      role: "Youth Ministry",    order: 5, published: true },
  { name: "Bro. David Lewa",      role: "Worship Ministry",  order: 6, published: true },
];

const SEED_MINISTRIES = [
  { name: "Praise & Worship",               commission: "Worship Commission",      tagline: "Lifting His Name in Song",          description: "Leading the congregation in heartfelt, Spirit-filled worship every service. Our team of singers and musicians are dedicated to creating an atmosphere of reverence and joy.", fellowship: "Every Sunday · 8:00 AM rehearsal",      icon: "Music",      order: 1,  published: true },
  { name: "Media Ministry",                  commission: "Worship Commission",      tagline: "Amplifying the Kingdom",            description: "Handling all audio, visual, and online streaming needs of the church. This ministry ensures that every service is recorded and shared with those who cannot attend in person.", fellowship: "Every Sunday · Setup from 7:30 AM",  icon: "Tv",         order: 2,  published: true },
  { name: "Ushering Ministry",               commission: "Worship Commission",      tagline: "Serving with Excellence",           description: "Welcoming every visitor and member with warmth and order. Our ushers ensure a smooth, organised, and welcoming experience for all who enter God's house.",                    fellowship: "Every Sunday · Briefing at 8:30 AM", icon: "UserCheck",  order: 3,  published: true },
  { name: "Youth Ministry",                  commission: "Discipleship Commission", tagline: "Raising the Next Generation",       description: "Empowering young people aged 13-35 to discover their identity in Christ, grow in faith, and lead with purpose.",                                                              fellowship: "Fridays · 6:00 PM",                  icon: "Sparkles",   order: 4,  published: true },
  { name: "Sunday School",                   commission: "Discipleship Commission", tagline: "Faith Starts Young",                description: "Nurturing children aged 3-12 in the knowledge and love of God through age-appropriate Bible lessons, songs, and activities.",                                               fellowship: "Sundays · During morning service",    icon: "BookOpen",   order: 5,  published: true },
  { name: "Prayer Ministry",                 commission: "Discipleship Commission", tagline: "The Engine Room of the Church",     description: "Interceding for the church, the nation, and the world. Our prayer warriors meet regularly to seek God's face.",                                                               fellowship: "Fridays · 7:00 PM",                  icon: "Flame",      order: 6,  published: true },
  { name: "Gulf Provincial Fellowship",      commission: "Evangelism Commission",   tagline: "Reaching the Gulf Province",        description: "Connecting and supporting members from the Gulf Province of PNG, fostering community, cultural connection, and evangelism.",                                                  fellowship: "Monthly · Last Saturday",            icon: "Globe",      order: 7,  published: true },
  { name: "Milne Bay Provincial Fellowship", commission: "Evangelism Commission",   tagline: "Reaching the Milne Bay Province",  description: "A vibrant fellowship for members from Milne Bay, fostering community, cultural identity, and shared faith.",                                                                fellowship: "Monthly · Second Saturday",          icon: "Globe",      order: 8,  published: true },
  { name: "Connecting Point",                commission: "Evangelism Commission",   tagline: "Bridging Lives to Christ",          description: "A welcoming ministry focused on connecting new visitors and seekers to the life of the church.",                                                                            fellowship: "Sundays · After morning service",     icon: "Handshake",  order: 9,  published: true },
  { name: "Men's Ministry",                  commission: "Ministry Commission",     tagline: "Men of God, Men of Purpose",        description: "Building men of integrity, faith, and responsibility through fellowship, Bible study, and mutual accountability.",                                                           fellowship: "Monthly Saturday · 7:00 AM Breakfast",icon: "ShieldCheck",order: 10, published: true },
  { name: "Women's Ministry",                commission: "Ministry Commission",     tagline: "Women of Strength and Grace",       description: "Encouraging and equipping women to walk fully in their God-given purpose through Bible study, fellowship, and community service.",                                          fellowship: "Monthly Saturday · 9:00 AM",         icon: "Heart",      order: 11, published: true },
  { name: "Pulpit Ministry",                 commission: "Ministry Commission",     tagline: "Preaching the Word with Power",     description: "Coordinating and supporting the preaching and teaching ministry of the church every service.",                                                                              fellowship: "Coordination as scheduled",          icon: "Mic",        order: 12, published: true },
  { name: "Treasury Ministry",               commission: "Ministry Commission",     tagline: "Faithful Stewardship of Resources", description: "Overseeing the financial stewardship of the church with transparency and integrity.",                                                                                     fellowship: "Weekly after Sunday service",         icon: "Coins",      order: 13, published: true },
  { name: "Cleaning Ministry",               commission: "Ministry Commission",     tagline: "Serving Behind the Scenes",         description: "Keeping God's house clean, beautiful, and welcoming for every gathering. This dedicated team serves quietly but faithfully.",                                                fellowship: "Saturdays · 9:00 AM",                icon: "Sparkles",   order: 14, published: true },
];

const SEED_SLIDES = [
  { eyebrow: "Welcome to RSKMC",       headingLine1: "Rev Sione Kami",    headingLine2: "Memorial Church",      sub: "Building Lives. Transforming Communities. Glorifying God.",                 imageUrl: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?auto=format&fit=crop&w=1920&q=80", primaryLabel: "Join Us Sunday",   primaryHref: "/services", secondaryLabel: "Learn More",      secondaryHref: "/about",    order: 1, active: true },
  { eyebrow: "Come & Worship",         headingLine1: "Every Sunday,",     headingLine2: "Join Us in Praise",    sub: "Morning Service at 9:00 AM · Evening Service at 6:00 PM",                 imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80", primaryLabel: "Service Times",    primaryHref: "/services", secondaryLabel: "Our Sermons",     secondaryHref: "/sermons",  order: 2, active: true },
  { eyebrow: "Our Community",          headingLine1: "A Family Where",    headingLine2: "Everyone Belongs",     sub: "Rooted in faith, grounded in love, united in purpose.",                    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=80", primaryLabel: "Our Ministries",   primaryHref: "/ministries",secondaryLabel: "Upcoming Events", secondaryHref: "/events",   order: 3, active: true },
  { eyebrow: "Grounded in the Word",   headingLine1: "Built on Scripture",headingLine2: "and Prayer",           sub: "Sound biblical teaching every week for every season of life.",             imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1920&q=80", primaryLabel: "Latest Sermons",   primaryHref: "/sermons",  secondaryLabel: "Give Now",        secondaryHref: "/give",     order: 4, active: true },
];

// ─── Section config ────────────────────────────────────────────────────────

const SECTIONS = [
  { key: "services",   label: "Service Times",   count: SEED_SERVICES.length,   preview: SEED_SERVICES.map((s) => `${s.day} ${s.time} — ${s.name}`) },
  { key: "sermons",    label: "Sermons",          count: SEED_SERMONS.length,    preview: SEED_SERMONS.map((s) => `${s.date} — ${s.title}`) },
  { key: "events",     label: "Events",           count: SEED_EVENTS.length,     preview: SEED_EVENTS.map((e) => `${e.day} ${e.month} — ${e.title}`) },
  { key: "leaders",    label: "Leadership Team",  count: SEED_LEADERS.length,    preview: SEED_LEADERS.map((l) => `${l.name} · ${l.role}`) },
  { key: "ministries", label: "Ministries",       count: SEED_MINISTRIES.length, preview: SEED_MINISTRIES.map((m) => `${m.name} (${m.commission})`) },
  { key: "slides",     label: "Hero Slides",      count: SEED_SLIDES.length,     preview: SEED_SLIDES.map((s) => `Slide ${s.order}: ${s.headingLine1} ${s.headingLine2}`) },
] as const;

type SectionKey = typeof SECTIONS[number]["key"];
type Status = "idle" | "checking" | "seeding" | "done" | "exists" | "error";

interface SectionState {
  existingCount: number;
  status: Status;
  seededCount: number;
  error?: string;
}

const init: SectionState = { existingCount: 0, status: "checking", seededCount: 0 };

async function seedSection(key: SectionKey): Promise<number> {
  switch (key) {
    case "services":
      for (const item of SEED_SERVICES) await client.models.ServiceTime.create(item);
      return SEED_SERVICES.length;
    case "sermons":
      for (const item of SEED_SERMONS) await client.models.Sermon.create(item);
      return SEED_SERMONS.length;
    case "events":
      for (const item of SEED_EVENTS) await client.models.Event.create(item);
      return SEED_EVENTS.length;
    case "leaders":
      for (const item of SEED_LEADERS) await client.models.Leader.create(item);
      return SEED_LEADERS.length;
    case "ministries":
      for (const item of SEED_MINISTRIES) await client.models.Ministry.create(item);
      return SEED_MINISTRIES.length;
    case "slides":
      for (const item of SEED_SLIDES) await client.models.HeroSlide.create(item);
      return SEED_SLIDES.length;
  }
}

async function countExisting(key: SectionKey): Promise<number> {
  switch (key) {
    case "services":   return (await client.models.ServiceTime.list()).data.length;
    case "sermons":    return (await client.models.Sermon.list()).data.length;
    case "events":     return (await client.models.Event.list()).data.length;
    case "leaders":    return (await client.models.Leader.list()).data.length;
    case "ministries": return (await client.models.Ministry.list()).data.length;
    case "slides":     return (await client.models.HeroSlide.list()).data.length;
  }
}

export default function SeedPage() {
  const [states, setStates] = useState<Record<SectionKey, SectionState>>(
    Object.fromEntries(SECTIONS.map((s) => [s.key, { ...init }])) as Record<SectionKey, SectionState>
  );
  const [expanded, setExpanded] = useState<Record<SectionKey, boolean>>(
    Object.fromEntries(SECTIONS.map((s) => [s.key, false])) as Record<SectionKey, boolean>
  );
  const [seedingAll, setSeedingAll] = useState(false);

  const update = (key: SectionKey, patch: Partial<SectionState>) =>
    setStates((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));

  const checkAll = useCallback(async () => {
    setStates(Object.fromEntries(SECTIONS.map((s) => [s.key, { ...init, status: "checking" }])) as Record<SectionKey, SectionState>);
    await Promise.all(
      SECTIONS.map(async ({ key }) => {
        try {
          const existingCount = await countExisting(key);
          update(key, { existingCount, status: existingCount > 0 ? "exists" : "idle" });
        } catch {
          update(key, { status: "error", error: "Could not reach backend" });
        }
      })
    );
  }, []);

  useEffect(() => { checkAll(); }, [checkAll]);

  async function handleSeed(key: SectionKey) {
    update(key, { status: "seeding", error: undefined });
    try {
      const seededCount = await seedSection(key);
      update(key, { status: "done", seededCount, existingCount: seededCount });
    } catch (e) {
      update(key, { status: "error", error: String(e) });
    }
  }

  async function handleSeedAll() {
    setSeedingAll(true);
    const empty = SECTIONS.filter(({ key }) => states[key].status === "idle");
    for (const { key } of empty) await handleSeed(key);
    setSeedingAll(false);
  }

  const emptyCount = SECTIONS.filter(({ key }) => states[key].status === "idle").length;
  const allChecked = SECTIONS.every(({ key }) => states[key].status !== "checking");

  const totalRecords = SECTIONS.reduce((a, s) => a + s.count, 0);

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-700 flex items-center gap-2">
            <Database size={22} className="text-navy-600" />
            Seed Mock Data
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Populate the backend with {totalRecords} records from the frontend mock data.
            Only empty models will be seeded by default.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={checkAll}
            disabled={!allChecked}
            className="flex items-center gap-2 border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-40"
          >
            <RefreshCcw size={14} />
            Refresh
          </button>
          <button
            onClick={handleSeedAll}
            disabled={seedingAll || emptyCount === 0 || !allChecked}
            className="flex items-center gap-2 bg-navy-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-navy-600 disabled:opacity-40 transition-colors"
          >
            {seedingAll ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
            Seed {emptyCount > 0 ? `${emptyCount} Empty` : "All"} Models
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 mb-6 text-sm text-blue-700 flex items-start gap-2">
        <AlertTriangle size={15} className="shrink-0 mt-0.5" />
        <span>Models with existing records are skipped automatically. Use individual <strong>Seed</strong> buttons to re-seed a specific model (this will add duplicate records).</span>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {SECTIONS.map((section) => {
          const state = states[section.key];
          const isExpanded = expanded[section.key];

          return (
            <div key={section.key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 flex items-center gap-4">
                {/* Status icon */}
                <div className="shrink-0">
                  {state.status === "checking" && <Loader2 size={18} className="animate-spin text-gray-400" />}
                  {state.status === "idle"     && <div className="w-4 h-4 rounded-full border-2 border-gray-300" />}
                  {state.status === "seeding"  && <Loader2 size={18} className="animate-spin text-navy-600" />}
                  {state.status === "done"     && <CheckCircle2 size={18} className="text-green-500" />}
                  {state.status === "exists"   && <CheckCircle2 size={18} className="text-blue-400" />}
                  {state.status === "error"    && <AlertTriangle size={18} className="text-red-500" />}
                </div>

                {/* Label */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-navy-700">{section.label}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {section.count} records
                    </span>
                    {state.status === "exists" && (
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {state.existingCount} already in DB
                      </span>
                    )}
                    {state.status === "done" && (
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        ✓ {state.seededCount} seeded
                      </span>
                    )}
                    {state.status === "error" && (
                      <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full truncate max-w-xs">
                        {state.error}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setExpanded((p) => ({ ...p, [section.key]: !p[section.key] }))}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"
                  >
                    {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                  <button
                    onClick={() => handleSeed(section.key)}
                    disabled={state.status === "seeding" || state.status === "checking"}
                    className={`text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40 ${
                      state.status === "exists"
                        ? "border border-gray-200 text-gray-500 hover:bg-gray-50"
                        : state.status === "done"
                        ? "border border-green-200 text-green-600 hover:bg-green-50"
                        : "bg-navy-700 text-white hover:bg-navy-600"
                    }`}
                  >
                    {state.status === "seeding" ? (
                      <span className="flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> Seeding…</span>
                    ) : state.status === "exists" ? "Re-seed" : state.status === "done" ? "Re-seed" : "Seed"}
                  </button>
                </div>
              </div>

              {/* Preview list */}
              {isExpanded && (
                <div className="border-t border-gray-100 px-5 py-3 bg-gray-50">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Records to seed</p>
                  <ul className="space-y-1">
                    {section.preview.map((line, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                        <span className="w-4 h-4 bg-gray-200 text-gray-500 rounded text-[10px] flex items-center justify-center shrink-0 font-mono">{i + 1}</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary footer */}
      <div className="mt-6 text-xs text-gray-400 text-center">
        After seeding, the frontend pages will automatically pull live data from the backend and stop using the static fallbacks.
      </div>
    </div>
  );
}
