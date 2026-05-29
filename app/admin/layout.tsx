"use client";

import { useState, useEffect } from "react";
import { Authenticator, View, ThemeProvider, createTheme } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";
import "@aws-amplify/ui-react/styles.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Mic, CalendarDays, MessageSquare, ImageIcon,
  LogOut, Church, Users, UserRound, Clock, Globe, Menu, X,
  ShieldCheck, Pencil, Database,
} from "lucide-react";

const allLinks = [
  { href: "/admin",             label: "Dashboard",       Icon: LayoutDashboard, exact: true, roles: ["admin", "editor"] },
  { href: "/admin/sermons",     label: "Sermons",         Icon: Mic,             roles: ["admin", "editor"] },
  { href: "/admin/events",      label: "Events",          Icon: CalendarDays,    roles: ["admin", "editor"] },
  { href: "/admin/contact",     label: "Contact Messages",Icon: MessageSquare,   roles: ["admin"] },
  { href: "/admin/slides",      label: "Hero Slides",     Icon: ImageIcon,       roles: ["admin", "editor"] },
  { href: "/admin/ministries",  label: "Ministries",      Icon: Users,           roles: ["admin", "editor"] },
  { href: "/admin/leaders",     label: "Leadership Team", Icon: UserRound,       roles: ["admin"] },
  { href: "/admin/services",    label: "Service Times",   Icon: Clock,           roles: ["admin", "editor"] },
  { href: "/admin/seed",        label: "Seed Data",       Icon: Database,        roles: ["admin"] },
];

const rskTheme = createTheme({
  name: "rskmc",
  tokens: {
    colors: {
      brand: {
        primary: {
          10:  { value: "#eef2ff" },
          20:  { value: "#dbeafe" },
          40:  { value: "#93c5fd" },
          60:  { value: "#2d47c0" },
          80:  { value: "#1e3a8a" },
          90:  { value: "#152c72" },
          100: { value: "#0d1e52" },
        },
      },
    },
    components: {
      authenticator: {
        router: {
          boxShadow: { value: "none" },
          borderWidth: { value: "0px" },
          borderRadius: { value: "16px" },
        },
        form: { padding: { value: "1.5rem 2rem 2rem" } },
      },
      button: {
        primary: {
          backgroundColor: { value: "#1e3a8a" },
          color: { value: "#ffffff" },
          borderRadius: { value: "8px" },
          _hover:  { backgroundColor: { value: "#152c72" } },
          _focus:  { backgroundColor: { value: "#152c72" } },
          _active: { backgroundColor: { value: "#0d1e52" } },
        },
        link: {
          color: { value: "#1e3a8a" },
          _hover: { color: { value: "#152c72" }, backgroundColor: { value: "transparent" } },
        },
      },
      fieldcontrol: {
        borderRadius: { value: "8px" },
        _focus: {
          borderColor: { value: "#1e3a8a" },
          boxShadow: { value: "0 0 0 2px rgba(30,58,138,0.15)" },
        },
      },
    },
  },
});

const components = {
  SignIn: {
    Header() {
      return (
        <View textAlign="center" padding="2rem 2rem 0.5rem">
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-blue-100 shadow-md">
              <Image src="/logo.jpg" alt="RSKMC Logo" width={80} height={80} className="object-cover w-full h-full" priority />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1e3a8a] leading-tight">RSKMC Admin</h1>
              <p className="text-gray-400 text-xs mt-0.5">Rev Sione Kami Memorial Church</p>
            </div>
            <div className="w-full border-t border-gray-100 pt-1" />
          </div>
        </View>
      );
    },
    Footer() {
      return (
        <View textAlign="center" padding="0 2rem 2rem">
          <div className="border-t border-gray-100 pt-4 mt-1">
            <p className="text-xs text-gray-400">Authorised administrators only</p>
            <a href="/" className="inline-flex items-center gap-1 text-xs text-[#1e3a8a] hover:text-[#152c72] font-medium mt-1.5 transition-colors">
              <Globe size={11} />
              Back to public website
            </a>
          </div>
        </View>
      );
    },
  },
};

type Role = "admin" | "editor";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState<Role>("admin");

  useEffect(() => {
    async function detectRole() {
      try {
        const session = await fetchAuthSession();
        const groups = (session.tokens?.idToken?.payload["cognito:groups"] as string[]) ?? [];
        if (groups.includes("Editor") && !groups.includes("Admin")) {
          setRole("editor");
        } else {
          setRole("admin");
        }
      } catch {
        setRole("admin");
      }
    }
    detectRole();
  }, []);

  const sidebarLinks = allLinks.filter((l) => l.roles.includes(role));

  const roleConfig = {
    admin:  { label: "Admin",  Icon: ShieldCheck, bg: "bg-[#93c5fd]",    text: "text-[#0d1e52]" },
    editor: { label: "Editor", Icon: Pencil,      bg: "bg-purple-200",   text: "text-purple-900" },
  }[role];

  return (
    <ThemeProvider theme={rskTheme}>
      <div className="min-h-screen flex items-center justify-center bg-navy-800 bg-[radial-gradient(ellipse_at_center,_#2d47c0_0%,_#152c72_40%,_#0d1e52_100%)] py-8">
        <Authenticator loginMechanisms={["email"]} components={components} hideSignUp={true}>
          {({ signOut, user }) => (
            <div className="fixed inset-0 flex overflow-hidden bg-gray-100">

              {/* Mobile backdrop */}
              {sidebarOpen && (
                <div
                  className="fixed inset-0 bg-black/50 z-20 md:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
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
                {/* Sidebar header */}
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
                  <button
                    className="md:hidden text-blue-300 hover:text-white p-1 rounded transition-colors shrink-0"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Nav links */}
                <nav className="flex-1 px-2 py-3 space-y-0.5">
                  {sidebarLinks.map(({ href, label, Icon, exact }) => {
                    const isActive = exact ? pathname === href : pathname.startsWith(href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setSidebarOpen(false)}
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

                {/* Sidebar footer */}
                <div className="px-2 py-3 border-t border-navy-700 space-y-1">
                  {user?.signInDetails?.loginId && (
                    <div className="px-3 py-2.5 rounded-lg bg-navy-700/50 mb-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-blue-400">Signed in as</p>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${roleConfig.bg} ${roleConfig.text}`}>
                          <roleConfig.Icon size={9} />
                          {roleConfig.label}
                        </span>
                      </div>
                      <p className="text-xs text-white truncate">{user.signInDetails.loginId}</p>
                    </div>
                  )}
                  <Link
                    href="/"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-blue-300 hover:bg-navy-700 hover:text-white transition-colors"
                  >
                    <Globe size={15} />
                    View Website
                  </Link>
                  <button
                    onClick={signOut}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-red-300 hover:bg-red-900/30 hover:text-red-200 transition-colors w-full"
                  >
                    <LogOut size={15} />
                    Sign Out
                  </button>
                </div>
              </aside>

              {/* Main content */}
              <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center gap-3 justify-between shrink-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors shrink-0"
                      onClick={() => setSidebarOpen(true)}
                      aria-label="Open menu"
                    >
                      <Menu size={20} />
                    </button>
                    <p className="text-gray-700 text-sm font-semibold truncate">
                      {sidebarLinks.find((l) => (l.exact ? pathname === l.href : pathname.startsWith(l.href)))?.label ?? "Admin"}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 hidden sm:block shrink-0">Rev Sione Kami Memorial Church</p>
                </header>

                <main className="flex-1 overflow-y-auto">{children}</main>
              </div>

            </div>
          )}
        </Authenticator>
      </div>
    </ThemeProvider>
  );
}
