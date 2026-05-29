import Link from "next/link";
import { Music, BookOpen, Users, Globe, ChevronRight, Mic, Calendar } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";

const serviceSchedule = [
  { day: "Sunday", time: "9:00 AM", name: "Morning Service" },
  { day: "Sunday", time: "6:00 PM", name: "Evening Service" },
  { day: "Wednesday", time: "7:00 PM", name: "Bible Study" },
  { day: "Friday", time: "7:00 PM", name: "Prayer Meeting" },
];

const highlights = [
  { Icon: Music, title: "Worship", desc: "Spirit-filled worship services every Sunday" },
  { Icon: BookOpen, title: "The Word", desc: "Sound biblical teaching rooted in Scripture" },
  { Icon: Users, title: "Community", desc: "A loving family where everyone belongs" },
  { Icon: Globe, title: "Outreach", desc: "Serving our community with the love of Christ" },
];

const latestSermons = [
  { title: "Walking in Faith", speaker: "Pastor John Kami", date: "May 25, 2026", scripture: "Hebrews 11:1" },
  { title: "The Power of Prayer", speaker: "Elder Mary Tora", date: "May 18, 2026", scripture: "James 5:16" },
  { title: "Love One Another", speaker: "Pastor John Kami", date: "May 11, 2026", scripture: "John 13:34-35" },
];

const upcomingEvents = [
  { day: "8", month: "Jun", title: "Youth Camp 2026", desc: "Annual youth retreat for ages 13-25", time: "All Day" },
  { day: "15", month: "Jun", title: "Community Outreach", desc: "Serving meals at the community center", time: "10:00 AM" },
  { day: "22", month: "Jun", title: "Church Anniversary", desc: "Celebrating our church's founding", time: "9:00 AM" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <HeroSlider />

      {/* Service Times Banner */}
      <section className="bg-gold-500 text-navy-800 py-3 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold">
          {serviceSchedule.map((s, i) => (
            <span key={i}>
              <span className="font-bold">{s.day}</span> · {s.name}: {s.time}
            </span>
          ))}
        </div>
      </section>

      {/* Welcome */}
      <section className="py-20 px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-navy-700 mb-6">
          Welcome to Our Family
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-4">
          Rev Sione Kami Memorial Church (RSKMC) is a vibrant, Christ-centered congregation dedicated
          to worship, discipleship, and community service. We honour the legacy of Rev Sione Kami
          through our unwavering commitment to God&apos;s Word and love for all people.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          Whether you are new to faith, returning after some time away, or deeply rooted in your walk
          with Christ — you are welcome here. Come as you are.
        </p>
      </section>

      {/* Highlights */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-700 text-center mb-12">
            What We&apos;re About
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map(({ Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-navy-700 text-gold-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="text-navy-700 font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Sermons */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-navy-700">Latest Sermons</h2>
          <Link href="/sermons" className="text-gold-600 font-semibold hover:underline text-sm flex items-center gap-1">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestSermons.map((sermon, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="bg-navy-700 h-2" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-navy-700 text-gold-400 rounded-lg flex items-center justify-center">
                    <Mic size={14} />
                  </div>
                  <p className="text-gold-600 text-xs font-semibold uppercase tracking-wide">
                    {sermon.date}
                  </p>
                </div>
                <h3 className="text-navy-700 font-bold text-lg mb-1">{sermon.title}</h3>
                <p className="text-gray-500 text-sm mb-1">{sermon.speaker}</p>
                <p className="text-gray-400 text-xs italic">{sermon.scripture}</p>
                <Link
                  href="/sermons"
                  className="mt-4 inline-flex items-center gap-1 text-gold-600 text-sm font-semibold hover:underline"
                >
                  Listen <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-navy-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <Link href="/events" className="text-gold-400 hover:underline text-sm font-semibold flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="flex gap-4 bg-navy-600 rounded-xl p-5">
                <div className="bg-gold-500 text-navy-800 font-bold rounded-lg w-14 h-14 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xl font-bold leading-none">{event.day}</span>
                  <span className="text-xs uppercase">{event.month}</span>
                </div>
                <div>
                  <h3 className="font-bold mb-1">{event.title}</h3>
                  <p className="text-blue-200 text-sm">{event.desc}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar size={12} className="text-gold-400" />
                    <p className="text-gold-400 text-xs">{event.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Give CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-700 mb-4">Support Our Ministry</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Your generous giving enables us to serve our congregation and community.
            Every contribution makes a difference.
          </p>
          <Link
            href="/give"
            className="bg-gold-500 text-navy-800 font-bold px-10 py-4 rounded-full text-lg hover:bg-gold-400 transition-colors"
          >
            Give Now
          </Link>
        </div>
      </section>
    </div>
  );
}
