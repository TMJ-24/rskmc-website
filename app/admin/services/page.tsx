"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const client = generateClient<Schema>();
type ServiceTime = Schema["ServiceTime"]["type"];

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const emptyForm = { day: "Sunday", time: "", name: "", description: "", duration: "", order: 1, published: true };

export default function AdminServices() {
  const [items, setItems] = useState<ServiceTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ServiceTime | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    try {
      const res = await client.models.ServiceTime.list();
      setItems([...res.data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    } catch { } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function openAdd() {
    setEditing(null);
    setForm({ ...emptyForm, order: items.length + 1 });
    setShowModal(true);
  }

  function openEdit(s: ServiceTime) {
    setEditing(s);
    setForm({
      day: s.day, time: s.time, name: s.name,
      description: s.description ?? "", duration: s.duration ?? "",
      order: s.order, published: s.published ?? true,
    });
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await client.models.ServiceTime.update({ id: editing.id, ...form });
      } else {
        await client.models.ServiceTime.create(form);
      }
      setShowModal(false);
      await load();
    } catch (err) { alert("Error: " + String(err)); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    try {
      await client.models.ServiceTime.delete({ id });
      setDeleteId(null);
      await load();
    } catch (err) { alert("Error: " + String(err)); }
  }

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Service Times</h1>
          <p className="text-gray-500 text-sm mt-1">{items.length} service{items.length !== 1 ? "s" : ""} · shown on Services page and footer</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-navy-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-600 transition-colors">
          <Plus size={16} /> Add Service
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center text-gray-400">No service times yet. Add your first one.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">#</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Service</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Day</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Time</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium hidden md:table-cell">Duration</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 text-gray-400 text-xs">{s.order}</td>
                  <td className="px-5 py-4 font-medium text-navy-700">{s.name}</td>
                  <td className="px-5 py-4 text-gray-600">{s.day}</td>
                  <td className="px-5 py-4 text-gray-600">{s.time}</td>
                  <td className="px-5 py-4 text-gray-400 hidden md:table-cell">{s.duration}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {s.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(s)} className="text-gray-400 hover:text-navy-700"><Pencil size={15} /></button>
                      <button onClick={() => setDeleteId(s.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-navy-700">{editing ? "Edit Service" : "Add Service Time"}</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
                <input type="text" value={form.name} onChange={set("name")} required placeholder="e.g. Morning Worship Service" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Day *</label>
                  <select value={form.day} onChange={set("day")} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700 bg-white">
                    {DAYS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                  <input type="text" value={form.time} onChange={set("time")} required placeholder="e.g. 9:00 AM" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input type="text" value={form.duration} onChange={set("duration")} placeholder="e.g. ~90 min" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={set("description")} rows={3} placeholder="Brief description of this service..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order *</label>
                <input type="number" value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))} required min={1} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} className="rounded" />
                <span className="text-gray-700 font-medium">Published</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex-1 bg-navy-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-600 disabled:opacity-50">
                  {saving ? "Saving..." : editing ? "Update Service" : "Add Service"}
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
            <h2 className="font-bold text-navy-700 mb-2">Delete Service Time?</h2>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
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
