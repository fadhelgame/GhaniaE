"use client";

import Link from "next/link";
import { MapPin, Phone, ShoppingBag, Store, ExternalLink, MessageCircle } from "lucide-react";
import { useT } from "@/hooks/useT";
import { translations } from "@/lib/translations";

const distributors = [
  {
    no: 1,
    nama: "Distributor Ghaniah Lampung",
    pic: "Herlina",
    alamat: "Jl. Untung Suropati No. 12, Labuhan Ratu, Kec. Kedaton, Kota Bandar Lampung 35132",
    telepon: "085279922639",
    maps: "https://maps.app.goo.gl/r2PrqZ1vhhYVJVrN6",
    marketplace: [{ label: "Shopee", url: "https://id.shp.ee/DR2TThz" }],
    isPusat: false,
  },
  {
    no: 2,
    nama: "Distributor Ghaniah Jambi",
    pic: "Melati",
    alamat: "Jl. Yunus Sanis Lorong Andalas, Ruko No. 80, Kec. Jelutung, Kel. Handil, Kota Jambi",
    telepon: "085366792224",
    maps: "https://share.google.com/KLhBg1U1x8pgtQnzaDJ",
    marketplace: [
      { label: "Shopee", url: "https://id.shp.ee/mAEZZ1x" },
      { label: "TikTok Shop", url: "https://vt.tiktok.com/ZS5xg" },
    ],
    isPusat: false,
  },
  {
    no: 3,
    nama: "Distributor Ghaniah Jawa Timur",
    pic: "Rizqi Nur Fitriana",
    alamat: "Jl. Inspeksi Gilang RT 01/RW 03, Kec. Ngunut, Kab. Tulungagung, Jawa Timur",
    telepon: "085607787857",
    maps: "https://maps.app.goo.gl/Yi2yCLqCQdNQcFue9",
    marketplace: [{ label: "Shopee", url: "https://s.shopee.co.id/10sUVgWzWT" }],
    isPusat: false,
  },
  {
    no: 4,
    nama: "Distributor Ghaniah Majalengka",
    pic: "Tuti Sutini",
    alamat: "Jl. Bojong, Rajagaluh, Kec. Rajagaluh, Kabupaten Majalengka, Jawa Barat 45472",
    telepon: "08978642590",
    maps: "https://share.google.com/1xqrbbSlV9yYBp0fK",
    marketplace: [{ label: "Shopee", url: "https://id.shp.ee/XgzoXuy" }],
    isPusat: false,
  },
  {
    no: 5,
    nama: "Distributor Ghaniah Bandung / Cimahi",
    pic: "Yuniarti Yohana",
    alamat: "Komplek Melong Green Garden, Jl. Dacota III No. 2, Kec. Cimahi Selatan, Kota Cimahi",
    telepon: "087825251285",
    maps: "https://share.google.com/lY7yhKngEqMc1uv9f",
    marketplace: [{ label: "Shopee", url: "https://id.shp.ee/ZgqU6bc" }],
    isPusat: false,
  },
];

const pusat = {
  nama: "Ghaniah Pusat — Jakarta",
  alamat: "Jl. Kayu Putih Empat Blok B No. 1, Kel/Kec. Pulogadung, Jakarta Timur 13260",
  telepon: "081235442093",
  maps: "https://share.google.com/XJL3GeB7SzulJm7JY",
  marketplace: [{ label: "Shopee Official", url: "https://shopee.co.id/ghaniahofficial" }],
};

