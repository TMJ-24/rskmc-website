"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const client = generateClient<Schema>();
type ChurchHighlight = Schema["ChurchHighlight"]["type"];

const ICONS = ["Music", "BookOpen", "Users", "Globe", "Heart", "Cross", "Star", "Flame", "Handshake", "Church"];
const emptyForm = { title: "", desc: "", icon: "Music", order: 1, published: true };

export default function AdminHighlights() {
  const [items, setItems] = useState<ChurchHighlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ChurchHighlight | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    try {
      const res = await client.models.ChurchHighlight.list();
      setItems([...res.data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    } catch { } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setEditing(null); setForm({ ...emptyForm, order: items.length + 1 }); setShowModal(true); }

  function openEdit(h: ChurchHighlight) {
    setEditing(h);
    setForm({ title: h.title, desc: h.desc, icon: h.icon, order: h.order, published: h.published ?? true });
    setShowModal(true);
  }

  async function handleSave(e: { preventDefault(): void }) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) await client.models.ChurchHighlight.update({ id: editing.id, ...form });
      else await client.models.ChurchHighlight.create(form);
      setShowModal(false);
      await load();
    } catch (err) { alert("Error: " + String(err)); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    try { await client.models.ChurchHighlight.delete({ id }); setDeleteId(null); await load(); }
    catch (err) { alert("Error: " + String(err)); }
  }

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="p-8 admin-page-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Home Highlights</h1>
          <p className="text-gray-500 text-sm mt-1">{items.length} highlight{items.length !== 1 ? "s" : ""} · &ldquo;What We&apos;re About&rdquo; section on Home page</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-navy-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-600 transition-colors">
          <Plus size={16} /> Add Highlight
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full p-10 text-center text-gray-400 bg-white rounded-xl">Loading...</div>
        ) : items.length === 0 ? (
          <div className="col-span-full p-10 text-center text-gray-400 bg-white rounded-xl">No highlights yet.</div>
        ) : items.map((h) => (
          <div key={h.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{h.icon}</span>
              <p className="font-semibold text-navy-700">{h.title}</p>
            </div>
            <p className="text-gray-500 text-sm">{h.desc}</p>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${h.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {h.published ? "Published" : "Draft"}
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(h)} className="text-gray-400 hover:text-navy-700"><Pencil size={15} /></button>
                <button onClick={() => setDeleteId(h.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={15} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-navy-700">{editing ? "Edit Highlight" : "Add Highlight"}</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input type="text" value={form.title} onChange={set("title")} required placeholder="e.g. Worship" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea value={form.desc} onChange={set("desc")} required rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon *</label>
                <select value={form.icon} onChange={set("icon")} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700">
                  {ICONS.map((i) => <option key={i}>{i}</option>)}
                </select>
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
                  {saving ? "Saving..." : editing ? "Update" : "Add Highlight"}
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
            <h2 className="font-bold text-navy-700 mb-2">Delete Highlight?</h2>
            <div className="flex gap-3 mt-4">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 text-white py-2.5 rounded-lg text-sm font-semibold">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 rounded-lg text-sm text-gray-600">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
