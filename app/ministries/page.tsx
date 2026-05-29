import { Baby, Users, Users2, Globe, Music, BookOpen, Heart, ShieldCheck, Calendar, Clock, MapPin, UserRound } from "lucide-react";

export const metadata = {
  title: "Ministries | RSKMC",
  description: "Explore the ministries of Rev Sione Kami Memorial Church and their fellowship times.",
};

const ministries = [
  {
    Icon: Baby,
    name: "Children's Ministry",
    tagline: "Raising a generation rooted in faith",
    description:
      "We are passionate about nurturing children in the knowledge and love of God from an early age. Our dedicated teachers provide age-appropriate Bible lessons, worship, and activities in a safe and caring environment. Children's church runs concurrently with the Sunday morning service so families can worship together.",
    leader: "Sis. Grace Kami",
    leaderTitle: "Children's Ministry Coordinator",
    ageGroup: "Ages 3 – 12",
    sessions: [
      { day: "Sunday", time: "9:00 AM – 10:30 AM", venue: "Children's Hall", note: "During morning service" },
    ],
    color: "bg-purple-50 border-purple-200",
    iconBg: "bg-purple-600",
  },
  {
    Icon: Users,
    name: "Youth Ministry",
    tagline: "Empowering young people to live boldly for Christ",
    description:
      "Our youth ministry is a vibrant community for teenagers and young adults to grow in their faith, build lasting friendships, and discover their God-given purpose. Through Bible study, worship, outreach projects, and social events, we equip young people to be leaders in the church and the world.",
    leader: "Bro. David Lewa",
    leaderTitle: "Youth Pastor",
    ageGroup: "Ages 13 – 30",
    sessions: [
      { day: "Saturday", time: "4:00 PM – 6:00 PM", venue: "Youth Hall", note: "Weekly fellowship" },
      { day: "Sunday", time: "9:00 AM", venue: "Main Sanctuary", note: "Attend main service together" },
    ],
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-600",
  },
  {
    Icon: Users2,
    name: "Women's Ministry",
    tagline: "Building women of faith, strength, and purpose",
    description:
      "The Women's Ministry exists to encourage and equip women in their walk with God and their roles in family, church, and community. We gather for Bible study, prayer, mentorship, and fellowship, creating a sisterhood where every woman is known, loved, and supported.",
    leader: "Deaconess Mary Tora",
    leaderTitle: "Women's Ministry Leader",
    ageGroup: "All women welcome",
    sessions: [
      { day: "First Saturday of each month", time: "9:00 AM – 12:00 PM", venue: "Church Hall", note: "Monthly gathering" },
      { day: "Thursday", time: "6:30 PM – 8:00 PM", venue: "Church Hall", note: "Weekly prayer & devotion" },
    ],
    color: "bg-pink-50 border-pink-200",
    iconBg: "bg-pink-600",
  },
  {
    Icon: ShieldCheck,
    name: "Men's Ministry",
    tagline: "Building men of integrity, faith, and leadership",
    description:
      "Our Men's Ministry challenges and strengthens men to be Godly leaders in their homes, workplaces, and communities. Through accountability groups, Bible study, breakfast meetings, and service projects, we foster brotherhood and spiritual growth in a welcoming, no-judgment environment.",
    leader: "Deacon Peter Rosi",
    leaderTitle: "Men's Ministry Leader",
    ageGroup: "All men welcome",
    sessions: [
      { day: "Second Saturday of each month", time: "7:00 AM – 9:00 AM", venue: "Church Hall", note: "Breakfast & prayer" },
      { day: "Wednesday", time: "7:00 PM", venue: "Main Sanctuary", note: "Attend midweek Bible study" },
    ],
    color: "bg-slate-50 border-slate-200",
    iconBg: "bg-slate-700",
  },
  {
    Icon: Globe,
    name: "Outreach Ministry",
    tagline: "Taking the love of Christ beyond our walls",
    description:
      "The Outreach Ministry is the hands and feet of RSKMC in the surrounding community. We organise food drives, hospital visits, community clean-ups, and evangelism efforts. Every act of service is an opportunity to share the hope of Jesus Christ with those who need it most.",
    leader: "Elder Samuel Vatu",
    leaderTitle: "Outreach Coordinator",
    ageGroup: "Open to all",
    sessions: [
      { day: "Last Saturday of each month", time: "9:00 AM – 2:00 PM", venue: "Various community locations", note: "Monthly outreach day" },
      { day: "Friday", time: "7:00 PM", venue: "Church", note: "Prayer meeting for outreach" },
    ],
    color: "bg-green-50 border-green-200",
    iconBg: "bg-green-700",
  },
  {
    Icon: Music,
    name: "Worship Ministry",
    tagline: "Leading the church into the presence of God",
    description:
      "Our Worship Ministry is a team of musicians, vocalists, and audio-visual technicians committed to facilitating an encounter with God through music and worship. We welcome believers with musical gifting who desire to use their talents in service to the Lord and the congregation.",
    leader: "Bro. David Lewa",
    leaderTitle: "Worship Director",
    ageGroup: "Musically gifted members",
    sessions: [
      { day: "Thursday", time: "6:00 PM – 8:30 PM", venue: "Main Sanctuary", note: "Weekly rehearsal" },
      { day: "Sunday", time: "7:30 AM – 8:45 AM", venue: "Main Sanctuary", note: "Pre-service sound check" },
    ],
    color: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-600",
  },
  {
    Icon: BookOpen,
    name: "Bible Study Ministry",
    tagline: "Rightly dividing the Word of truth",
    description:
      "The Bible Study Ministry provides structured, in-depth teaching of the Scriptures for members who want to go deeper in God's Word. Led by seasoned teachers, sessions cover systematic theology, book studies, and practical application — equipping every believer to understand and live the Bible confidently.",
    leader: "Pastor John Kami",
    leaderTitle: "Senior Pastor",
    ageGroup: "Adults and teens",
    sessions: [
      { day: "Wednesday", time: "7:00 PM – 8:15 PM", venue: "Main Sanctuary", note: "Midweek Bible study" },
      { day: "Sunday", time: "8:00 AM – 8:50 AM", venue: "Church Hall", note: "Pre-service adult class" },
    ],
    color: "bg-indigo-50 border-indigo-200",
    iconBg: "bg-indigo-700",
  },
  {
    Icon: Heart,
    name: "Prayer Ministry",
    tagline: "Interceding for the church, the nation, and the world",
    description:
      "The Prayer Ministry is the backbone of RSKMC. We believe that everything the church accomplishes flows from a foundation of prayer. Our intercessors gather weekly to pray for the congregation, leadership, community, and global missions — standing in the gap with faith and fervency.",
    leader: "Elder Samuel Vatu",
    leaderTitle: "Prayer Ministry Leader",
    ageGroup: "Open to all",
    sessions: [
      { day: "Friday", time: "7:00 PM – 8:30 PM", venue: "Main Sanctuary", note: "Weekly prayer night" },
      { day: "Daily", time: "6:00 AM – 6:30 AM", venue: "Online (join via WhatsApp group)", note: "Morning devotion call" },
    ],
    color: "bg-rose-50 border-rose-200",
    iconBg: "bg-rose-600",
  },
];

