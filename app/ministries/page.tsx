"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import {
  Music, BookOpen, Globe, Heart, Mic, Sparkles,
  ShieldCheck, Coins, Handshake, Tv, UserCheck, Flame, Users, LucideIcon,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import Link from "next/link";

const client = generateClient<Schema>();
type Ministry = Schema["Ministry"]["type"];

const ICON_MAP: Record<string, LucideIcon> = {
  Music, BookOpen, Globe, Heart, Mic, Sparkles,
  ShieldCheck, Coins, Handshake, Tv, UserCheck, Flame, Users,
};

const COMMISSION_STYLES: Record<string, { color: string; light: string; border: string; text: string }> = {
  "Worship Commission":      { color: "bg-purple-600", light: "bg-purple-50",  border: "border-purple-200", text: "text-purple-700" },
  "Discipleship Commission": { color: "bg-blue-600",   light: "bg-blue-50",    border: "border-blue-200",   text: "text-blue-700" },
  "Evangelism Commission":   { color: "bg-green-700",  light: "bg-green-50",   border: "border-green-200",  text: "text-green-700" },
  "Ministry Commission":     { color: "bg-amber-600",  light: "bg-amber-50",   border: "border-amber-200",  text: "text-amber-700" },
};

const DEFAULT_STYLE = { color: "bg-navy-700", light: "bg-gray-50", border: "border-gray-200", text: "text-gray-700" };

const staticMinistries: Ministry[] = [
  { id:"1", name:"Praise & Worship",               commission:"Worship Commission",      tagline:"Lifting His Name in Song",         description:"Leading the congregation in heartfelt, Spirit-filled worship every service. Our team of singers and musicians are dedicated to creating an atmosphere of reverence and joy.", fellowship:"Every Sunday · 8:00 AM rehearsal",     icon:"Music",      order:1,  published:true, createdAt:"", updatedAt:"" },
  { id:"2", name:"Media Ministry",                  commission:"Worship Commission",      tagline:"Amplifying the Kingdom",           description:"Handling all audio, visual, and online streaming needs of the church. This ministry ensures that every service is recorded and shared with those who cannot attend in person.",fellowship:"Every Sunday · Setup from 7:30 AM",  icon:"Tv",         order:2,  published:true, createdAt:"", updatedAt:"" },
  { id:"3", name:"Ushering Ministry",               commission:"Worship Commission",      tagline:"Serving with Excellence",          description:"Welcoming every visitor and member with warmth and order. Our ushers ensure a smooth, organised, and welcoming experience for all who enter God's house.",                   fellowship:"Every Sunday · Briefing at 8:30 AM", icon:"UserCheck",  order:3,  published:true, createdAt:"", updatedAt:"" },
  { id:"4", name:"Youth Ministry",                  commission:"Discipleship Commission", tagline:"Raising the Next Generation",      description:"Empowering young people aged 13-35 to discover their identity in Christ, grow in faith, and lead with purpose.",                                                             fellowship:"Fridays · 6:00 PM",                  icon:"Sparkles",   order:4,  published:true, createdAt:"", updatedAt:"" },
  { id:"5", name:"Sunday School",                   commission:"Discipleship Commission", tagline:"Faith Starts Young",               description:"Nurturing children aged 3-12 in the knowledge and love of God through age-appropriate Bible lessons, songs, and activities.",                                              fellowship:"Sundays · During morning service",    icon:"BookOpen",   order:5,  published:true, createdAt:"", updatedAt:"" },
  { id:"6", name:"Prayer Ministry",                 commission:"Discipleship Commission", tagline:"The Engine Room of the Church",    description:"Interceding for the church, the nation, and the world. Our prayer warriors meet regularly to seek God's face.",                                                              fellowship:"Fridays · 7:00 PM",                  icon:"Flame",      order:6,  published:true, createdAt:"", updatedAt:"" },
  { id:"7", name:"Gulf Provincial Fellowship",      commission:"Evangelism Commission",   tagline:"Reaching the Gulf Province",       description:"Connecting and supporting members from the Gulf Province of PNG, fostering community, cultural connection, and evangelism.",                                                 fellowship:"Monthly · Last Saturday",            icon:"Globe",      order:7,  published:true, createdAt:"", updatedAt:"" },
  { id:"8", name:"Milne Bay Provincial Fellowship", commission:"Evangelism Commission",   tagline:"Reaching the Milne Bay Province",  description:"A vibrant fellowship for members from Milne Bay, fostering community, cultural identity, and shared faith.",                                                               fellowship:"Monthly · Second Saturday",          icon:"Globe",      order:8,  published:true, createdAt:"", updatedAt:"" },
  { id:"9", name:"Connecting Point",                commission:"Evangelism Commission",   tagline:"Bridging Lives to Christ",         description:"A welcoming ministry focused on connecting new visitors and seekers to the life of the church.",                                                                           fellowship:"Sundays · After morning service",     icon:"Handshake",  order:9,  published:true, createdAt:"", updatedAt:"" },
  { id:"10",name:"Men's Ministry",                  commission:"Ministry Commission",     tagline:"Men of God, Men of Purpose",       description:"Building men of integrity, faith, and responsibility through fellowship, Bible study, and mutual accountability.",                                                          fellowship:"Monthly Saturday · 7:00 AM Breakfast",icon:"ShieldCheck",order:10, published:true, createdAt:"", updatedAt:"" },
  { id:"11",name:"Women's Ministry",                commission:"Ministry Commission",     tagline:"Women of Strength and Grace",      description:"Encouraging and equipping women to walk fully in their God-given purpose through Bible study, fellowship, and community service.",                                         fellowship:"Monthly Saturday · 9:00 AM",         icon:"Heart",      order:11, published:true, createdAt:"", updatedAt:"" },
  { id:"12",name:"Pulpit Ministry",                 commission:"Ministry Commission",     tagline:"Preaching the Word with Power",    description:"Coordinating and supporting the preaching and teaching ministry of the church every service.",                                                                             fellowship:"Coordination as scheduled",          icon:"Mic",        order:12, published:true, createdAt:"", updatedAt:"" },
  { id:"13",name:"Treasury Ministry",               commission:"Ministry Commission",     tagline:"Faithful Stewardship of Resources",description:"Overseeing the financial stewardship of the church with transparency and integrity.",                                                                                    fellowship:"Weekly after Sunday service",         icon:"Coins",      order:13, published:true, createdAt:"", updatedAt:"" },
  { id:"14",name:"Cleaning Ministry",               commission:"Ministry Commission",     tagline:"Serving Behind the Scenes",        description:"Keeping God's house clean, beautiful, and welcoming for every gathering. This dedicated team serves quietly but faithfully.",                                               fellowship:"Saturdays · 9:00 AM",                icon:"Sparkles",   order:14, published:true, createdAt:"", updatedAt:"" },
];

