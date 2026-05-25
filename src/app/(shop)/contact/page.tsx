"use client";

import { useState } from "react";
import { MapPin, Mail, Phone, Send, CheckCircle, Clock } from "lucide-react";
import { useT } from "@/hooks/useT";
import { translations } from "@/lib/translations";

const contactsStatic = [
  {
    id: "address",
    icon: MapPin,
    value: "Jalan Kayu Putih Empat Blok B No. 1,\nPulogadung, Jakarta Timur 13260",
    href: "https://maps.google.com/?q=Jalan+Kayu+Putih+Empat+Blok+B+No+1+Pulogadung+Jakarta+Timur",
    color: "bg-[#E4F2F0]",
  },
  {
    id: "email",
    icon: Mail,
    value: "officialghaniah@gmail.com",
    href: "mailto:officialghaniah@gmail.com",
    color: "bg-[#EAF0FA]",
  },
  {
    id: "phone",
    icon: Phone,
    value: "0812-3544-2093",
    href: "https://wa.me/6281235442093",
    color: "bg-[#F0F5EA]",
  },
] as const;

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useT();
  const c = translations.contact;

  const contactLabels: Record<string, string> = {
    address: t(c.address),
    email:   t(c.email),
    phone:   t(c.phone),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSent(true);
    } catch {}
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F7FAF9]">

      {/* ── HERO ── */}
      <section className="relative bg-[#1A2B2A] overflow-hidden">
        {/* decorative rings */}
        <div className="absolute right-0 top-0 w-96 h-96 opacity-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-[#5BA8A0]"
              style={{ width: `${(i+1)*90}px`, height: `${(i+1)*90}px`, top: "50%", right: "10%", transform: "translateY(-50%)" }} />
          ))}
        </div>
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 py-16">
          <div className="max-w-lg">
            <p className="text-xs font-semibold text-[#5BA8A0] uppercase tracking-widest mb-3">
              {t(c.pageLabel)}
            </p>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {t(c.heroTitle1)}{" "}
              <em className="text-[#8ECEC8] not-italic">{t(c.heroTitle2)}</em>
            </h1>
            <p className="text-[#8AA8A5] text-sm leading-relaxed">
              {t(c.heroDesc)}
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── LEFT: Info ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Contact cards */}
            {contactsStatic.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-start gap-4 bg-white rounded-2xl border border-[#D8ECEB] p-5 hover:border-[#5BA8A0] hover:shadow-sm transition-all group"
              >
                <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <item.icon size={18} className="text-[#5BA8A0]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-[#8AA8A5] uppercase tracking-wider mb-1">
                    {contactLabels[item.id]}
                  </p>
                  <p className="text-sm text-[#1A2B2A] font-medium whitespace-pre-line leading-relaxed break-words">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Jam operasional */}
            <div className="bg-white rounded-2xl border border-[#D8ECEB] p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#FFF5E4] flex items-center justify-center">
                  <Clock size={15} className="text-[#C4923A]" />
                </div>
                <p className="text-xs font-bold text-[#1A2B2A] uppercase tracking-wider">
                  {t(c.hoursLabel)}
                </p>
              </div>
              <div className="space-y-2.5">
                {[
                  { day: t(c.monFri),      time: "08.00 – 17.00", open: true },
                  { day: t(c.sat),         time: "08.00 – 14.00", open: true },
                  { day: t(c.sunHoliday), time: t(c.closed),     open: false },
                ].map((row) => (
                  <div key={row.day} className="flex items-center justify-between py-2 border-b border-[#F7FAF9] last:border-0">
                    <span className="text-sm text-[#4A6663]">{row.day}</span>
                    <span className={`text-sm font-semibold ${row.open ? "text-[#1A2B2A]" : "text-red-400"}`}>
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-[#D8ECEB] shadow-sm overflow-hidden">
              {/* Form header */}
              <div className="bg-[#1A2B2A] px-7 py-5">
                <h2
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {t(c.formTitle)}
                </h2>
                <p className="text-[#8AA8A5] text-xs mt-1">{t(c.formDesc)}</p>
              </div>

              <div className="p-7">
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#E4F2F0] flex items-center justify-center mb-4">
                      <CheckCircle size={28} className="text-[#5BA8A0]" />
                    </div>
                    <h3
                      className="text-xl font-bold text-[#1A2B2A] mb-2"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      {t(c.successTitle)}
                    </h3>
                    <p className="text-sm text-[#8AA8A5] max-w-xs">{t(c.successDesc)}</p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                      className="mt-6 text-sm text-[#5BA8A0] hover:underline font-medium"
                    >
                      {t(c.sendAnother)}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#4A6663] uppercase tracking-wider mb-1.5">
                          {t(c.nameFull)}
                        </label>
                        <input type="text" required value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder={t(c.namePH)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#D8ECEB] bg-[#F7FAF9] text-sm text-[#1A2B2A] placeholder-[#C0D8D6] focus:outline-none focus:border-[#5BA8A0] focus:ring-2 focus:ring-[#5BA8A0]/20 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#4A6663] uppercase tracking-wider mb-1.5">
                          {t(c.email)}
                        </label>
                        <input type="email" required value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder={t(c.emailPH)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#D8ECEB] bg-[#F7FAF9] text-sm text-[#1A2B2A] placeholder-[#C0D8D6] focus:outline-none focus:border-[#5BA8A0] focus:ring-2 focus:ring-[#5BA8A0]/20 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A6663] uppercase tracking-wider mb-1.5">
                        {t(c.subject)}
                      </label>
                      <input type="text" required value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder={t(c.subjectPH)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D8ECEB] bg-[#F7FAF9] text-sm text-[#1A2B2A] placeholder-[#C0D8D6] focus:outline-none focus:border-[#5BA8A0] focus:ring-2 focus:ring-[#5BA8A0]/20 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A6663] uppercase tracking-wider mb-1.5">
                        {t(c.message)}
                      </label>
                      <textarea required rows={5} value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={t(c.messagePH)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D8ECEB] bg-[#F7FAF9] text-sm text-[#1A2B2A] placeholder-[#C0D8D6] focus:outline-none focus:border-[#5BA8A0] focus:ring-2 focus:ring-[#5BA8A0]/20 transition resize-none"
                      />
                    </div>

                    <button type="submit" disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-[#1A2B2A] hover:bg-[#5BA8A0] disabled:opacity-50 text-white py-3.5 rounded-xl text-sm font-semibold transition-colors"
                    >
                      {loading
                        ? <span className="animate-pulse">{t(c.sending)}</span>
                        : <><Send size={15} />{t(c.send)}</>
                      }
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
