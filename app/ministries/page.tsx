import { Music, BookOpen, Globe, Heart, Mic, Sparkles, ShieldCheck, Coins, Handshake, Tv, UserCheck, Flame } from "lucide-react";

export const metadata = {
  title: "Ministries | RSKMC",
  description: "Discover the ministries and commissions of Rev Sione Kami Memorial Church.",
};

const commissions = [
  {
    name: "Worship Commission",
    color: "bg-purple-600",
    lightColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
    ministries: [
      {
        name: "Praise & Worship",
        Icon: Music,
        tagline: "Lifting His Name in Song",
        desc: "Leading the congregation in heartfelt, Spirit-filled worship every service. Our team of singers and musicians are dedicated to creating an atmosphere of reverence and joy.",
        fellowship: "Every Sunday · 8:00 AM rehearsal",
      },
      {
        name: "Media Ministry",
        Icon: Tv,
        tagline: "Amplifying the Kingdom",
        desc: "Handling all audio, visual, and online streaming needs of the church. This ministry ensures that every service is recorded and shared with those who cannot attend in person.",
        fellowship: "Every Sunday · Setup from 7:30 AM",
      },
      {
        name: "Ushering Ministry",
        Icon: UserCheck,
        tagline: "Serving with Excellence",
        desc: "Welcoming every visitor and member with warmth and order. Our ushers ensure a smooth, organised, and welcoming experience for all who enter God's house.",
        fellowship: "Every Sunday · Briefing at 8:30 AM",
      },
    ],
  },
  {
    name: "Discipleship Commission",
    color: "bg-blue-600",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    ministries: [
      {
        name: "Youth Ministry",
        Icon: Sparkles,
        tagline: "Raising the Next Generation",
        desc: "Empowering young people aged 13-35 to discover their identity in Christ, grow in faith, and lead with purpose. Through worship, discipleship, and outreach, the youth of RSKMC are equipped to make a difference.",
        fellowship: "Fridays · 6:00 PM",
      },
      {
        name: "Sunday School",
        Icon: BookOpen,
        tagline: "Faith Starts Young",
        desc: "Nurturing children aged 3-12 in the knowledge and love of God through age-appropriate Bible lessons, songs, and activities. A safe and fun environment for children to grow in faith.",
        fellowship: "Sundays · During morning service",
      },
      {
        name: "Prayer Ministry",
        Icon: Flame,
        tagline: "The Engine Room of the Church",
        desc: "Interceding for the church, the nation, and the world. Our prayer warriors meet regularly to seek God's face, pray for members, and cover the church in intercession.",
        fellowship: "Fridays · 7:00 PM",
      },
    ],
  },
  {
    name: "Evangelism Commission",
    color: "bg-green-700",
    lightColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    ministries: [
      {
        name: "Gulf Provincial Fellowship",
        Icon: Globe,
        tagline: "Reaching the Gulf Province",
        desc: "Connecting and supporting members from the Gulf Province of PNG. This fellowship provides a home away from home, cultural connection, and a platform for evangelism within the Gulf Province community.",
        fellowship: "Monthly · Last Saturday",
      },
      {
        name: "Milne Bay Provincial Fellowship",
        Icon: Globe,
        tagline: "Reaching the Milne Bay Province",
        desc: "A vibrant fellowship for members from Milne Bay, fostering community, cultural identity, and shared faith. Together they support one another and reach out to the Milne Bay community in Port Moresby.",
        fellowship: "Monthly · Second Saturday",
      },
      {
        name: "Connecting Point",
        Icon: Handshake,
        tagline: "Bridging Lives to Christ",
        desc: "A welcoming ministry focused on connecting new visitors and seekers to the life of the church. From first contact to full membership, Connecting Point walks alongside people as they find their place in the RSKMC family.",
        fellowship: "Sundays · After morning service",
      },
    ],
  },
  {
    name: "Ministry Commission",
    color: "bg-amber-600",
    lightColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    ministries: [
      {
        name: "Men's Ministry",
        Icon: ShieldCheck,
        tagline: "Men of God, Men of Purpose",
        desc: "Building men of integrity, faith, and responsibility. The men's ministry meets for fellowship, Bible study, and mutual accountability, equipping men to lead their families and serve their community.",
        fellowship: "Monthly Saturday · 7:00 AM Breakfast",
      },
      {
        name: "Women's Ministry",
        Icon: Heart,
        tagline: "Women of Strength and Grace",
        desc: "Encouraging and equipping women to walk fully in their God-given purpose. Through Bible study, fellowship, and community service, the women of RSKMC support one another and impact their communities.",
        fellowship: "Monthly Saturday · 9:00 AM",
      },
      {
        name: "Pulpit Ministry",
        Icon: Mic,
        tagline: "Preaching the Word with Power",
        desc: "Coordinating and supporting the preaching and teaching ministry of the church. This ministry ensures that the Word of God is proclaimed clearly, faithfully, and with anointing every service.",
        fellowship: "Coordination as scheduled",
      },
      {
        name: "Treasury Ministry",
        Icon: Coins,
        tagline: "Faithful Stewardship of Resources",
        desc: "Overseeing the financial stewardship of the church with transparency and integrity. The treasury team manages tithes, offerings, and funds to ensure the church operates with excellence and accountability.",
        fellowship: "Weekly after Sunday service",
      },
      {
        name: "Cleaning Ministry",
        Icon: Sparkles,
        tagline: "Serving Behind the Scenes",
        desc: "Keeping God's house clean, beautiful, and welcoming for every gathering. This dedicated team serves quietly but faithfully, ensuring every corner of RSKMC reflects excellence and honour to God.",
        fellowship: "Saturdays · 9:00 AM",
      },
    ],
  },
];