export default function Ministries() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-700 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Ministries</h1>
        <p className="text-blue-200 text-xl max-w-2xl mx-auto">
          Every ministry at RSKMC is a place to belong, grow, and serve. Find your community.
        </p>
      </section>

      {/* Intro */}
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-navy-700 mb-4">Get Involved</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          At RSKMC we believe every member is called to serve. Our ministries provide a place for
          people of all ages and backgrounds to use their gifts, build friendships, and make a
          lasting difference in the church and community.
        </p>
      </section>

      {/* Ministry Cards */}
      <section className="pb-20 px-4 max-w-5xl mx-auto">
        <div className="grid gap-8">
          {ministries.map(({ Icon, name, tagline, description, leader, leaderTitle, ageGroup, sessions, color, iconBg }, i) => (
            <div key={i} className={`rounded-2xl border-2 overflow-hidden ${color}`}>
              {/* Card Header */}
              <div className="p-6 pb-4 flex items-start gap-4">
                <div className={`w-12 h-12 ${iconBg} text-white rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-navy-700">{name}</h3>
                  <p className="text-gray-500 text-sm italic mt-0.5">{tagline}</p>
                </div>
                <span className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-full shrink-0">
                  {ageGroup}
                </span>
              </div>

              {/* Description */}
              <div className="px-6 pb-4">
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>

              {/* Fellowship Times */}
              <div className="px-6 pb-4">
                <p className="text-xs font-bold text-navy-700 uppercase tracking-wider mb-3">Fellowship Times</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {sessions.map((session, j) => (
                    <div key={j} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={14} className="text-gold-600 shrink-0" />
                        <span className="font-semibold text-navy-700 text-sm">{session.day}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1 pl-0.5">
                        <Clock size={13} className="text-gray-400 shrink-0" />
                        <span className="text-gray-700 text-sm">{session.time}</span>
                      </div>
                      <div className="flex items-center gap-2 pl-0.5">
                        <MapPin size={13} className="text-gray-400 shrink-0" />
                        <span className="text-gray-500 text-xs">{session.venue}</span>
                      </div>
                      {session.note && (
                        <p className="text-xs text-gray-400 mt-2 border-t border-gray-100 pt-2">{session.note}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Leader */}
              <div className="px-6 py-4 border-t border-white/60 flex items-center gap-3">
                <div className="w-8 h-8 bg-navy-700 text-gold-400 rounded-full flex items-center justify-center shrink-0">
                  <UserRound size={15} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-700">{leader}</p>
                  <p className="text-xs text-gray-500">{leaderTitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-700 text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Not Sure Where to Start?</h2>
          <p className="text-blue-200 mb-8 text-lg">
            Reach out and we will help you find the right ministry fit for your season of life.
          </p>
          <a
            href="/give"
            className="bg-gold-500 text-navy-800 font-bold px-10 py-3 rounded-full hover:bg-gold-400 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
