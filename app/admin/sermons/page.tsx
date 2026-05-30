"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const client = generateClient<Schema>();
type Sermon = Schema["Sermon"]["type"];

const emptyForm = {
  title: "", speaker: "", date: "", scripture: "",
  series: "", duration: "", audioUrl: "", videoUrl: "", published: false,
};

export default function AdminSermons() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Sermon | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    try {
      const res = await client.models.Sermon.list();
      setSermons([...res.data].sort((a, b) => b.date.localeCompare(a.date)));
    } catch { /* backend not deployed yet */ }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEdit(s: Sermon) {
    setEditing(s);
    setForm({
      title: s.title, speaker: s.speaker, date: s.date,
      scripture: s.scripture, series: s.series, duration: s.duration,
      audioUrl: s.audioUrl ?? "", videoUrl: s.videoUrl ?? "",
      published: s.published ?? false,
    });
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await client.models.Sermon.update({ id: editing.id, ...form });
      } else {
        await client.models.Sermon.create(form);
      }
      setShowModal(false);
      await load();
    } catch (err) {
      alert("Error saving sermon: " + String(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await client.models.Sermon.delete({ id });
      setDeleteId(null);
      await load();
    } catch (err) {
      alert("Error deleting: " + String(err));
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Sermons</h1>
          <p className="text-gray-500 text-sm mt-1">{sermons.length} sermon{sermons.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-navy-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-600 transition-colors"
        >
          <Plus size={16} /> Add Sermon
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400">Loading...</div>
        ) : sermons.length === 0 ? (
          <div className="p-10 text-center text-gray-400">No sermons yet. Add your first one.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Title</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium hidden md:table-cell">Speaker</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium hidden lg:table-cell">Date</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium hidden xl:table-cell">Series</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sermons.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-navy-700">{s.title}</td>
                  <td className="px-5 py-4 text-gray-600 hidden md:table-cell">{s.speaker}</td>
                  <td className="px-5 py-4 text-gray-600 hidden lg:table-cell">{s.date}</td>
                  <td className="px-5 py-4 text-gray-600 hidden xl:table-cell">{s.series}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {s.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(s)} className="text-gray-400 hover:text-navy-700 transition-colors">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => setDeleteId(s.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-navy-700">{editing ? "Edit Sermon" : "Add Sermon"}</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {[
                { name: "title", label: "Title", required: true },
                { name: "speaker", label: "Speaker", required: true },
                { name: "date", label: "Date", required: true, placeholder: "e.g. May 25, 2026" },
                { name: "scripture", label: "Scripture", required: true, placeholder: "e.g. John 3:16" },
                { name: "series", label: "Series", required: true },
                { name: "duration", label: "Duration", required: true, placeholder: "e.g. 42 min" },
                { name: "audioUrl", label: "Audio URL", placeholder: "https://..." },
                { name: "videoUrl", label: "Video URL", placeholder: "https://..." },
              ].map(({ name, label, required, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && " *"}</label>
                  <input
                    type="text"
                    value={(form as Record<string, string | boolean>)[name] as string}
                    onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
                    required={required}
                    placeholder={placeholder}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700"
                  />
                </div>
              ))}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-gray-700 font-medium">Published</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-navy-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-600 disabled:opacity-50"
                >
                  {saving ? "Saving..." : editing ? "Update Sermon" : "Add Sermon"}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h2 className="font-bold text-navy-700 mb-2">Delete Sermon?</h2>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-red-500">
                Delete
              </button>
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
