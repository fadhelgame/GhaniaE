"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight, ChevronLeft } from "lucide-react";
import { useT } from "@/hooks/useT";
import { translations } from "@/lib/translations";
import ProductCard from "@/components/shop/ProductCard";
import { useRef } from "react";

interface Category {
  id: string; name: string; slug: string; image?: string | null;
  _count: { products: number };
}
interface Product {
  id: string; name: string; slug: string; price: number; stock: number;
  image?: string | null;
  category?: { name: string } | null;
  reviews?: { rating: number }[];
}
interface Props { categories: Category[]; featuredProducts: Product[]; }

const CATEGORY_EMOJI: Record<string, string> = {
  "facial-wash": "🫧", toner: "💧", "day-cream": "☀️",
  "night-cream": "🌙", serum: "✦", essence: "✿",
};

export default function HomeContent({ categories, featuredProducts }: Props) {
  const { t } = useT();
  const h = translations.home;
  const catScrollRef = useRef<HTMLDivElement>(null);

  const scrollCat = (dir: "left" | "right") => {
    const el = catScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  };

  return (
    <div className="bg-[#F7FAF9]">

      {/* HERO */}
      <section className="min-h-[88vh] flex items-center px-6 lg:px-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 py-20">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-[#E4F2F0] text-[#4A9189] text-xs font-semibold px-4 py-2 rounded-full mb-8 w-fit tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5BA8A0]" />
              {t(h.badge)}
            </div>
            <h1
              className="text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1A2B2A] leading-[1.1] tracking-tight mb-8"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {t(h.heroTitle1)}{" "}
              <span className="italic text-[#5BA8A0]">{t(h.heroGlows)}</span>
              <br />
              {t(h.heroTitle2)}
            </h1>
            <p className="text-base text-[#4A6663] leading-relaxed mb-10 max-w-md">
              {t(h.heroDesc)}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products"
                className="inline-flex items-center gap-2 bg-[#1A2B2A] hover:bg-[#5BA8A0] text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300 group">
                {t(h.shopNow)}
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/categories"
                className="inline-flex items-center gap-2 border border-[#B8D9D7] text-[#4A6663] hover:text-[#1A2B2A] hover:border-[#5BA8A0] px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300">
                {t(h.browseCategories)}
              </Link>
            </div>
            <div className="flex gap-8 mt-14 pt-10 border-t border-[#D8ECEB]">
              {[
                { n: "24+", label: t(h.statsProducts) },
                { n: "6",   label: t(h.statsCategories) },
                { n: "100%",label: t(h.statsTested) },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-[#1A2B2A]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                    {s.n}
                  </p>
                  <p className="text-xs text-[#8AA8A5] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-full bg-[#E4F2F0] opacity-60" />
              <div className="absolute inset-4 rounded-3xl overflow-hidden shadow-xl">
                <Image src="/hero img.jpg" alt="Ghaniah Skincare" fill className="object-cover" priority />
              </div>
              <div className="absolute top-4 right-0 bg-[#5BA8A0] text-white text-xs px-4 py-2 rounded-full font-medium shadow-lg">
                SPF 50+ ☀️
              </div>
              <div className="absolute bottom-4 left-0 bg-white border border-[#D8ECEB] text-[#1A2B2A] text-xs px-4 py-2 rounded-full font-medium shadow-md">
                🌿 Cantik Sehat Alami
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-[#D8ECEB] bg-white py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-3 gap-4 md:flex md:items-center md:justify-between">
            {[
              { icon: "🧪", text: t(h.trust1) },
              { icon: "🌿", text: t(h.trust2) },
              { icon: "📦", text: t(h.trust3) },
              { icon: "✦",  text: t(h.trust4) },
              { icon: "🔁", text: t(h.trust5) },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2.5 justify-center md:justify-start">
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs font-medium text-[#4A6663] hidden sm:block">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      {categories.length > 0 && (
        <section className="py-20 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs font-semibold text-[#5BA8A0] uppercase tracking-widest mb-3">
                  {t(h.browseSub)}
                </p>
                <h2
                  className="text-4xl font-bold text-[#1A2B2A] leading-tight"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {t(h.shopByCat1)}<br />
                  <span className="italic text-[#5BA8A0]">{t(h.shopByCat2)}</span>
                </h2>
              </div>
              <Link href="/categories"
                className="hidden sm:flex items-center gap-1.5 text-sm text-[#4A6663] hover:text-[#5BA8A0] font-medium transition-colors group">
                {t(h.viewAll)}
                <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            {/* Carousel wrapper */}
            <div className="relative group/carousel">
              {/* Left arrow */}
              <button
                onClick={() => scrollCat("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-[#D8ECEB] shadow-md flex items-center justify-center text-[#4A6663] hover:text-[#5BA8A0] hover:border-[#5BA8A0] transition-all opacity-0 group-hover/carousel:opacity-100 duration-200"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Scroll track */}
              <div
                ref={catScrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth pb-2 no-scrollbar"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="group flex-shrink-0 bg-white rounded-2xl border border-[#D8ECEB] hover:border-[#98CEC9] hover:shadow-md transition-all duration-300 p-5 text-center"
                    style={{ scrollSnapAlign: "start", width: "clamp(140px, 18vw, 200px)" }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#E4F2F0] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#C4E4E0] group-hover:scale-110 transition-all duration-300">
                      <span className="text-xl text-[#5BA8A0]">
                        {cat.image || CATEGORY_EMOJI[cat.slug] || "✦"}
                      </span>
                    </div>
                    <p
                      className="text-sm font-semibold text-[#1A2B2A] group-hover:text-[#5BA8A0] transition-colors mb-0.5"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      {cat.name}
                    </p>
                    <p className="text-[10px] text-[#8AA8A5]">
                      {cat._count.products} {t(h.items)}
                    </p>
                  </Link>
                ))}
              </div>

              {/* Right arrow */}
              <button
                onClick={() => scrollCat("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-[#D8ECEB] shadow-md flex items-center justify-center text-[#4A6663] hover:text-[#5BA8A0] hover:border-[#5BA8A0] transition-all opacity-0 group-hover/carousel:opacity-100 duration-200"
              >
                <ChevronRight size={18} />
              </button>
            </div>

          </div>
        </section>
      )}

      {/* PRODUCTS */}
      {featuredProducts.length > 0 && (
        <section className="py-20 px-6 lg:px-10 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs font-semibold text-[#5BA8A0] uppercase tracking-widest mb-3">
                  {t(h.newArrivalsSub)}
                </p>
                <h2
                  className="text-4xl font-bold text-[#1A2B2A] leading-tight"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {t(h.featured1)}<br />
                  <span className="italic">{t(h.featured2)}</span>
                </h2>
              </div>
              <Link href="/products"
                className="hidden sm:flex items-center gap-1.5 text-sm text-[#4A6663] hover:text-[#5BA8A0] font-medium transition-colors group">
                {t(h.seeAll)}
                <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EDITORIAL BAND */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1A2B2A] rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <p className="text-[#5BA8A0] text-xs font-semibold uppercase tracking-widest mb-4">
                  {t(h.ritualSub)}
                </p>
                <h2
                  className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-5"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {t(h.ritualTitle).replace(" best.", "")}
                  {" "}<span className="italic text-[#98CEC9]">
                    {t(h.ritualTitle).endsWith("best.") ? "best." : "terbaik."}
                  </span>
                </h2>
                <p className="text-[#6B8B88] text-sm leading-relaxed mb-8 max-w-xs">
                  {t(h.ritualDesc)}
                </p>
                <Link href="/register"
                  className="inline-flex items-center gap-2 bg-[#5BA8A0] hover:bg-[#4A9189] text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 w-fit group">
                  {t(h.startRitual)}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="hidden lg:flex items-center justify-center p-12 relative">
                <div className="w-52 h-52 rounded-full bg-[#2D4A48] flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-[#3A6460] flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-[#5BA8A0]/30 flex items-center justify-center">
                      <span className="text-4xl">✦</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-8 right-8 bg-[#5BA8A0]/20 rounded-2xl p-4 border border-[#5BA8A0]/30">
                  <p className="text-white text-xs font-medium">{t(h.newMembers)}</p>
                  <p className="text-[#98CEC9] text-lg font-bold" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                    {t(h.discount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
