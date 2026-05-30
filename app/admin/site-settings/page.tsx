"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Save, Settings } from "lucide-react";

const client = generateClient<Schema>();
type SiteSettings = Schema["SiteSettings"]["type"];

const defaultForm = {
  churchName:    "Rev Sione Kami Memorial Church",
  addressLine1:  "Gabaka Street",
  city:          "Port Moresby, NCD 675",
  country:       "Papua New Guinea",
  phone:         "325 5448",
  email:         "info@rskmc.org.pg",
  officeHours:   "Monday – Friday: 9:00 AM – 4:00 PM",
  facebookUrl:   "",
  youtubeUrl:    "",
  bankName:      "Bank of the South Pacific (BSP)",
  accountName:   "Rev Sione Kami Memorial Church",
  accountNumber: "XXXX-XXXX-XXXX",
  bankBranch:    "Port Moresby Main Branch",
};

export default function AdminSiteSettings() {
  const [record, setRecord] = useState<SiteSettings | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await client.models.SiteSettings.list();
        if (res.data.length > 0) {
          const s = res.data[0];
          setRecord(s);
          setForm({
            churchName:    s.churchName,
            addressLine1:  s.addressLine1,
            city:          s.city,
            country:       s.country,
            phone:         s.phone,
            email:         s.email,
            officeHours:   s.officeHours,
            facebookUrl:   s.facebookUrl ?? "",
            youtubeUrl:    s.youtubeUrl ?? "",
            bankName:      s.bankName,
            accountName:   s.accountName,
            accountNumber: s.accountNumber,
            bankBranch:    s.bankBranch,
          });
        }
      } catch { } finally { setLoading(false); }
    }
    load();
  }, []);

  async function handleSave(e: { preventDefault(): void }) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      if (record) {
        await client.models.SiteSettings.update({ id: record.id, ...form });
      } else {
        const res = await client.models.SiteSettings.create(form);
        setRecord(res.data);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) { alert("Error: " + String(err)); }
    finally { setSaving(false); }
  }

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  if (loading) return <div className="p-8 text-gray-400">Loading settings...</div>;

  return (
    <div className="p-8 admin-page-in">
      <div className="flex items-center gap-3 mb-6">
        <Settings size={22} className="text-navy-700" />
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Site Settings</h1>
          <p className="text-gray-500 text-sm mt-0.5">Church contact info, bank details, and social links · synced to footer and give page</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="max-w-2xl space-y-8">

        {/* Church Info */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-navy-700 text-sm uppercase tracking-wide">Church Information</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Church Name *</label>
            <input type="text" value={form.churchName} onChange={set("churchName")} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
            <input type="text" value={form.addressLine1} onChange={set("addressLine1")} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City / Region *</label>
              <input type="text" value={form.city} onChange={set("city")} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
              <input type="text" value={form.country} onChange={set("country")} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input type="text" value={form.phone} onChange={set("phone")} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" value={form.email} onChange={set("email")} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Office Hours *</label>
            <input type="text" value={form.officeHours} onChange={set("officeHours")} required placeholder="e.g. Monday – Friday: 9:00 AM – 4:00 PM" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
          </div>
        </div>

        {/* Bank Details */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-navy-700 text-sm uppercase tracking-wide">Bank Details</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name *</label>
            <input type="text" value={form.bankName} onChange={set("bankName")} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Name *</label>
            <input type="text" value={form.accountName} onChange={set("accountName")} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Number *</label>
              <input type="text" value={form.accountNumber} onChange={set("accountNumber")} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch *</label>
              <input type="text" value={form.bankBranch} onChange={set("bankBranch")} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-navy-700 text-sm uppercase tracking-wide">Social Links</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
            <input type="url" value={form.facebookUrl} onChange={set("facebookUrl")} placeholder="https://facebook.com/..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
            <input type="url" value={form.youtubeUrl} onChange={set("youtubeUrl")} placeholder="https://youtube.com/..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" disabled={saving} className="flex items-center gap-2 bg-navy-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-600 disabled:opacity-50 transition-colors">
            <Save size={15} />
            {saving ? "Saving..." : "Save Settings"}
          </button>
          {saved && <span className="text-green-600 text-sm font-medium">✓ Settings saved</span>}
        </div>
      </form>
    </div>
  );
}
