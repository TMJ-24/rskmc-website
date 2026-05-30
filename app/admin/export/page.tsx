"use client";

import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Download, FileJson, FileText, CheckSquare, Square, Loader2 } from "lucide-react";

const client = generateClient<Schema>();

interface ExportOption {
  key: string;
  label: string;
  description: string;
  fetch: () => Promise<unknown[]>;
}

const exportOptions: ExportOption[] = [
  { key: "siteSettings",     label: "Site Settings",      description: "Church info, bank details, social links",          fetch: async () => (await client.models.SiteSettings.list()).data },
  { key: "heroSlides",       label: "Hero Slides",        description: "Homepage slider slides and content",               fetch: async () => (await client.models.HeroSlide.list()).data },
  { key: "sermons",          label: "Sermons",            description: "All sermon records",                               fetch: async () => (await client.models.Sermon.list()).data },
  { key: "events",           label: "Events",             description: "Upcoming and past events",                         fetch: async () => (await client.models.Event.list()).data },
  { key: "newsPosts",        label: "News Posts",         description: "Church announcements and news articles",           fetch: async () => (await client.models.NewsPost.list()).data },
  { key: "testimonials",     label: "Testimonials",       description: "Member testimonials and featured stories",         fetch: async () => (await client.models.Testimonial.list()).data },
  { key: "leaders",          label: "Leadership Team",    description: "Pastors, elders and ministry leaders",             fetch: async () => (await client.models.Leader.list()).data },
  { key: "ministries",       label: "Ministries",         description: "All church ministries and commissions",            fetch: async () => (await client.models.Ministry.list()).data },
  { key: "serviceTimes",     label: "Service Times",      description: "Weekly worship service schedule",                  fetch: async () => (await client.models.ServiceTime.list()).data },
  { key: "highlights",       label: "Home Highlights",    description: "Home page pillars (What We're About)",             fetch: async () => (await client.models.ChurchHighlight.list()).data },
  { key: "coreValues",       label: "Core Values",        description: "About page core values section",                   fetch: async () => (await client.models.CoreValue.list()).data },
  { key: "projects",         label: "Building Projects",  description: "Church infrastructure and development projects",   fetch: async () => (await client.models.Project.list()).data },
  { key: "givingCategories", label: "Giving Categories",  description: "Ways to give / offering types",                    fetch: async () => (await client.models.GivingCategory.list()).data },
  { key: "contactMessages",  label: "Contact Messages",   description: "All contact form submissions",                     fetch: async () => (await client.models.ContactSubmission.list()).data },
];

function toCSV(rows: unknown[]): string {
  if (!rows.length) return "";
  const keys = Object.keys(rows[0] as object).filter((k) => k !== "__typename");
  const escape = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return s.includes(",") || s.includes('"') || s.includes("\n")
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  };
  const header = keys.join(",");
  const body = rows.map((r) => keys.map((k) => escape((r as Record<string, unknown>)[k])).join(",")).join("\n");
  return `${header}\n${body}`;
}

