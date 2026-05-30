"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const client = generateClient<Schema>();
type Project = Schema["Project"]["type"];

const STATUSES = ["Planning", "In Progress", "Completed"];
const emptyForm = { title: "", status: "Planning", description: "", goal: "", progressPercent: 0, imageUrl: "", order: 1, published: true };

const statusColour: Record<string, string> = {
  "Completed":  "bg-emerald-100 text-emerald-700",
  "In Progress":"bg-blue-100 text-blue-700",
  "Planning":   "bg-amber-100 text-amber-700",
};

export default function AdminProjects() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    try {
      const res = await client.models.Project.list();
      setItems([...res.data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    } catch { } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function openAdd() {
    setEditing(null);
    setForm({ ...emptyForm, order: items.length + 1 });
    setShowModal(true);
  }

  function openEdit(p: Project) {
    setEditing(p);
    setForm({ title: p.title, status: p.status, description: p.description, goal: p.goal ?? "", progressPercent: p.progressPercent ?? 0, imageUrl: p.imageUrl ?? "", order: p.order, published: p.published ?? true });
    setShowModal(true);
  }

  async function handleSave(e: { preventDefault(): void }) {
    e.preventDefault();
    setSaving(true);
    try {
      const data = { ...form, progressPercent: Number(form.progressPercent) };
      if (editing) await client.models.Project.update({ id: editing.id, ...data });
      else await client.models.Project.create(data);
      setShowModal(false);
      await load();
    } catch (err) { alert("Error: " + String(err)); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    try { await client.models.Project.delete({ id }); setDeleteId(null); await load(); }
    catch (err) { alert("Error: " + String(err)); }
  }

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="p-8 admin-page-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Building Projects</h1>
          <p className="text-gray-500 text-sm mt-1">{items.length} project{items.length !== 1 ? "s" : ""} · displayed on Projects page</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-navy-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-600 transition-colors">
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="p-10 text-center text-gray-400 bg-white rounded-xl">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center text-gray-400 bg-white rounded-xl">No projects yet.</div>
        ) : items.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-navy-700 mb-1">{p.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">{p.description}</p>
                {p.goal && <p className="text-xs text-gray-400 mt-1">Goal: {p.goal} · {p.progressPercent ?? 0}% complete</p>}
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${statusColour[p.status] ?? "bg-gray-100 text-gray-600"}`}>{p.status}</span>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {p.published ? "Published" : "Draft"}
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(p)} className="text-gray-400 hover:text-navy-700"><Pencil size={15} /></button>
                <button onClick={() => setDeleteId(p.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={15} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-navy-700">{editing ? "Edit Project" : "Add Project"}</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input type="text" value={form.title} onChange={set("title")} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                <select value={form.status} onChange={set("status")} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700">
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea value={form.description} onChange={set("description")} required rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fundraising Goal</label>
                  <input type="text" value={form.goal} onChange={set("goal")} placeholder="e.g. K 850,000" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Progress %</label>
                  <input type="number" value={form.progressPercent} onChange={set("progressPercent")} min={0} max={100} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="text" value={form.imageUrl} onChange={set("imageUrl")} placeholder="https://..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order *</label>
                <input type="number" value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))} required min={1} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} className="rounded" />
                <span className="text-gray-700 font-medium">Published</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex-1 bg-navy-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-600 disabled:opacity-50">
                  {saving ? "Saving..." : editing ? "Update" : "Add Project"}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h2 className="font-bold text-navy-700 mb-2">Delete Project?</h2>
            <p className="text-gray-500 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 text-white py-2.5 rounded-lg text-sm font-semibold">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 rounded-lg text-sm text-gray-600">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