export default function Ministries() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-700 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Ministries</h1>
        <p className="text-blue-200 text-xl max-w-2xl mx-auto">
          Every member of RSKMC is called to serve. Find where you belong.
        </p>
      </section>

      {/* Intro */}
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-navy-700 mb-4">Built to Serve, Organised to Thrive</h2>
        <p className="text-gray-600 leading-relaxed">
          RSKMC organises its ministries under four Commissions — Worship, Discipleship, Evangelism,
          and Ministry — each with a clear mandate to build up the body of Christ and reach the world
          around us. Whether you love music, children, prayer, or serving behind the scenes, there is a
          place for you here.
        </p>
      </section>

      {/* Commissions */}
      <div className="pb-24 px-4 max-w-6xl mx-auto space-y-16">
        {commissions.map((commission) => (
          <div key={commission.name}>
            {/* Commission header */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`${commission.color} text-white px-5 py-2 rounded-full text-sm font-bold tracking-wide`}>
                {commission.name}
              </div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Ministry cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {commission.ministries.map((ministry) => (
                <div
                  key={ministry.name}
                  className={`bg-white rounded-xl border ${commission.borderColor} overflow-hidden hover:shadow-md transition-shadow`}
                >
                  <div className={`${commission.lightColor} px-6 py-5 flex items-center gap-4`}>
                    <div className={`${commission.color} text-white w-11 h-11 rounded-xl flex items-center justify-center shrink-0`}>
                      <ministry.Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-700 text-base leading-tight">{ministry.name}</h3>
                      <p className={`text-xs font-medium ${commission.textColor} mt-0.5`}>{ministry.tagline}</p>
                    </div>
                  </div>
                  <div className="px-6 py-5">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{ministry.desc}</p>
                    <div className={`${commission.lightColor} border ${commission.borderColor} rounded-lg px-4 py-2.5`}>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">Fellowship</p>
                      <p className={`text-sm font-semibold ${commission.textColor}`}>{ministry.fellowship}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Join CTA */}
      <section className="bg-navy-700 text-white py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Serve?</h2>
        <p className="text-blue-200 max-w-xl mx-auto mb-8">
          Join a ministry and discover the joy of serving God alongside your RSKMC family.
          Contact us to learn more or to get connected.
        </p>
        <a
          href="/give"
          className="bg-gold-500 text-navy-800 font-bold px-10 py-3 rounded-full hover:bg-gold-400 transition-colors"
        >
          Get Connected
        </a>
      </section>
    </div>
  );
}
