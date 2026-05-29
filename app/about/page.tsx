import { Eye, Target, Cross, BookOpen, Heart, Users, Globe, Music } from "lucide-react";

export const metadata = {
  title: "About | RSKMC",
  description: "Learn about the history, vision, mission, and leadership of Rev Sione Kami Memorial Church.",
};

const coreValues = [
  { Icon: Cross, title: "Christ-Centered", desc: "Jesus is at the centre of everything we do" },
  { Icon: BookOpen, title: "Scripture", desc: "The Bible is our final authority for faith and practice" },
  { Icon: Heart, title: "Prayer", desc: "We are a house of prayer, fully dependent on God" },
  { Icon: Users, title: "Fellowship", desc: "We grow together in authentic community" },
  { Icon: Globe, title: "Service", desc: "We serve others as an expression of our faith" },
  { Icon: Music, title: "Worship", desc: "Worship is our first priority and highest calling" },
];

const leadership = [
  { name: "Pastor John Kami", role: "Senior Pastor", initials: "JK" },
  { name: "Elder Samuel Vatu", role: "Board Elder", initials: "SV" },
  { name: "Deaconess Mary Tora", role: "Women's Ministry", initials: "MT" },
  { name: "Deacon Peter Rosi", role: "Outreach Ministry", initials: "PR" },
  { name: "Sis. Grace Kami", role: "Youth Ministry", initials: "GK" },
  { name: "Bro. David Lewa", role: "Worship Ministry", initials: "DL" },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-700 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About RSKMC</h1>
        <p className="text-blue-200 text-xl max-w-2xl mx-auto">
          A church built on faith, community, and the enduring legacy of Rev Sione Kami.
        </p>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-navy-700 mb-6">Our Story</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-4">
          Rev Sione Kami Memorial Church was established as a living tribute to the faith, perseverance,
          and gospel ministry of the late Rev Sione Kami. His life exemplified unwavering devotion to
          Christ and passionate service to the community.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed mb-4">
          The church was founded to carry on his legacy — a place where hearts are transformed, families
          are strengthened, and the good news of Jesus Christ is proclaimed with boldness and love.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          Today, RSKMC stands as a growing congregation committed to authentic worship, biblical teaching,
          and meaningful service to our community and beyond.
        </p>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-gold-500 text-navy-800 rounded-lg flex items-center justify-center mb-4">
              <Eye size={22} />
            </div>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be a beacon of hope and transformation — a church that reflects the love of Christ
              in every home, community, and nation we touch.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-gold-500 text-navy-800 rounded-lg flex items-center justify-center mb-4">
              <Target size={22} />
            </div>
            <h2 className="text-2xl font-bold text-navy-700 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To make disciples of Jesus Christ through authentic worship, biblical teaching, loving
              fellowship, and compassionate outreach — honouring the legacy of Rev Sione Kami.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-navy-700 text-center mb-12">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map(({ Icon, title, desc }, i) => (
            <div key={i} className="flex gap-4 items-start p-5 rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 bg-navy-700 text-gold-400 rounded-lg flex items-center justify-center shrink-0">
                <Icon size={18} />
              </div>
              <div>
                <h3 className="font-bold text-navy-700 mb-1">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scripture */}
      <section className="bg-gold-500 py-14 px-4 text-center">
        <blockquote className="max-w-3xl mx-auto">
          <p className="text-navy-800 text-xl font-bold italic mb-3">
            &ldquo;For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you,
            plans to give you hope and a future.&rdquo;
          </p>
          <cite className="text-navy-700 font-semibold not-italic">— Jeremiah 29:11</cite>
        </blockquote>
      </section>

      {/* Leadership */}
      <section className="bg-navy-700 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
            {leadership.map((person, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gold-500 text-navy-800 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  {person.initials}
                </div>
                <h3 className="font-bold text-white text-sm">{person.name}</h3>
                <p className="text-blue-300 text-xs mt-1">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