const COMMISSION_ORDER = [
  "Worship Commission", "Discipleship Commission", "Evangelism Commission", "Ministry Commission",
];

export default function Ministries() {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await client.models.Ministry.list();
        const published = res.data.filter((m) => m.published !== false);
        setMinistries(
          published.length > 0
            ? [...published].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            : staticMinistries
        );
      } catch {
        setMinistries(staticMinistries);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const grouped = COMMISSION_ORDER.reduce<Record<string, Ministry[]>>((acc, c) => {
    const items = ministries.filter((m) => m.commission === c);
    if (items.length > 0) acc[c] = items;
    return acc;
  }, {});

  ministries.forEach((m) => {
    if (!COMMISSION_ORDER.includes(m.commission) && !grouped[m.commission]) {
      grouped[m.commission] = [];
    }
    if (!COMMISSION_ORDER.includes(m.commission)) {
      grouped[m.commission].push(m);
    }
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-700 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=75" alt="" fill className="object-cover opacity-20" priority />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Ministries" }]} />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">Our Ministries</h1>
          <p className="text-blue-200 text-base md:text-xl max-w-2xl">
            Every member of RSKMC is called to serve. Find where you belong.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600 mb-3 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-gold-500" />
            Structure &amp; Purpose
          </p>
          <h2 className="text-2xl font-bold text-navy-700 mb-4">Built to Serve, Organised to Thrive</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            RSKMC organises its ministries under four Commissions — Worship, Discipleship, Evangelism,
            and Ministry — each with a clear mandate to build up the body of Christ and reach the world
            around us. Whether you love music, children, prayer, or serving behind the scenes, there is a
            place for you here.
          </p>
        </div>
      </section>

      {/* Ministry cards */}
      {loading ? (
        <div className="text-center text-gray-400 py-20">Loading ministries...</div>
      ) : (
        <div className="pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {Object.entries(grouped).map(([commission, items]) => {
              const style = COMMISSION_STYLES[commission] ?? DEFAULT_STYLE;
              return (
                <div key={commission}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`${style.color} text-white px-5 py-2 rounded-full text-sm font-bold tracking-wide`}>
                      {commission}
                    </div>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((ministry) => {
                      const Icon = ICON_MAP[ministry.icon] ?? Users;
                      return (
                        <div
                          key={ministry.id}
                          className={`group bg-white rounded-xl border ${style.border} overflow-hidden hover:-translate-y-0.5 transition-all duration-300`}
                        >
                          <div className={`${style.light} px-6 py-5 flex items-center gap-4`}>
                            <div className={`${style.color} text-white w-11 h-11 rounded-xl flex items-center justify-center shrink-0`}>
                              <Icon size={20} />
                            </div>
                            <div>
                              <h3 className="font-bold text-navy-700 text-base leading-tight">{ministry.name}</h3>
                              <p className={`text-xs font-medium ${style.text} mt-0.5`}>{ministry.tagline}</p>
                            </div>
                          </div>
                          <div className="px-6 py-5">
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">{ministry.description}</p>
                            <div className={`${style.light} border ${style.border} rounded-lg px-4 py-2.5`}>
                              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">Fellowship</p>
                              <p className={`text-sm font-semibold ${style.text}`}>{ministry.fellowship}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Join CTA */}
      <section className="bg-navy-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-3 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-gold-400" />
            Take the Next Step
          </p>
          <h2 className="text-2xl font-bold mb-3">Ready to Serve?</h2>
          <p className="text-blue-200 max-w-xl mb-8">
            Join a ministry and discover the joy of serving God alongside your RSKMC family.
          </p>
          <Link
            href="/give"
            className="bg-gold-500 text-navy-800 font-bold px-10 py-3 rounded-lg hover:bg-gold-400 active:scale-95 transition-all duration-200 inline-block"
          >
            Get Connected
          </Link>
        </div>
      </section>
    </div>
  );
}
