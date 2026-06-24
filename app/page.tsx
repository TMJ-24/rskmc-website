import Link from "next/link";
import { Music, BookOpen, Users, Globe, ChevronRight, Mic, Calendar, Cross, Heart, Flame, Star, Handshake, LucideIcon } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";

const ICON_MAP: Record<string, LucideIcon> = {
  Music, BookOpen, Users, Globe, Cross, Heart, Flame, Star, Handshake,
};

const highlights = [
  { id: "h1", title: "Worship",   desc: "Spirit-filled worship services every Sunday",       icon: "Music"    },
  { id: "h2", title: "The Word",  desc: "Sound biblical teaching rooted in Scripture",       icon: "BookOpen" },
  { id: "h3", title: "Community", desc: "A loving family where everyone belongs",            icon: "Users"    },
  { id: "h4", title: "Outreach",  desc: "Serving our community with the love of Christ",    icon: "Globe"    },
];

const schedule = [
  { id: "ss1", day: "Sunday",    time: "9:00 AM", name: "Morning Service"  },
  { id: "ss2", day: "Sunday",    time: "6:00 PM", name: "Evening Service"  },
  { id: "ss3", day: "Wednesday", time: "7:00 PM", name: "Bible Study"      },
  { id: "ss4", day: "Friday",    time: "7:00 PM", name: "Prayer Meeting"   },
];

const sermons = [
  { id: "f1", title: "Walking in Faith",    speaker: "Pastor John Kami", date: "May 25, 2026", scripture: "Hebrews 11:1"  },
  { id: "f2", title: "The Power of Prayer", speaker: "Elder Mary Tora",  date: "May 18, 2026", scripture: "James 5:16"    },
  { id: "f3", title: "Love One Another",    speaker: "Pastor John Kami", date: "May 11, 2026", scripture: "John 13:34–35" },
];

const events = [
  { id: "e1", day: "8",  month: "Jun", title: "Youth Camp 2026",    description: "Annual youth retreat for ages 13–25",   time: "All Day"  },
  { id: "e2", day: "15", month: "Jun", title: "Community Outreach", description: "Serving meals at the community centre", time: "10:00 AM" },
  { id: "e3", day: "22", month: "Jun", title: "Church Anniversary", description: "Celebrating our church's founding",      time: "9:00 AM"  },
];

export default function Home() {
  return (
    <div>
      <HeroSlider />

      {/* Service Times Banner */}
      <section className="bg-navy-800 border-b border-navy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-center gap-y-1">
          {schedule.map((s, i) => (
            <span key={s.id} className="flex items-center">
              {i > 0 && <span className="text-navy-500 mx-4 hidden sm:inline select-none">·</span>}
              <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">{s.day}</span>
              <span className="text-navy-500 mx-2 text-xs">·</span>
              <span className="text-blue-200 text-xs">{s.name}</span>
              <span className="text-navy-500 mx-2 text-xs">·</span>
              <span className="text-white text-xs font-semibold">{s.time}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Welcome */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="eyebrow text-gold-600 mb-4">Our Church</p>
            <h2 className="h-section text-navy-700 mb-6">Welcome to Our Family</h2>
            <p className="body-lg text-gray-600 mb-4">
              Rev Sione Kami Memorial Church (RSKMC) is a vibrant, Christ-centred congregation dedicated
              to worship, discipleship, and community service. We honour the legacy of Rev Sione Kami
              through our unwavering commitment to God&apos;s Word and love for all people.
            </p>
            <p className="body-lg text-gray-500">
              Whether you are new to faith, returning after some time away, or deeply rooted in your walk
              with Christ — you are welcome here. Come as you are.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-gray-50 py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-gold-600 mb-4">Our Pillars</p>
          <h2 className="h-section text-navy-700 mb-12">What We&apos;re About</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h) => {
              const Icon = ICON_MAP[h.icon] ?? Music;
              return (
                <div
                  key={h.id}
                  className="group bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-11 h-11 bg-navy-700 text-gold-400 rounded-xl flex items-center justify-center mb-5 group-hover:bg-navy-600 transition-colors duration-300">
                    <Icon size={20} />
                  </div>
                  <h3 className="h-card text-navy-700 mb-2">{h.title}</h3>
                  <p className="body text-gray-500">{h.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Sermons */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="eyebrow text-gold-600 mb-4">Recent Messages</p>
              <h2 className="h-section text-navy-700">Latest Sermons</h2>
            </div>
            <Link href="/sermons" className="text-gold-600 hover:text-gold-700 text-sm font-semibold flex items-center gap-1 shrink-0 transition-colors">
              View All <ChevronRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sermons.map((sermon) => (
              <div
                key={sermon.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-navy-700 h-1 group-hover:bg-gold-500 transition-colors duration-300" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-navy-50 text-navy-600 rounded-lg flex items-center justify-center shrink-0">
                      <Mic size={14} />
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">{sermon.date}</p>
                  </div>
                  <h3 className="h-card text-navy-700 mb-1">{sermon.title}</h3>
                  <p className="text-gray-500 text-sm mb-0.5">{sermon.speaker}</p>
                  <p className="text-gray-400 text-xs italic mb-4">{sermon.scripture}</p>
                  <Link href="/sermons" className="inline-flex items-center gap-1 text-gold-600 text-sm font-semibold hover:text-gold-700 transition-colors">
                    Listen <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-navy-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="eyebrow text-gold-400 mb-4">What&apos;s On</p>
              <h2 className="h-section text-white">Upcoming Events</h2>
            </div>
            <Link href="/events" className="text-gold-400 hover:text-gold-300 text-sm font-semibold flex items-center gap-1 shrink-0 transition-colors">
              View All <ChevronRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {events.map((event) => (
              <div key={event.id} className="flex gap-4 bg-white/5 rounded-2xl p-5 border border-white/[0.08] hover:bg-white/10 hover:border-white/15 transition-all duration-200">
                <div className="bg-gold-500 text-navy-800 rounded-xl w-14 h-14 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xl font-bold leading-none">{event.day}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide">{event.month}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-white mb-1 truncate">{event.title}</h3>
                  <p className="text-blue-300 text-sm leading-snug mb-2">{event.description}</p>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={11} className="text-gold-400 shrink-0" />
                    <span className="text-gold-400 text-xs font-medium">{event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Give CTA */}
      <section className="py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-gold-600 mb-4">Generosity</p>
          <h2 className="h-section text-navy-700 mb-4">Support Our Ministry</h2>
          <p className="body-lg text-gray-500 mb-8 max-w-xl">
            Your generous giving enables us to serve our congregation and community.
            Every contribution makes a difference.
          </p>
          <Link
            href="/give"
            className="inline-flex items-center gap-2 bg-navy-700 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-navy-600 active:scale-95 transition-all duration-200 text-sm"
          >
            Give Now <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
