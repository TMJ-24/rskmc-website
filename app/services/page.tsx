import { Baby, Users, Users2, Globe, Music, BookOpen, Heart, Handshake } from "lucide-react";

export const metadata = {
  title: "Services | RSKMC",
  description: "Weekly service schedule and ministries at Rev Sione Kami Memorial Church.",
};

const schedule = [
  {
    day: "Sunday",
    abbr: "SUN",
    services: [
      {
        time: "9:00 AM",
        name: "Morning Worship Service",
        duration: "~90 min",
        desc: "Our main Sunday service with praise and worship, prayer, and the preaching of God's Word. Children's church runs concurrently.",
      },
      {
        time: "6:00 PM",
        name: "Evening Service",
        duration: "~60 min",
        desc: "A reflective evening gathering with song, prayer, and a short devotional.",
      },
    ],
  },
  {
    day: "Wednesday",
    abbr: "WED",
    services: [
      {
        time: "7:00 PM",
        name: "Midweek Bible Study",
        duration: "~75 min",
        desc: "In-depth study of the Scriptures for spiritual growth and understanding of God's Word.",
      },
    ],
  },
  {
    day: "Friday",
    abbr: "FRI",
    services: [
      {
        time: "7:00 PM",
        name: "Prayer and Worship Night",
        duration: "~60 min",
        desc: "A dedicated time of corporate prayer, intercession, and worship for the church and community.",
      },
    ],
  },
];

const ministries = [
  { Icon: Baby, name: "Children's Ministry", desc: "Faith-filled classes for children every Sunday during the morning service. Ages 3-12." },
  { Icon: Users, name: "Youth Ministry", desc: "Discipleship and fellowship for teens and young adults. Meets Saturdays at 4:00 PM." },
  { Icon: Users2, name: "Women's Ministry", desc: "Empowering women through Bible study, prayer, and sisterhood. Monthly gatherings." },
  { Icon: Users, name: "Men's Ministry", desc: "Building Godly men through fellowship, accountability, and service. Monthly breakfast." },
  { Icon: Globe, name: "Outreach Ministry", desc: "Serving the local community with food, care, and the Gospel every month." },
  { Icon: Music, name: "Worship Team", desc: "Skilled musicians and singers leading the congregation in Spirit-filled worship every service." },
];

const expectSteps = [
  { Icon: Music, title: "Worship", desc: "Spirit-led praise to open hearts" },
  { Icon: Heart, title: "Prayer", desc: "Corporate prayer and thanksgiving" },
  { Icon: BookOpen, title: "The Word", desc: "Sound, practical biblical preaching" },
  { Icon: Handshake, title: "Fellowship", desc: "Connection with your church family" },
];

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-700 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Services</h1>
        <p className="text-blue-200 text-xl max-w-2xl mx-auto">
          Join us as we gather to worship, learn, and grow together in Christ.
        </p>
      </section>

      {/* Schedule */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-navy-700 mb-12 text-center">Weekly Schedule</h2>
        <div className="space-y-10">
          {schedule.map((day, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gold-500 text-navy-800 font-bold rounded-lg flex items-center justify-center text-xs uppercase tracking-wide">
                  {day.abbr}
                </div>
                <h3 className="text-xl font-bold text-navy-700">{day.day}</h3>
              </div>
              <div className="grid gap-4 pl-16">
                {day.services.map((svc, j) => (
                  <div key={j} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex items-start justify-between flex-wrap gap-3">
                      <div>
                        <h4 className="font-bold text-navy-700 text-lg">{svc.name}</h4>
                        <p className="text-gray-600 text-sm mt-1 max-w-lg">{svc.desc}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-gold-600 font-bold text-lg">{svc.time}</p>
                        <p className="text-gray-400 text-xs">{svc.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What to Expect */}
      <section className="bg-navy-700 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What to Expect</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {expectSteps.map(({ Icon, title, desc }, i) => (
              <div key={i} className="bg-navy-600 rounded-xl p-6">
                <div className="w-12 h-12 bg-navy-700 text-gold-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-white mb-1">{title}</h3>
                <p className="text-blue-200 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-navy-700 text-center mb-12">Our Ministries</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map(({ Icon, name, desc }, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-navy-700 text-gold-400 rounded-lg flex items-center justify-center mb-4">
                <Icon size={18} />
              </div>
              <h3 className="font-bold text-navy-700 text-lg mb-2">{name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gold-500 py-14 px-4 text-center">
        <h2 className="text-2xl font-bold text-navy-800 mb-2">New Here? We&apos;d Love to Meet You.</h2>
        <p className="text-navy-700 mb-6">Come visit us any Sunday or reach out with questions.</p>
        <a
          href="/give"
          className="bg-navy-700 text-white font-bold px-8 py-3 rounded-full hover:bg-navy-800 transition-colors"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
