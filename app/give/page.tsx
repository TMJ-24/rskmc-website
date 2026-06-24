"use client";

import { useState } from "react";
import { Landmark, Heart, Building2, Globe, Baby, GraduationCap, Utensils, MapPin, Phone, Mail, Clock, Share2, Video, CheckCircle, LucideIcon } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";

const ICON_MAP: Record<string, LucideIcon> = {
  Heart, Building2, Globe, Baby, GraduationCap, Utensils, Landmark, MapPin, Phone, Mail, Clock,
};

const giving = [
  { id: "1", label: "General Tithe and Offering", icon: "Heart"         },
  { id: "2", label: "Building Fund",               icon: "Building2"    },
  { id: "3", label: "Missions and Outreach",       icon: "Globe"        },
  { id: "4", label: "Children's Ministry",         icon: "Baby"         },
  { id: "5", label: "Youth and Education",         icon: "GraduationCap"},
  { id: "6", label: "Community Food Programme",    icon: "Utensils"     },
];

const bankDetails = [
  { label: "Bank Name",      value: "Bank of the South Pacific (BSP)" },
  { label: "Account Name",   value: "Rev Sione Kami Memorial Church"  },
  { label: "Account Number", value: "XXXX-XXXX-XXXX"                  },
  { label: "Branch",         value: "Port Moresby Main Branch"        },
];

const contactInfo = [
  { Icon: MapPin, title: "Address",      info: "Gabaka Street, Port Moresby, NCD 675, Papua New Guinea" },
  { Icon: Phone,  title: "Phone",        info: "325 5448"                                               },
  { Icon: Mail,   title: "Email",        info: "info@rskmc.org.pg"                                      },
  { Icon: Clock,  title: "Office Hours", info: "Monday – Friday: 9:00 AM – 4:00 PM"                    },
];

export default function Give() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:info@rskmc.org.pg?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-800 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&q=75" alt="" fill className="object-cover opacity-15" priority />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Give & Contact" }]} />
          <p className="eyebrow text-gold-400 mb-4">Generosity &amp; Connection</p>
          <h1 className="h-section text-white mb-4">Give and Contact</h1>
          <p className="body-lg text-blue-200 max-w-2xl">Support the ministry or get in touch with the RSKMC family.</p>
        </div>
      </section>

      {/* Giving Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-gold-600 mb-4">Generosity</p>
          <h2 className="h-section text-navy-700 mb-4">Support Our Ministry</h2>
          <p className="body-lg text-gray-600 mb-12 max-w-3xl">
            Your generous giving enables RSKMC to run programmes, serve the community, and share the
            Gospel. All gifts are used faithfully for the work of God&apos;s Kingdom.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Bank Transfer */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="h-card text-navy-700 mb-5 flex items-center gap-2">
                <Landmark size={20} className="text-gold-600" />
                Bank Transfer
              </h3>
              <div className="space-y-3">
                {bankDetails.map(({ label, value }) => (
                  <div key={label} className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 pb-2 gap-1">
                    <span className="text-gray-500 font-medium text-sm">{label}</span>
                    <span className="text-gray-800 font-semibold text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Giving Categories */}
            <div className="bg-navy-800 text-white rounded-2xl p-8">
              <h3 className="h-card text-gold-400 mb-5">Ways to Give</h3>
              <ul className="space-y-1">
                {giving.map(({ id, icon, label }) => {
                  const Icon = ICON_MAP[icon] ?? Heart;
                  return (
                    <li key={id} className="flex items-center gap-3 text-sm text-blue-100 py-2 border-b border-navy-700">
                      <Icon size={15} className="text-gold-400 shrink-0" />
                      {label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Scripture */}
          <div className="bg-navy-50 border border-navy-100 rounded-2xl p-6">
            <p className="text-navy-700 text-lg font-serif italic mb-2">
              &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly
              or under compulsion, for God loves a cheerful giver.&rdquo;
            </p>
            <p className="text-navy-600 text-sm font-semibold">— 2 Corinthians 9:7</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 border-t border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-gold-600 mb-4">Reach Out</p>
          <h2 className="h-section text-navy-700 mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map(({ Icon, title, info }) => (
                <div key={title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-navy-700 text-gold-400 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={17} />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-700">{title}</p>
                    <p className="text-gray-600 text-sm">{info}</p>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-gray-200">
                <p className="font-semibold text-navy-700 mb-3 text-sm">Follow Us</p>
                <div className="flex gap-3">
                  <a href="#" className="bg-blue-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-800 active:scale-95 transition-all duration-200 flex items-center gap-2">
                    <Share2 size={15} /> Facebook
                  </a>
                  <a href="#" className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-700 active:scale-95 transition-all duration-200 flex items-center gap-2">
                    <Video size={15} /> YouTube
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <CheckCircle size={52} className="text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-navy-700 mb-2">Opening Email Client…</h3>
                <p className="text-gray-600 mb-6">Your default email app should open with your message pre-filled.</p>
                <button onClick={() => setSent(false)} className="text-gold-600 font-semibold hover:underline text-sm">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: "Your Name",      field: "name",    type: "text",  placeholder: "John Smith"            },
                  { label: "Email Address",  field: "email",   type: "email", placeholder: "john@example.com"      },
                  { label: "Subject",        field: "subject", type: "text",  placeholder: "How can we help?"      },
                ].map(({ label, field, type, placeholder }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input
                      type={type}
                      value={form[field as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                      required
                      placeholder={placeholder}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm transition-all duration-200"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    required
                    placeholder="Your message…"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm resize-none transition-all duration-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-navy-700 text-white font-semibold py-3 rounded-xl hover:bg-navy-600 active:scale-95 transition-all duration-200 text-sm"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
