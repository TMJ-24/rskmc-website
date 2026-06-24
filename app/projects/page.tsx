import Image from "next/image";
import Link from "next/link";
import { Building2, CheckCircle2, Clock, CircleDot, ChevronRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

type ProjectStatus = "Completed" | "In Progress" | "Planning";

const projects = [
  { id: "1", title: "Church Sanctuary Extension",  status: "In Progress" as ProjectStatus, description: "Expanding the main sanctuary to accommodate our growing congregation. The extension will add seating for an additional 300 worshippers and include improved acoustics and lighting.",                         goal: "K 850,000", progressPercent: 62, imageUrl: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&q=75" },
  { id: "2", title: "Fellowship Hall & Kitchen",   status: "Planning"    as ProjectStatus, description: "A dedicated multi-purpose hall for community gatherings, meals, and ministry events. The facility will include a commercial kitchen to support our food-relief outreach programmes.",                     goal: "K 420,000", progressPercent: 18, imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=75" },
  { id: "3", title: "Youth Centre & Library",      status: "Planning"    as ProjectStatus, description: "A safe and inspiring space for young people — featuring a study library, meeting rooms, and recreational areas to support discipleship and community engagement for youth.",                             goal: "K 310,000", progressPercent: 8,  imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=75" },
  { id: "4", title: "Perimeter Fence & Gating",   status: "Completed"   as ProjectStatus, description: "Security perimeter fencing and automated gating for the church compound, improving safety for all services and events. Completed and commissioned in early 2025.", goal: undefined, progressPercent: undefined, imageUrl: undefined },
  { id: "5", title: "Carpark & Drainage",          status: "Completed"   as ProjectStatus, description: "Sealed carpark with stormwater drainage to serve the main sanctuary and future facilities. Includes accessible parking bays and improved pedestrian pathways.", goal: undefined, progressPercent: undefined, imageUrl: undefined },
];

const statusConfig: Record<ProjectStatus, { icon: typeof CheckCircle2; colour: string; bg: string }> = {
  Completed:    { icon: CheckCircle2, colour: "text-emerald-600", bg: "bg-emerald-50" },
  "In Progress":{ icon: Clock,        colour: "text-blue-600",    bg: "bg-blue-50" },
  Planning:     { icon: CircleDot,    colour: "text-amber-600",   bg: "bg-amber-50" },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status as ProjectStatus] ?? { icon: CircleDot, colour: "text-gray-600", bg: "bg-gray-50" };
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.colour}`}>
      <Icon size={11} />{status}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="mt-4">
      <div className="flex justify-between text-xs text-gray-400 mb-1.5">
        <span>Fundraising progress</span>
        <span className="font-semibold text-navy-700">{value}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-navy-700 rounded-full" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function Projects() {
  const active    = projects.filter((p) => p.status !== "Completed");
  const completed = projects.filter((p) => p.status === "Completed");

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-800 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920&q=75" alt="" fill className="object-cover opacity-15" priority />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Projects" }]} />
          <p className="eyebrow text-gold-400 mb-4">Infrastructure &amp; Development</p>
          <h1 className="h-section text-white mb-4">Building Projects</h1>
          <p className="body-lg text-blue-200 max-w-2xl">
            Investing in facilities that will serve our congregation and community for generations.
            Every project is a step of faith — planned prayerfully and built for God&apos;s glory.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-3 divide-x divide-gray-100">
          {[
            { value: projects.length, label: "Total Projects" },
            { value: active.length,   label: "Active / Planned" },
            { value: completed.length,label: "Completed" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center px-4">
              <p className="text-3xl font-bold text-navy-700 tracking-tight">{value}</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Active */}
      {active.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow text-gold-600 mb-4">Current &amp; Upcoming</p>
            <h2 className="h-section text-navy-700 mb-12">Active Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {active.map((p) => (
                <div key={p.id} className="group bg-white rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-1 transition-all duration-300">
                  {p.imageUrl && (
                    <div className="relative h-44 overflow-hidden">
                      <Image src={p.imageUrl} alt={p.title} fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-navy-900/40" />
                      <div className="absolute top-3 left-3"><StatusBadge status={p.status} /></div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="h-card text-navy-700">{p.title}</h3>
                      {!p.imageUrl && <StatusBadge status={p.status} />}
                    </div>
                    <p className="body text-gray-500 mb-3">{p.description}</p>
                    {p.goal && <p className="text-xs text-gray-400">Goal: <span className="font-semibold text-navy-700">{p.goal}</span></p>}
                    {p.progressPercent != null && <ProgressBar value={p.progressPercent} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <section className="bg-gray-50 py-24 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow text-gold-600 mb-4">To God&apos;s Glory</p>
            <h2 className="h-section text-navy-700 mb-12">Completed Projects</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {completed.map((p) => (
                <div key={p.id} className="flex gap-4 bg-white rounded-2xl p-5 shadow-[var(--shadow-card)]">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-700 mb-1">{p.title}</h3>
                    <p className="body text-gray-500">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-navy-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-11 h-11 bg-gold-500/20 text-gold-400 rounded-xl flex items-center justify-center shrink-0">
              <Building2 size={20} />
            </div>
            <p className="eyebrow text-gold-400">Partner With Us</p>
          </div>
          <h2 className="h-section text-white mb-4">Support a Building Project</h2>
          <p className="body-lg text-blue-200 max-w-xl mb-8">
            Your generous gift helps us build spaces where lives are transformed.
            Every contribution — large or small — brings us closer to the goal.
          </p>
          <Link href="/give" className="inline-flex items-center gap-2 bg-gold-500 text-navy-800 font-bold px-8 py-3.5 rounded-xl hover:bg-gold-400 active:scale-95 transition-all duration-200 text-sm">
            Give Towards a Project <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
