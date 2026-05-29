"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { MailOpen, Mail, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const client = generateClient<Schema>();
type ContactSubmission = Schema["ContactSubmission"]["type"];

export default function AdminContact() {
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    try {
      const res = await client.models.ContactSubmission.list();
      setMessages(
        [...res.data].sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      );
    } catch { /* backend not deployed yet */ }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function toggleRead(msg: ContactSubmission) {
    try {
      await client.models.ContactSubmission.update({ id: msg.id, read: !msg.read });
      await load();
    } catch (err) {
      alert("Error: " + String(err));
    }
  }

  async function handleDelete(id: string) {
    try {
      await client.models.ContactSubmission.delete({ id });
      setDeleteId(null);
      await load();
    } catch (err) {
      alert("Error deleting: " + String(err));
    }
  }

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-700">Contact Messages</h1>
        <p className="text-gray-500 text-sm mt-1">
          {messages.length} total · <span className="text-red-600 font-medium">{unread} unread</span>
        </p>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="p-10 text-center text-gray-400 bg-white rounded-xl">Loading...</div>
        ) : messages.length === 0 ? (
          <div className="p-10 text-center text-gray-400 bg-white rounded-xl">No messages yet.</div>
        ) : messages.map((msg) => (
          <div
            key={msg.id}
            className={`bg-white rounded-xl border shadow-sm overflow-hidden ${!msg.read ? "border-gold-400" : "border-gray-100"}`}
          >
            <div
              className="px-5 py-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${!msg.read ? "bg-navy-700 text-gold-400" : "bg-gray-100 text-gray-500"}`}>
                {msg.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-navy-700 text-sm">{msg.name}</p>
                  {!msg.read && (
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-medium">New</span>
                  )}
                </div>
                <p className="text-gray-600 text-sm truncate">{msg.subject}</p>
                <p className="text-gray-400 text-xs">{msg.email}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => { e.stopPropagation(); toggleRead(msg); }}
                  title={msg.read ? "Mark as unread" : "Mark as read"}
                  className="text-gray-400 hover:text-navy-700 transition-colors"
                >
                  {msg.read ? <Mail size={16} /> : <MailOpen size={16} />}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setDeleteId(msg.id); }}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                {expanded === msg.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </div>
            </div>
            {expanded === msg.id && (
              <div className="px-5 pb-5 border-t border-gray-50 pt-4">
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                <p className="text-gray-400 text-xs mt-3">
                  Received: {new Date(msg.createdAt!).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h2 className="font-bold text-navy-700 mb-2">Delete Message?</h2>
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