export default function TemukanKamiPage() {
  const { t } = useT();
  const f = translations.findUs;

  return (
    <div className="min-h-screen bg-[#F7FAF9]">

      {/* ── HERO ── */}
      <section className="relative bg-[#1A2B2A] overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute right-0 top-0 w-96 h-96 opacity-5 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-[#5BA8A0]"
              style={{
                width: `${(i + 1) * 90}px`,
                height: `${(i + 1) * 90}px`,
                top: "50%",
                right: "10%",
                transform: "translateY(-50%)",
              }}
            />
          ))}
        </div>
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 py-16">
          <div className="max-w-lg">
            <p className="text-xs font-semibold text-[#5BA8A0] uppercase tracking-widest mb-3">
              {t(f.pageLabel)}
            </p>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {t(f.heroTitle1)}{" "}
              <em className="text-[#8ECEC8] not-italic">{t(f.heroTitle2)}</em>
            </h1>
            <p className="text-[#8AA8A5] text-sm leading-relaxed">
              {t(f.heroDesc)}
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10 pb-16">

        {/* ── PUSAT CARD (featured) ── */}
        <div className="bg-white rounded-2xl border border-[#5BA8A0] ring-1 ring-[#5BA8A0]/20 shadow-sm overflow-hidden mb-8">
          <div className="bg-[#1A2B2A] px-6 py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#5BA8A0] flex items-center justify-center flex-shrink-0">
              <Store size={14} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#5BA8A0] uppercase tracking-widest">
                {t(f.pusat)}
              </p>
              <p
                className="text-sm font-bold text-white leading-snug"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {pusat.nama}
              </p>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[#5BA8A0] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#4A6663] leading-relaxed">{pusat.alamat}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#5BA8A0] flex-shrink-0" />
                <a
                  href={`https://wa.me/62${pusat.telepon.replace(/^0/, "")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[#1A2B2A] font-medium hover:text-[#5BA8A0] transition-colors"
                >
                  {pusat.telepon}
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:items-end justify-center">
              <a
                href={pusat.maps}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm bg-[#5BA8A0] hover:bg-[#4A9189] text-white px-4 py-2.5 rounded-xl font-medium transition-colors w-full sm:w-auto justify-center"
              >
                <MapPin size={14} />
                {t(f.maps)}
              </a>
              {pusat.marketplace.map((mp) => (
                <a
                  key={mp.label}
                  href={mp.url}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm bg-[#F7FAF9] border border-[#D8ECEB] hover:border-[#5BA8A0] text-[#4A6663] hover:text-[#5BA8A0] px-4 py-2.5 rounded-xl font-medium transition-colors w-full sm:w-auto justify-center"
                >
                  <ShoppingBag size={14} />
                  {mp.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── SECTION TITLE ── */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-[#5BA8A0] uppercase tracking-widest mb-1.5">
            {t(f.distSub)}
          </p>
          <h2
            className="text-2xl font-bold text-[#1A2B2A]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {t(f.distTitle)}
          </h2>
        </div>

        {/* ── DISTRIBUTOR GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {distributors.map((d) => (
            <div
              key={d.no}
              className="bg-white rounded-2xl border border-[#D8ECEB] hover:border-[#5BA8A0] hover:shadow-sm transition-all p-5"
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#E4F2F0] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#5BA8A0] text-xs font-bold">{d.no}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#1A2B2A] leading-snug">{d.nama}</h3>
                  {d.pic && (
                    <p className="text-xs text-[#8AA8A5] mt-0.5">{t(f.pic)}: {d.pic}</p>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2.5 mb-4">
                <div className="flex items-start gap-2.5">
                  <MapPin size={12} className="text-[#5BA8A0] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[#4A6663] leading-relaxed">{d.alamat}</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <MessageCircle size={12} className="text-[#5BA8A0] flex-shrink-0" />
                  <a
                    href={`https://wa.me/62${d.telepon.replace(/^0/, "").replace(/-/g, "")}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-xs text-[#1A2B2A] font-medium hover:text-[#5BA8A0] transition-colors"
                  >
                    {d.telepon}
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-[#F0F8F7]">
                {d.maps && (
                  <a
                    href={d.maps}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs bg-[#E4F2F0] text-[#5BA8A0] hover:bg-[#5BA8A0] hover:text-white px-3 py-1.5 rounded-full font-medium transition-colors"
                  >
                    <MapPin size={11} />
                    {t(f.maps)}
                  </a>
                )}
                {d.marketplace.map((mp) => (
                  <a
                    key={mp.label}
                    href={mp.url}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs bg-[#F7FAF9] border border-[#D8ECEB] text-[#4A6663] hover:border-[#5BA8A0] hover:text-[#5BA8A0] px-3 py-1.5 rounded-full font-medium transition-colors"
                  >
                    <ExternalLink size={11} />
                    {mp.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── TRUST BAR ── */}
        <div className="bg-white rounded-2xl border border-[#D8ECEB] p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Store,       label: t(f.trust1), sub: t(f.trust1Sub) },
              { icon: ShoppingBag, label: t(f.trust2), sub: t(f.trust2Sub) },
              { icon: Phone,       label: t(f.trust3), sub: t(f.trust3Sub) },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-[#E4F2F0] flex items-center justify-center mb-1">
                  <item.icon size={16} className="text-[#5BA8A0]" />
                </div>
                <p className="text-sm font-bold text-[#1A2B2A]">{item.label}</p>
                <p className="text-xs text-[#8AA8A5]">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA JOIN ── */}
        <div className="bg-[#1A2B2A] rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-[#5BA8A0]"
                style={{
                  width: `${(i + 1) * 120}px`,
                  height: `${(i + 1) * 120}px`,
                  bottom: "-30%",
                  left: "-5%",
                }}
              />
            ))}
          </div>
          <div className="relative">
            <p className="text-xs font-semibold text-[#5BA8A0] uppercase tracking-widest mb-3">
              {t(f.joinSub)}
            </p>
            <h3
              className="text-xl lg:text-2xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {t(f.joinTitle)}
            </h3>
            <p className="text-[#8AA8A5] text-sm mb-6 max-w-md mx-auto leading-relaxed">
              {t(f.joinDesc)}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#5BA8A0] hover:bg-[#4A9189] text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors"
            >
              {t(f.contactUs)}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
