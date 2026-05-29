"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Mic, Play, Video, Share2 } from "lucide-react";

const client = generateClient<Schema>();
type Sermon = Schema["Sermon"]["type"];

const staticSermons = [
  { id: "1", title: "Walking in Faith", speaker: "Pastor John Kami", date: "May 25, 2026", scripture: "Hebrews 11:1", series: "Faith Series", duration: "42 min", audioUrl: null, videoUrl: null, published: true },
  { id: "2", title: "The Power of Prayer", speaker: "Elder Mary Tora", date: "May 18, 2026", scripture: "James 5:16", series: "Standalone", duration: "38 min", audioUrl: null, videoUrl: null, published: true },
  { id: "3", title: "Love One Another", speaker: "Pastor John Kami", date: "May 11, 2026", scripture: "John 13:34-35", series: "Standalone", duration: "45 min", audioUrl: null, videoUrl: null, published: true },
  { id: "4", title: "The Armor of God", speaker: "Deacon Peter Rosi", date: "May 4, 2026", scripture: "Ephesians 6:10-18", series: "Spiritual Warfare", duration: "50 min", audioUrl: null, videoUrl: null, published: true },
  { id: "5", title: "Renewed by His Grace", speaker: "Pastor John Kami", date: "Apr 27, 2026", scripture: "Romans 12:2", series: "Standalone", duration: "40 min", audioUrl: null, videoUrl: null, published: true },
  { id: "6", title: "Be Still and Know", speaker: "Elder Mary Tora", date: "Apr 20, 2026", scripture: "Psalm 46:10", series: "Standalone", duration: "35 min", audioUrl: null, videoUrl: null, published: true },
];

export default function Sermons() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await client.models.Sermon.list();
        const published = res.data.filter((s) => s.published !== false);
        setSermons(
          published.length > 0
            ? [...published].sort((a, b) => b.date.localeCompare(a.date))
            : (staticSermons as unknown as Sermon[])
        );
      } catch {
        setSermons(staticSermons as unknown as Sermon[]);
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Sermons</h1>
        <p className="text-blue-200 text-xl max-w-2xl mx-auto">
          Listen, be encouraged, and grow deeper in God&apos;s Word.
        </p>
      </section>

      {/* Sermon List */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading sermons...</div>
        ) : (
          <div className="grid gap-5">
            {sermons.map((sermon) => (
              <div
                key={sermon.id}
                className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-navy-700 text-gold-400 rounded-xl flex items-center justify-center shrink-0">
                  <Mic size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs bg-navy-50 text-navy-700 border border-navy-100 px-2 py-0.5 rounded-full font-medium">
                      {sermon.series}
                    </span>
                    <span className="text-xs text-gray-400">{sermon.date}</span>
                    <span className="text-xs text-gray-400">· {sermon.duration}</span>
                  </div>
                  <h3 className="font-bold text-navy-700 text-lg leading-snug">{sermon.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {sermon.speaker} · <span className="italic text-gray-400">{sermon.scripture}</span>
                  </p>
                </div>
                <div className="flex items-center shrink-0">
                  {sermon.audioUrl ? (
                    <a
                      href={sermon.audioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-navy-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-navy-600 transition-colors flex items-center gap-2"
                    >
                      <Play size={14} />
                      Listen
                    </a>
                  ) : (
                    <span className="text-gray-300 text-sm px-5 py-2 border border-gray-100 rounded-lg flex items-center gap-2">
                      <Play size={14} />
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Never Miss CTA */}
      <section className="bg-gray-50 border-t border-gray-200 py-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-navy-700 mb-3">Never Miss a Sermon</h2>
        <p className="text-gray-600 mb-8">
          Subscribe to our channels for weekly sermon uploads and ministry updates.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#"
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Video size={18} />
            YouTube
          </a>
          <a
            href="#"
            className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center gap-2"
          >
            <Share2 size={18} />
            Facebook
          </a>
        </div>
      </section>
    </div>
  );
}
