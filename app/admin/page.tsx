import { Mic, CalendarDays, MessageSquare, ImageIcon, Users, UserRound, Clock } from "lucide-react";
import Link from "next/link";

const cards = [
  { label: "Sermons",          Icon: Mic,          href: "/admin/sermons",   color: "bg-navy-700"   },
  { label: "Events",           Icon: CalendarDays, href: "/admin/events",    color: "bg-gold-600"   },
  { label: "Contact Messages", Icon: MessageSquare,href: "/admin/contact",   color: "bg-red-600"    },
  { label: "Hero Slides",      Icon: ImageIcon,    href: "/admin/slides",    color: "bg-emerald-600"},
  { label: "Ministries",       Icon: Users,        href: "/admin/ministries",color: "bg-purple-600" },
  { label: "Leaders",          Icon: UserRound,    href: "/admin/leaders",   color: "bg-blue-600"   },
  { label: "Service Times",    Icon: Clock,        href: "/admin/services",  color: "bg-teal-600"   },
];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-navy-700 mb-2">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-6">Overview of your church website content</p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-8 text-sm text-amber-800">
        <p className="font-semibold mb-1">Static site — no backend connected</p>
        <p className="text-amber-700">The site currently serves static content. Connect a backend to enable live content management.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6">
        {cards.map(({ label, Icon, href, color }) => (
          <Link key={label} href={href} className="bg-white rounded-xl p-6 border border-gray-100 flex items-center gap-4 hover:border-gray-200 transition-colors">
            <div className={`${color} text-white w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
              <Icon size={22} />
            </div>
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">{label}</p>
              <p className="text-2xl font-bold text-navy-700">—</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
