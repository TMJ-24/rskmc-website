"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const client = generateClient<Schema>();
type Leader = Schema["Leader"]["type"];

const emptyForm = { name: "", role: "", bio: "", imageUrl: "", order: 1, published: true };

export default function AdminLeaders() {
  const [items, setItems] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Leader | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    try {
      const res = await client.models.Leader.list();
      setItems([...res.data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    } catch { } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function openAdd() {
    setEditing(null);
    setForm({ ...emptyForm, order: items.length + 1 });
    setShowModal(true);
  }

  function openEdit(l: Leader) {
    setEditing(l);
    setForm({
      name: l.name, role: l.role, bio: l.bio ?? "",
      imageUrl: l.imageUrl ?? "", order: l.order, published: l.published ?? true,
    });
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await client.models.Leader.update({ id: editing.id, ...form });
      } else {
        await client.models.Leader.create(form);
      }
      setShowModal(false);
      await load();
    } catch (err) { alert("Error: " + String(err)); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    try {
      await client.models.Leader.delete({ id });
      setDeleteId(null);
      await load();
    } catch (err) { alert("Error: " + String(err)); }
  }

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Leadership Team</h1>
          <p className="text-gray-500 text-sm mt-1">{items.length} leader{items.length !== 1 ? "s" : ""} · displayed on the About page</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-navy-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-600 transition-colors">
          <Plus size={16} /> Add Leader
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full p-10 text-center text-gray-400 bg-white rounded-xl">Loading...</div>
        ) : items.length === 0 ? (
          <div className="col-span-full p-10 text-center text-gray-400 bg-white rounded-xl">No leaders yet. Add your first one.</div>
        ) : items.map((l) => (
          <div key={l.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-navy-700 text-gold-400 rounded-full flex items-center justify-center text-lg font-bold shrink-0">
                {l.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-navy-700">{l.name}</p>
                <p className="text-gray-500 text-sm">{l.role}</p>
                {l.bio && <p className="text-gray-400 text-xs mt-1 line-clamp-2">{l.bio}</p>}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${l.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {l.published ? "Published" : "Draft"}
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(l)} className="text-gray-400 hover:text-navy-700"><Pencil size={15} /></button>
                <button onClick={() => setDeleteId(l.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={15} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-navy-700">{editing ? "Edit Leader" : "Add Leader"}</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input type="text" value={form.name} onChange={set("name")} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role / Title *</label>
                <input type="text" value={form.role} onChange={set("role")} required placeholder="e.g. Senior Pastor" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea value={form.bio} onChange={set("bio")} rows={3} placeholder="Short biography..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
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
                  {saving ? "Saving..." : editing ? "Update Leader" : "Add Leader"}
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
            <h2 className="font-bold text-navy-700 mb-2">Remove Leader?</h2>
            <p className="text-gray-500 text-sm mb-6">This will remove them from the About page.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 text-white py-2.5 rounded-lg text-sm font-semibold">Remove</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 rounded-lg text-sm text-gray-600">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
