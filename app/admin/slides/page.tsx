"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Plus, Pencil, Trash2, X, ArrowUp, ArrowDown } from "lucide-react";

const client = generateClient<Schema>();
type HeroSlide = Schema["HeroSlide"]["type"];

const emptyForm = {
  eyebrow: "", headingLine1: "", headingLine2: "", sub: "",
  imageUrl: "", primaryLabel: "", primaryHref: "",
  secondaryLabel: "", secondaryHref: "", order: 1, active: true,
};

export default function AdminSlides() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<HeroSlide | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    try {
      const res = await client.models.HeroSlide.list();
      setSlides([...res.data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    } catch { /* backend not deployed yet */ }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function openAdd() {
    setEditing(null);
    setForm({ ...emptyForm, order: slides.length + 1 });
    setShowModal(true);
  }

  function openEdit(s: HeroSlide) {
    setEditing(s);
    setForm({
      eyebrow: s.eyebrow, headingLine1: s.headingLine1, headingLine2: s.headingLine2,
      sub: s.sub, imageUrl: s.imageUrl, primaryLabel: s.primaryLabel,
      primaryHref: s.primaryHref, secondaryLabel: s.secondaryLabel,
      secondaryHref: s.secondaryHref, order: s.order, active: s.active ?? true,
    });
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await client.models.HeroSlide.update({ id: editing.id, ...form });
      } else {
        await client.models.HeroSlide.create(form);
      }
      setShowModal(false);
      await load();
    } catch (err) {
      alert("Error saving slide: " + String(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await client.models.HeroSlide.delete({ id });
      setDeleteId(null);
      await load();
    } catch (err) {
      alert("Error deleting: " + String(err));
    }
  }

  async function move(slide: HeroSlide, direction: "up" | "down") {
    const idx = slides.findIndex((s) => s.id === slide.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= slides.length) return;
    const other = slides[swapIdx];
    await Promise.all([
      client.models.HeroSlide.update({ id: slide.id, order: other.order }),
      client.models.HeroSlide.update({ id: other.id, order: slide.order }),
    ]);
    await load();
  }

  const setText = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Hero Slides</h1>
          <p className="text-gray-500 text-sm mt-1">{slides.length} slide{slides.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-navy-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-600 transition-colors"
        >
          <Plus size={16} /> Add Slide
        </button>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="p-10 text-center text-gray-400 bg-white rounded-xl">Loading...</div>
        ) : slides.length === 0 ? (
          <div className="p-10 text-center text-gray-400 bg-white rounded-xl">No slides yet. Add your first hero slide.</div>
        ) : slides.map((slide, idx) => (
          <div key={slide.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <button onClick={() => move(slide, "up")} disabled={idx === 0} className="text-gray-300 hover:text-navy-700 disabled:opacity-30 transition-colors"><ArrowUp size={16} /></button>
              <button onClick={() => move(slide, "down")} disabled={idx === slides.length - 1} className="text-gray-300 hover:text-navy-700 disabled:opacity-30 transition-colors"><ArrowDown size={16} /></button>
            </div>
            <div className="w-10 h-10 rounded-lg bg-navy-100 text-navy-700 font-bold flex items-center justify-center text-sm shrink-0">
              {slide.order}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-navy-700 text-sm">{slide.headingLine1} {slide.headingLine2}</p>
              <p className="text-gray-500 text-xs truncate">{slide.eyebrow} · {slide.sub}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${slide.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {slide.active ? "Active" : "Inactive"}
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => openEdit(slide)} className="text-gray-400 hover:text-navy-700 transition-colors"><Pencil size={15} /></button>
              <button onClick={() => setDeleteId(slide.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-navy-700">{editing ? "Edit Slide" : "Add Slide"}</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {[
                { field: "eyebrow", label: "Eyebrow Text", placeholder: "e.g. Welcome to RSKMC" },
                { field: "headingLine1", label: "Heading Line 1", placeholder: "e.g. Rev Sione Kami" },
                { field: "headingLine2", label: "Heading Line 2", placeholder: "e.g. Memorial Church" },
                { field: "sub", label: "Subtext", placeholder: "Short description" },
                { field: "imageUrl", label: "Image URL", placeholder: "https://..." },
                { field: "primaryLabel", label: "Primary Button Label" },
                { field: "primaryHref", label: "Primary Button Link", placeholder: "/services" },
                { field: "secondaryLabel", label: "Secondary Button Label" },
                { field: "secondaryHref", label: "Secondary Button Link", placeholder: "/about" },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label} *</label>
                  <input
                    type="text"
                    value={(form as Record<string, string | number | boolean>)[field] as string}
                    onChange={setText(field)}
                    required
                    placeholder={placeholder}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order *</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
                  required min={1}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700"
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} className="rounded" />
                <span className="text-gray-700 font-medium">Active</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex-1 bg-navy-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-600 disabled:opacity-50">
                  {saving ? "Saving..." : editing ? "Update Slide" : "Add Slide"}
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
            <h2 className="font-bold text-navy-700 mb-2">Delete Slide?</h2>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-red-500">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
