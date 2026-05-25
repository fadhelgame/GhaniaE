"use client";

import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2, RefreshCw, MessageSquare } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/messages");
    const data = await res.json();
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markRead = async (id: string, isRead: boolean) => {
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead }),
    });
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead } : m))
    );
    if (selected?.id === id) setSelected((s) => s ? { ...s, isRead } : s);
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Hapus pesan ini?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const openMessage = (msg: Message) => {
    setSelected(msg);
    if (!msg.isRead) markRead(msg.id, true);
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold text-[#5BA8A0] uppercase tracking-widest mb-1">
            Inbox
          </p>
          <h1
            className="text-2xl font-bold text-[#1A2B2A]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Pesan Masuk
            {unreadCount > 0 && (
              <span className="ml-3 text-sm font-bold bg-[#5BA8A0] text-white px-2.5 py-0.5 rounded-full">
                {unreadCount} baru
              </span>
            )}
          </h1>
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 text-sm text-[#4A6663] hover:text-[#5BA8A0] border border-[#D8ECEB] px-4 py-2 rounded-xl transition-colors"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Message List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-[#D8ECEB] overflow-hidden">
            {loading ? (
              <div className="p-6 space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="h-4 bg-[#E4F2F0] rounded w-3/4" />
                    <div className="h-3 bg-[#E4F2F0] rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                <div className="w-14 h-14 rounded-full bg-[#E4F2F0] flex items-center justify-center mb-3">
                  <MessageSquare size={22} className="text-[#5BA8A0]" />
                </div>
                <p className="text-sm text-[#8AA8A5]">Belum ada pesan masuk</p>
              </div>
            ) : (
              <div className="divide-y divide-[#F0F8F7]">
                {messages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => openMessage(msg)}
                    className={`w-full text-left px-4 py-3.5 hover:bg-[#F7FAF9] transition-colors ${
                      selected?.id === msg.id ? "bg-[#E4F2F0]" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        {!msg.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#5BA8A0] flex-shrink-0" />
                        )}
                        <p className={`text-sm ${!msg.isRead ? "font-bold text-[#1A2B2A]" : "font-medium text-[#4A6663]"}`}>
                          {msg.name}
                        </p>
                      </div>
                      <p className="text-[10px] text-[#8AA8A5] flex-shrink-0">{formatDate(msg.createdAt)}</p>
                    </div>
                    <p className={`text-xs truncate ${!msg.isRead ? "text-[#1A2B2A]" : "text-[#8AA8A5]"}`}>
                      {msg.subject}
                    </p>
                    <p className="text-xs text-[#8AA8A5] truncate mt-0.5">{msg.email}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="bg-white rounded-2xl border border-[#D8ECEB] p-6">
              {/* Actions */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#F0F8F7]">
                <div className="flex gap-2">
                  <button
                    onClick={() => markRead(selected.id, !selected.isRead)}
                    className="flex items-center gap-1.5 text-xs text-[#4A6663] hover:text-[#5BA8A0] border border-[#D8ECEB] px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {selected.isRead
                      ? <><Mail size={13} /> Tandai Belum Dibaca</>
                      : <><MailOpen size={13} /> Tandai Dibaca</>
                    }
                  </button>
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="flex items-center gap-1.5 text-xs bg-[#5BA8A0] text-white hover:bg-[#4A9189] px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Mail size={13} /> Balas Email
                  </a>
                </div>
                <button
                  onClick={() => deleteMessage(selected.id)}
                  className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-500 border border-red-100 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Trash2 size={13} /> Hapus
                </button>
              </div>

              {/* Sender info */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#E4F2F0] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#5BA8A0] text-sm font-bold">
                    {selected.name[0]?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1A2B2A]">{selected.name}</p>
                  <p className="text-xs text-[#8AA8A5]">{selected.email}</p>
                </div>
                <p className="text-xs text-[#8AA8A5] ml-auto">{formatDate(selected.createdAt)}</p>
              </div>

              {/* Subject */}
              <h2
                className="text-lg font-bold text-[#1A2B2A] mb-4"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {selected.subject}
              </h2>

              {/* Message body */}
              <div className="bg-[#F7FAF9] rounded-xl p-5">
                <p className="text-sm text-[#4A6663] leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#D8ECEB] flex flex-col items-center justify-center py-24 text-center">
              <div className="w-14 h-14 rounded-full bg-[#E4F2F0] flex items-center justify-center mb-3">
                <Mail size={22} className="text-[#5BA8A0]" />
              </div>
              <p className="text-sm text-[#8AA8A5]">Pilih pesan untuk membaca</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
