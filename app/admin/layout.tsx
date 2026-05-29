"use client";

import { Authenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mic,
  CalendarDays,
  MessageSquare,
  ImageIcon,
  LogOut,
  Church,
  Users,
  UserRound,
  Clock,
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { href: "/admin/sermons", label: "Sermons", Icon: Mic },
  { href: "/admin/events", label: "Events", Icon: CalendarDays },
  { href: "/admin/contact", label: "Contact Messages", Icon: MessageSquare },
  { href: "/admin/slides", label: "Hero Slides", Icon: ImageIcon },
  { href: "/admin/ministries", label: "Ministries", Icon: Users },
  { href: "/admin/leaders", label: "Leadership Team", Icon: UserRound },
  { href: "/admin/services", label: "Service Times", Icon: Clock },
];

const components = {
  Header() {
    return (
      <View textAlign="center" padding="2rem 2rem 0">
        <div className="flex flex-col items-center gap-3 mb-2">
          <div className="w-14 h-14 bg-navy-700 rounded-full flex items-center justify-center">
            <Church size={28} className="text-gold-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-navy-700 leading-tight">RSKMC Admin</h1>
            <p className="text-gray-500 text-xs mt-0.5">Rev Sione Kami Memorial Church</p>
          </div>
        </div>
      </View>
    );
  },
  Footer() {
    return (
      <View textAlign="center" padding="0 2rem 1.5rem">
        <p className="text-xs text-gray-400">
          Authorised administrators only ·{" "}
          <a href="/" className="text-gold-600 hover:underline">Back to website</a>
        </p>
      </View>
    );
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <Authenticator loginMechanisms={["email"]} components={components} hideSignUp={true}>
        {({ signOut, user }) => (
          <div className="flex h-screen overflow-hidden bg-gray-100">
            {/* Sidebar */}
            <aside className="w-60 bg-navy-800 text-white flex flex-col shrink-0 h-full overflow-y-auto">
              <div className="px-4 py-4 border-b border-navy-700 flex items-center gap-3">
                <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center shrink-0">
                  <Church size={16} className="text-navy-800" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">RSKMC Admin</p>
                  <p className="text-blue-400 text-xs">Content Management</p>
                </div>
              </div>

              <nav className="flex-1 px-2 py-3 space-y-0.5">
                {sidebarLinks.map(({ href, label, Icon, exact }) => {
                  const isActive = exact ? pathname === href : pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-gold-500 text-navy-900 font-semibold"
                          : "text-blue-200 hover:bg-navy-700 hover:text-white"
                      }`}
                    >
                      <Icon size={15} />
                      {label}
                    </Link>
                  );
                })}
              </nav>

              <div className="px-2 py-3 border-t border-navy-700 space-y-0.5">
                {user?.signInDetails?.loginId && (
                  <div className="px-3 py-2 rounded-lg bg-navy-700/50 mb-2">
                    <p className="text-xs text-blue-400">Signed in as</p>
                    <p className="text-xs text-white truncate">{user.signInDetails.loginId}</p>
                  </div>
                )}
                <Link href="/" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-blue-300 hover:bg-navy-700 hover:text-white transition-colors">
                  View Website
                </Link>
                <button onClick={signOut} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-red-300 hover:bg-red-900/30 hover:text-red-200 transition-colors w-full">
                  <LogOut size={15} />
                  Sign Out
                </button>
              </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
                <p className="text-gray-600 text-sm font-medium">
                  {sidebarLinks.find((l) => (l.exact ? pathname === l.href : pathname.startsWith(l.href)))?.label ?? "Admin"}
                </p>
                <p className="text-xs text-gray-400 hidden sm:block">Rev Sione Kami Memorial Church</p>
              </header>
              <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
          </div>
        )}
      </Authenticator>
    </div>
  );
}
