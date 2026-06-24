"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard, Mic, CalendarDays, MessageSquare, ImageIcon,
  Church, Users, UserRound, Clock, Globe, Menu, X,
  Pencil, Database, Quote, Building2, Newspaper,
  Star, BookOpen, Settings, Coins, Download,
} from "lucide-react";

const links = [
  { href: "/admin",              label: "Dashboard",         Icon: LayoutDashboard, exact: true },
  { href: "/admin/slides",       label: "Hero Slides",       Icon: ImageIcon       },
  { href: "/admin/sermons",      label: "Sermons",           Icon: Mic             },
  { href: "/admin/events",       label: "Events",            Icon: CalendarDays    },
  { href: "/admin/news",         label: "News Posts",        Icon: Newspaper       },
  { href: "/admin/testimonials", label: "Testimonials",      Icon: Quote           },
  { href: "/admin/leaders",      label: "Leadership",        Icon: UserRound       },
  { href: "/admin/ministries",   label: "Ministries",        Icon: Users           },
  { href: "/admin/services",     label: "Service Times",     Icon: Clock           },
  { href: "/admin/highlights",   label: "Home Highlights",   Icon: Star            },
  { href: "/admin/core-values",  label: "Core Values",       Icon: BookOpen        },
  { href: "/admin/projects",     label: "Projects",          Icon: Building2       },
  { href: "/admin/giving",       label: "Giving Categories", Icon: Coins           },
  { href: "/admin/site-settings",label: "Site Settings",     Icon: Settings        },
  { href: "/admin/contact",      label: "Contact Messages",  Icon: MessageSquare   },
  { href: "/admin/export",       label: "Export Data",       Icon: Download        },
  { href: "/admin/seed",         label: "Seed Data",         Icon: Database        },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-gray-100">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-30
          w-64 bg-navy-800 text-white flex flex-col h-full overflow-y-auto shrink-0
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="px-4 py-4 border-b border-navy-700 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center shrink-0">
              <Church size={16} className="text-navy-800" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm leading-tight truncate">RSKMC Admin</p>
              <p className="text-blue-400 text-xs">Content Management</p>
            </div>
          </div>
          <button className="md:hidden text-blue-300 hover:text-white p-1 rounded transition-colors shrink-0" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-2 py-3 space-y-0.5">
          {links.map(({ href, label, Icon, exact }) => {
            const isActive = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive ? "bg-gold-500 text-navy-900 font-semibold" : "text-blue-200 hover:bg-navy-700 hover:text-white"
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-2 py-3 border-t border-navy-700">
          <Link href="/" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-blue-300 hover:bg-navy-700 hover:text-white transition-colors">
            <Globe size={15} />
            View Website
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center gap-3 justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors shrink-0" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <Menu size={20} />
            </button>
            <p className="text-gray-700 text-sm font-semibold truncate">
              {links.find((l) => (l.exact ? pathname === l.href : pathname.startsWith(l.href)))?.label ?? "Admin"}
            </p>
          </div>
          <p className="text-xs text-gray-400 hidden sm:block shrink-0">Rev Sione Kami Memorial Church</p>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
