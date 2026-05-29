"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mic,
  CalendarDays,
  MessageSquare,
  Image as ImageIcon,
  LogOut,
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { href: "/admin/sermons", label: "Sermons", Icon: Mic },
  { href: "/admin/events", label: "Events", Icon: CalendarDays },
  { href: "/admin/contact", label: "Contact Messages", Icon: MessageSquare },
  { href: "/admin/slides", label: "Hero Slides", Icon: ImageIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Authenticator
      loginMechanisms={["email"]}
      components={{
        Header() {
          return (
            <div className="text-center py-6">
              <h1 className="text-2xl font-bold text-navy-700">RSKMC Admin</h1>
              <p className="text-gray-500 text-sm mt-1">Rev Sione Kami Memorial Church</p>
            </div>
          );
        },
      }}
    >
      {({ signOut }) => (
        <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar */}
          <aside className="w-64 bg-navy-800 text-white flex flex-col shrink-0">
            <div className="px-6 py-5 border-b border-navy-700">
              <p className="text-gold-500 font-bold text-base">RSKMC Admin</p>
              <p className="text-blue-300 text-xs mt-0.5">Content Management</p>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
              {sidebarLinks.map(({ href, label, Icon, exact }) => {
                const isActive = exact ? pathname === href : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gold-500 text-navy-800"
                        : "text-blue-200 hover:bg-navy-700 hover:text-white"
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="px-3 py-4 border-t border-navy-700">
              <button
                onClick={signOut}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-300 hover:bg-red-900/30 hover:text-red-200 transition-colors w-full"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      )}
    </Authenticator>
  );
}
