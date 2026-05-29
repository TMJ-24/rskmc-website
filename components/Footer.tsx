import Link from "next/link";
import { Phone, Mail, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-500/70 mb-3 flex items-center gap-2">
            <span className="inline-block w-4 h-px bg-gold-500/50" />
            The Church
          </p>
          <h3 className="text-gold-500 font-bold text-lg mb-1">RSKMC</h3>
          <p className="text-blue-200 text-sm mb-3">Rev Sione Kami Memorial Church</p>
          <p className="text-blue-300 text-sm">Gabaka Street</p>
          <p className="text-blue-300 text-sm">Port Moresby, NCD 675</p>
          <p className="text-blue-300 text-sm">Papua New Guinea</p>
          <div className="mt-3 space-y-1">
            <p className="text-blue-300 text-sm flex items-center gap-2">
              <Phone size={13} className="shrink-0 text-gold-500/70" />
              325 5448
            </p>
            <p className="text-blue-300 text-sm flex items-center gap-2">
              <Mail size={13} className="shrink-0 text-gold-500/70" />
              info@rskmc.org.pg
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-500/70 mb-3 flex items-center gap-2">
            <span className="inline-block w-4 h-px bg-gold-500/50" />
            Gather With Us
          </p>
          <h3 className="text-gold-500 font-bold text-lg mb-3">Service Times</h3>
          <div className="text-sm text-blue-300 space-y-2">
            <p>
              <span className="text-white font-semibold">Sunday</span><br />
              Morning: 9:00 AM · Evening: 6:00 PM
            </p>
            <p>
              <span className="text-white font-semibold">Wednesday</span><br />
              Bible Study: 7:00 PM
            </p>
            <p>
              <span className="text-white font-semibold">Friday</span><br />
              Prayer Meeting: 7:00 PM
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-500/70 mb-3 flex items-center gap-2">
            <span className="inline-block w-4 h-px bg-gold-500/50" />
            Navigation
          </p>
          <h3 className="text-gold-500 font-bold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { href: "/about", label: "About Us" },
              { href: "/services", label: "Services" },
              { href: "/ministries", label: "Ministries" },
              { href: "/sermons", label: "Sermons" },
              { href: "/events", label: "Events" },
              { href: "/testimonials", label: "Testimonials" },
              { href: "/give", label: "Give and Contact" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-blue-300 hover:text-gold-500 transition-colors duration-200 text-sm flex items-center gap-1 group"
                >
                  <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-700 py-5 text-center text-xs text-blue-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 mb-2">
            <Link href="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
          </div>
          © {new Date().getFullYear()} Rev Sione Kami Memorial Church. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
