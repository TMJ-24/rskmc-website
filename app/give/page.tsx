"use client";

import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Landmark, Heart, Building2, Globe, Baby, GraduationCap, Utensils, MapPin, Phone, Mail, Clock, Video, Share2, CheckCircle } from "lucide-react";

const client = generateClient<Schema>();

const bankDetails = [
  { label: "Bank Name", value: "Bank of the South Pacific (BSP)" },
  { label: "Account Name", value: "Rev Sione Kami Memorial Church" },
  { label: "Account Number", value: "XXXX-XXXX-XXXX" },
  { label: "Branch", value: "Port Moresby Main Branch" },
];

const givingCategories = [
  { Icon: Heart, label: "General Tithe and Offering" },
  { Icon: Building2, label: "Building Fund" },
  { Icon: Globe, label: "Missions and Outreach" },
  { Icon: Baby, label: "Children's Ministry" },
  { Icon: GraduationCap, label: "Youth and Education" },
  { Icon: Utensils, label: "Community Food Programme" },
];

const contactInfo = [
  { Icon: MapPin, title: "Address", info: "Gabaka Street, Port Moresby, NCD 675, Papua New Guinea" },
  { Icon: Phone, title: "Phone", info: "325 5448" },
  { Icon: Mail, title: "Email", info: "info@rskmc.org.pg" },
  { Icon: Clock, title: "Office Hours", info: "Monday - Friday: 9:00 AM - 4:00 PM" },
];

export default function Give() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await client.models.ContactSubmission.create({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        read: false,
      });
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Failed to send message. Please try again or call us directly.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-700 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Give and Contact</h1>
        <p className="text-blue-200 text-xl max-w-2xl mx-auto">
          Support the ministry or get in touch with the RSKMC family.
        </p>
      </section>

      {/* Giving Section */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-navy-700 mb-4">Support Our Ministry</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Your generous giving enables RSKMC to run programmes, serve the community, and share the
            Gospel. All gifts are used faithfully for the work of God&apos;s Kingdom.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Bank Transfer */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-navy-700 mb-5 flex items-center gap-2">
              <Landmark size={20} className="text-gold-600" />
              Bank Transfer
            </h3>
            <div className="space-y-3">
              {bankDetails.map(({ label, value }) => (
                <div key={label} className="flex justify-between border-b border-gray-200 pb-2 text-sm">
                  <span className="text-gray-500 font-medium">{label}</span>
                  <span className="text-gray-800 font-semibold text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Giving Categories */}
          <div className="bg-navy-700 text-white rounded-xl p-8">
            <h3 className="text-xl font-bold text-gold-400 mb-5">Ways to Give</h3>
            <ul className="space-y-1">
              {givingCategories.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-blue-100 py-2 border-b border-navy-600">
                  <Icon size={15} className="text-gold-400 shrink-0" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Scripture */}
        <div className="bg-gold-50 border border-gold-200 rounded-xl p-6 text-center">
          <p className="text-gold-800 text-lg font-semibold italic">
            &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly
            or under compulsion, for God loves a cheerful giver.&rdquo;
          </p>
          <p className="text-gold-600 text-sm mt-2 font-semibold">— 2 Corinthians 9:7</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 border-t border-gray-200 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-700 mb-12 text-center">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map(({ Icon, title, info }) => (
                <div key={title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-navy-700 text-gold-400 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={17} />
                  </div>
                  <div>
                    <p className="font-bold text-navy-700">{title}</p>
                    <p className="text-gray-600">{info}</p>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-gray-200">
                <p className="font-bold text-navy-700 mb-3">Follow Us</p>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="bg-blue-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2"
                  >
                    <Share2 size={15} />
                    Facebook
                  </a>
                  <a
                    href="#"
                    className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <Video size={15} />
                    YouTube
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <CheckCircle size={52} className="text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-navy-700 mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">Thank you for reaching out. We will get back to you soon.</p>
                <button
                  onClick={() => setSent(false)}
                  className="text-gold-600 font-semibold hover:underline text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                    placeholder="John Smith"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    required
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    required
                    placeholder="Your message..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm resize-none"
                  />
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-navy-700 text-white font-bold py-3 rounded-lg hover:bg-navy-600 transition-colors disabled:opacity-50"
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
