"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Eye, Target, Cross, BookOpen, Heart, Users, Globe, Music } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";

const client = generateClient<Schema>();
type Leader = Schema["Leader"]["type"];

const coreValues = [
  { Icon: Cross, title: "Christ-Centered", desc: "Jesus is at the centre of everything we do" },
  { Icon: BookOpen, title: "Scripture", desc: "The Bible is our final authority for faith and practice" },
  { Icon: Heart, title: "Prayer", desc: "We are a house of prayer, fully dependent on God" },
  { Icon: Users, title: "Fellowship", desc: "We grow together in authentic community" },
  { Icon: Globe, title: "Service", desc: "We serve others as an expression of our faith" },
  { Icon: Music, title: "Worship", desc: "Worship is our first priority and highest calling" },
];

const staticLeaders = [
  { id: "1", name: "Pastor John Kami", role: "Senior Pastor", bio: null, imageUrl: null, order: 1, published: true },
  { id: "2", name: "Elder Samuel Vatu", role: "Board Elder", bio: null, imageUrl: null, order: 2, published: true },
  { id: "3", name: "Deaconess Mary Tora", role: "Women's Ministry", bio: null, imageUrl: null, order: 3, published: true },
  { id: "4", name: "Deacon Peter Rosi", role: "Outreach Ministry", bio: null, imageUrl: null, order: 4, published: true },
  { id: "5", name: "Sis. Grace Kami", role: "Youth Ministry", bio: null, imageUrl: null, order: 5, published: true },
  { id: "6", name: "Bro. David Lewa", role: "Worship Ministry", bio: null, imageUrl: null, order: 6, published: true },
];

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("");
}

export default function About() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await client.models.Leader.list();
        const published = res.data.filter((l) => l.published !== false);
        setLeaders(
          published.length > 0
            ? [...published].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            : (staticLeaders as unknown as Leader[])
        );
      } catch {
        setLeaders(staticLeaders as unknown as Leader[]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-700 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1920&q=75"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "About" }]} />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">About RSKMC</h1>
          <p className="text-blue-200 text-base md:text-xl max-w-2xl">
            A church built on faith, community, and the enduring legacy of Rev Sione Kami.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600 mb-3 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-gold-500" />
            Our Heritage
          </p>
          <h2 className="text-3xl font-bold text-navy-700 mb-6">Our Story</h2>
          <div className="max-w-3xl space-y-4">
            <p className="text-gray-600 text-lg leading-relaxed">
              Rev Sione Kami Memorial Church was established as a living tribute to the faith, perseverance,
              and gospel ministry of the late Rev Sione Kami. His life exemplified unwavering devotion to
              Christ and passionate service to the community.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              The church was founded to carry on his legacy — a place where hearts are transformed, families
              are strengthened, and the good news of Jesus Christ is proclaimed with boldness and love.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Today, RSKMC stands as a growing congregation committed to authentic worship, biblical teaching,
              and meaningful service to our community and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600 mb-3 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-gold-500" />
            Direction
          </p>
          <h2 className="text-3xl font-bold text-navy-700 mb-10">Vision &amp; Mission</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-white rounded-xl p-8 border border-gray-100 hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-12 h-12 bg-gold-500 text-navy-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold-400 transition-colors duration-300">
                <Eye size={22} />
              </div>
              <h3 className="text-2xl font-bold text-navy-700 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be a beacon of hope and transformation — a church that reflects the love of Christ
                in every home, community, and nation we touch.
              </p>
            </div>
            <div className="group bg-white rounded-xl p-8 border border-gray-100 hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-12 h-12 bg-gold-500 text-navy-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold-400 transition-colors duration-300">
                <Target size={22} />
              </div>
              <h3 className="text-2xl font-bold text-navy-700 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To make disciples of Jesus Christ through authentic worship, biblical teaching, loving
                fellowship, and compassionate outreach — honouring the legacy of Rev Sione Kami.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600 mb-3 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-gold-500" />
            What We Believe
          </p>
          <h2 className="text-3xl font-bold text-navy-700 mb-12">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map(({ Icon, title, desc }, i) => (
              <div
                key={i}
                className="group flex gap-4 items-start p-5 rounded-xl border border-gray-200 hover:border-gold-300 hover:-translate-y-0.5 transition-all duration-300 bg-white"
              >
                <div className="w-10 h-10 bg-navy-700 text-gold-400 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-navy-600 transition-colors duration-300">
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-navy-700 mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture */}
      <section className="bg-gold-500 py-14 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <blockquote>
            <p className="text-navy-800 text-xl font-bold italic mb-3">
              &ldquo;For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you,
              plans to give you hope and a future.&rdquo;
            </p>
            <cite className="text-navy-700 font-semibold not-italic">— Jeremiah 29:11</cite>
          </blockquote>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-navy-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-3 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-gold-400" />
            The Team
          </p>
          <h2 className="text-3xl font-bold mb-12">Our Leadership</h2>
          {loading ? (
            <div className="text-center text-blue-300">Loading...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {leaders.map((person) => (
                <div key={person.id} className="text-center group">
                  {person.imageUrl ? (
                    <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden relative ring-2 ring-white/20 group-hover:ring-gold-500/60 transition-all duration-300">
                      <Image src={person.imageUrl} alt={person.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gold-500 text-navy-800 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3 ring-2 ring-white/20 group-hover:ring-gold-400/70 transition-all duration-300">
                      {initials(person.name)}
                    </div>
                  )}
                  <h3 className="font-bold text-white text-sm">{person.name}</h3>
                  <p className="text-blue-300 text-xs mt-1">{person.role}</p>
                  {person.bio && <p className="text-blue-400 text-xs mt-1 line-clamp-2">{person.bio}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
