import { Mic, Play, Video, Share2 } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";

const sermons = [
  { id: "1", title: "Walking in Faith",    speaker: "Pastor John Kami",  date: "May 25, 2026", scripture: "Hebrews 11:1",       series: "Faith Series",      duration: "42 min", audioUrl: null as string | null, videoUrl: null as string | null },
  { id: "2", title: "The Power of Prayer", speaker: "Elder Mary Tora",   date: "May 18, 2026", scripture: "James 5:16",         series: "Standalone",        duration: "38 min", audioUrl: null, videoUrl: null },
  { id: "3", title: "Love One Another",    speaker: "Pastor John Kami",  date: "May 11, 2026", scripture: "John 13:34-35",      series: "Standalone",        duration: "45 min", audioUrl: null, videoUrl: null },
  { id: "4", title: "The Armor of God",    speaker: "Deacon Peter Rosi", date: "May 4, 2026",  scripture: "Ephesians 6:10-18", series: "Spiritual Warfare", duration: "50 min", audioUrl: null, videoUrl: null },
  { id: "5", title: "Renewed by His Grace",speaker: "Pastor John Kami",  date: "Apr 27, 2026", scripture: "Romans 12:2",        series: "Standalone",        duration: "40 min", audioUrl: null, videoUrl: null },
  { id: "6", title: "Be Still and Know",   speaker: "Elder Mary Tora",   date: "Apr 20, 2026", scripture: "Psalm 46:10",        series: "Standalone",        duration: "35 min", audioUrl: null, videoUrl: null },
];

export default function Sermons() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-700 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=75" alt="" fill className="object-cover opacity-20" priority />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Sermons" }]} />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">Sermons</h1>
          <p className="text-blue-200 text-base md:text-xl max-w-2xl">
            Listen, be encouraged, and grow deeper in God&apos;s Word.
          </p>
        </div>
      </section>

      {/* Sermon List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-gold-600 mb-3">Messages</p>
          <h2 className="text-3xl font-bold text-navy-700 mb-10">Recent Sermons</h2>
          <div className="grid gap-4">
            {sermons.map((sermon) => (
              <div
                key={sermon.id}
                className="group bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row gap-4 hover:border-gold-300 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-navy-700 text-gold-400 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-navy-600 transition-colors duration-300">
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
                      className="bg-navy-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-navy-600 active:scale-95 transition-all duration-200 flex items-center gap-2"
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
        </div>
      </section>

      {/* Never Miss CTA */}
      <section className="bg-gray-50 border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-gold-600 mb-3">Stay Connected</p>
          <h2 className="text-2xl font-bold text-navy-700 mb-3">Never Miss a Sermon</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our channels for weekly sermon uploads and ministry updates.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 active:scale-95 transition-all duration-200 flex items-center gap-2"
            >
              <Video size={18} />
              YouTube
            </a>
            <a
              href="#"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 active:scale-95 transition-all duration-200 flex items-center gap-2"
            >
              <Share2 size={18} />
              Facebook
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