function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminExport() {
  const [selected,   setSelected]   = useState<Set<string>>(new Set(exportOptions.map((o) => o.key)));
  const [loading,    setLoading]    = useState(false);
  const [progress,   setProgress]   = useState<string>("");
  const [counts,     setCounts]     = useState<Record<string, number>>({});
  const [countLoading, setCountLoading] = useState(false);

  function toggle(key: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  function selectAll()   { setSelected(new Set(exportOptions.map((o) => o.key))); }
  function deselectAll() { setSelected(new Set()); }

  async function loadCounts() {
    setCountLoading(true);
    const result: Record<string, number> = {};
    await Promise.all(
      exportOptions.map(async (opt) => {
        try {
          const data = await opt.fetch();
          result[opt.key] = data.length;
        } catch {
          result[opt.key] = 0;
        }
      })
    );
    setCounts(result);
    setCountLoading(false);
  }

  async function handleExportJSON() {
    if (!selected.size) return;
    setLoading(true);
    setProgress("Fetching data…");
    const payload: Record<string, unknown[]> = {};
    for (const opt of exportOptions.filter((o) => selected.has(o.key))) {
      setProgress(`Fetching ${opt.label}…`);
      try {
        payload[opt.key] = await opt.fetch();
      } catch {
        payload[opt.key] = [];
      }
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const json = JSON.stringify({ exportedAt: new Date().toISOString(), site: "RSKMC", data: payload }, null, 2);
    downloadFile(json, `rskmc-export-${timestamp}.json`, "application/json");
    setProgress("");
    setLoading(false);
  }

  async function handleExportCSV(opt: ExportOption) {
    setProgress(`Exporting ${opt.label}…`);
    try {
      const data = await opt.fetch();
      const csv  = toCSV(data);
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
      downloadFile(csv, `rskmc-${opt.key}-${timestamp}.csv`, "text/csv");
    } catch {
      alert(`Failed to export ${opt.label}.`);
    }
    setProgress("");
  }

  return (
    <div className="p-8 admin-page-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Export Data</h1>
          <p className="text-gray-500 text-sm mt-1">Download a full or partial snapshot of your site content as JSON or CSV</p>
        </div>
        <button
          onClick={loadCounts}
          disabled={countLoading}
          className="text-sm text-gold-600 hover:text-gold-700 font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
        >
          {countLoading ? <Loader2 size={14} className="animate-spin" /> : null}
          {countLoading ? "Loading counts…" : "Load record counts"}
        </button>
      </div>

      {/* Selection controls */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-gray-500 font-medium">{selected.size} of {exportOptions.length} selected</span>
        <button onClick={selectAll}   className="text-xs text-navy-600 hover:underline font-medium">Select all</button>
        <span className="text-gray-300">·</span>
        <button onClick={deselectAll} className="text-xs text-gray-400 hover:underline">Deselect all</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-8"></th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Data Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Description</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Records</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">CSV</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {exportOptions.map((opt) => {
              const checked = selected.has(opt.key);
              return (
                <tr
                  key={opt.key}
                  onClick={() => toggle(opt.key)}
                  className={`cursor-pointer transition-colors duration-100 ${checked ? "bg-navy-50/40" : "hover:bg-gray-50"}`}
                >
                  <td className="px-5 py-3.5">
                    {checked
                      ? <CheckSquare size={17} className="text-navy-700" />
                      : <Square     size={17} className="text-gray-300" />
                    }
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`font-semibold ${checked ? "text-navy-700" : "text-gray-500"}`}>{opt.label}</span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-400 hidden md:table-cell">{opt.description}</td>
                  <td className="px-5 py-3.5 text-right">
                    {countLoading
                      ? <span className="text-gray-300 text-xs">…</span>
                      : counts[opt.key] != null
                        ? <span className="font-mono text-navy-700 font-semibold">{counts[opt.key]}</span>
                        : <span className="text-gray-300 text-xs">—</span>
                    }
                  </td>
                  <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleExportCSV(opt)}
                      disabled={!!progress}
                      className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-navy-700 font-medium transition-colors disabled:opacity-40"
                      title={`Export ${opt.label} as CSV`}
                    >
                      <FileText size={13} />
                      CSV
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Export actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleExportJSON}
          disabled={loading || !selected.size}
          className="inline-flex items-center gap-2 bg-navy-700 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-navy-600 active:scale-95 transition-all duration-200 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading
            ? <Loader2 size={15} className="animate-spin" />
            : <FileJson size={15} />
          }
          {loading ? progress || "Exporting…" : `Export ${selected.size} type${selected.size !== 1 ? "s" : ""} as JSON`}
        </button>

        <p className="text-xs text-gray-400">
          Downloads a single <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-600">rskmc-export-*.json</code> file containing all selected data
        </p>
      </div>

      {/* Info box */}
      <div className="mt-8 bg-gold-50 border border-gold-200 rounded-xl p-5 text-sm text-gold-800 space-y-1">
        <p className="font-semibold">About this export</p>
        <ul className="list-disc list-inside space-y-0.5 text-gold-700 text-xs">
          <li>JSON export includes all selected types in one file — ideal for backups or migration</li>
          <li>CSV exports one type at a time — ideal for spreadsheets and reporting</li>
          <li>Contact Messages export includes all submissions; handle with care</li>
          <li>Use &ldquo;Load record counts&rdquo; above to see how many records exist before exporting</li>
        </ul>
      </div>
    </div>
  );
}
