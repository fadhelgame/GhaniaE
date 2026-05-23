import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/shop/ProductCard";
import { ChevronRight, ArrowRight } from "lucide-react";

async function getHomeData() {
  const [categories, featuredProducts] = await Promise.all([
    prisma.category.findMany({
      take: 6,
      include: { _count: { select: { products: true } } },
    }),
    prisma.product.findMany({
      where: { isActive: true, stock: { gt: 0 } },
      take: 8,
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { name: true } },
        reviews: { select: { rating: true } },
      },
    }),
  ]);
  return { categories, featuredProducts };
}

const CATEGORY_EMOJI: Record<string, string> = {
  moisturizer: "💧",
  serum: "✦",
  cleanser: "○",
  sunscreen: "◎",
  toner: "◈",
  "eye-cream": "◉",
};

export default async function HomePage() {
  const { categories, featuredProducts } = await getHomeData();

  return (
    <div className="bg-[#F7FAF9]">

      {/* ── HERO ── */}
      <section className="min-h-[88vh] flex items-center px-6 lg:px-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 py-20">

          {/* Left: Text */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-[#E4F2F0] text-[#4A9189] text-xs font-semibold px-4 py-2 rounded-full mb-8 w-fit tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5BA8A0]" />
              Premium Skincare · Indonesia
            </div>

            <h1
              className="text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1A2B2A] leading-[1.1] tracking-tight mb-8"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Skin that{" "}
              <span className="italic text-[#5BA8A0]">glows</span>
              <br />
              from within.
            </h1>

            <p className="text-base text-[#4A6663] leading-relaxed mb-10 max-w-md">
              Formulated with clean, clinically-tested ingredients for every skin type.
              Because radiant skin is not a luxury — it's a ritual.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#1A2B2A] hover:bg-[#5BA8A0] text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300 group"
              >
                Shop Now
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 border border-[#B8D9D7] text-[#4A6663] hover:text-[#1A2B2A] hover:border-[#5BA8A0] px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300"
              >
                Browse Categories
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-14 pt-10 border-t border-[#D8ECEB]">
              {[
                { n: "10+", label: "Products" },
                { n: "6", label: "Categories" },
                { n: "100%", label: "Dermatologist tested" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="text-2xl font-bold text-[#1A2B2A]"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {s.n}
                  </p>
                  <p className="text-xs text-[#8AA8A5] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual card stack */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Background circle */}
              <div className="absolute inset-0 rounded-full bg-[#E4F2F0] opacity-60" />

              {/* Main card */}
              <div className="absolute inset-8 bg-white rounded-3xl shadow-xl border border-[#D8ECEB] flex flex-col items-center justify-center p-8">
                <div className="w-20 h-20 rounded-full bg-[#C4E4E0] flex items-center justify-center mb-4">
                  <span className="text-3xl">✦</span>
                </div>
                <p
                  className="text-xl font-bold text-[#1A2B2A] text-center mb-2"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Clean Beauty
                </p>
                <p className="text-xs text-[#8AA8A5] text-center leading-relaxed">
                  No parabens, no sulfates.<br/>Just what your skin needs.
                </p>
              </div>

              {/* Floating badge top-right */}
              <div className="absolute top-4 right-0 bg-[#5BA8A0] text-white text-xs px-4 py-2 rounded-full font-medium shadow-lg">
                SPF 50+ ☀️
              </div>

              {/* Floating badge bottom-left */}
              <div className="absolute bottom-4 left-0 bg-white border border-[#D8ECEB] text-[#1A2B2A] text-xs px-4 py-2 rounded-full font-medium shadow-md">
                🌿 Vegan Formula
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="border-y border-[#D8ECEB] bg-white py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-3 gap-4 md:flex md:items-center md:justify-between">
            {[
              { icon: "🧪", text: "Dermatologist Tested" },
              { icon: "🌿", text: "Clean Ingredients" },
              { icon: "📦", text: "Free Shipping" },
              { icon: "✦", text: "Cruelty Free" },
              { icon: "🔁", text: "Easy Returns" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2.5 justify-center md:justify-start"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs font-medium text-[#4A6663] hidden sm:block">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      {categories.length > 0 && (
        <section className="py-20 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs font-semibold text-[#5BA8A0] uppercase tracking-widest mb-3">
                  Browse
                </p>
                <h2
                  className="text-4xl font-bold text-[#1A2B2A] leading-tight"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Shop by<br />
                  <span className="italic text-[#5BA8A0]">Category</span>
                </h2>
              </div>
              <Link
                href="/categories"
                className="hidden sm:flex items-center gap-1.5 text-sm text-[#4A6663] hover:text-[#5BA8A0] font-medium transition-colors group"
              >
                View all
                <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="group bg-white rounded-2xl border border-[#D8ECEB] hover:border-[#98CEC9] hover:shadow-md transition-all duration-300 p-5 text-center"
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
                    {cat._count.products} items
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PRODUCTS ── */}
      {featuredProducts.length > 0 && (
        <section className="py-20 px-6 lg:px-10 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs font-semibold text-[#5BA8A0] uppercase tracking-widest mb-3">
                  New Arrivals
                </p>
                <h2
                  className="text-4xl font-bold text-[#1A2B2A] leading-tight"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Featured<br />
                  <span className="italic">Products</span>
                </h2>
              </div>
              <Link
                href="/products"
                className="hidden sm:flex items-center gap-1.5 text-sm text-[#4A6663] hover:text-[#5BA8A0] font-medium transition-colors group"
              >
                See all
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

      {/* ── EDITORIAL BAND ── */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1A2B2A] rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left */}
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <p className="text-[#5BA8A0] text-xs font-semibold uppercase tracking-widest mb-4">
                  The Ritual
                </p>
                <h2
                  className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-5"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Your skin deserves the{" "}
                  <span className="italic text-[#98CEC9]">best.</span>
                </h2>
                <p className="text-[#6B8B88] text-sm leading-relaxed mb-8 max-w-xs">
                  Join thousands of skincare enthusiasts who have transformed their skin with GhaniaSkin.
                  Get 10% off your first order.
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 bg-[#5BA8A0] hover:bg-[#4A9189] text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 w-fit group"
                >
                  Start Your Ritual
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Right: decorative */}
              <div className="hidden lg:flex items-center justify-center p-12 relative">
                <div className="w-52 h-52 rounded-full bg-[#2D4A48] flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-[#3A6460] flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-[#5BA8A0]/30 flex items-center justify-center">
                      <span className="text-4xl">✦</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-8 right-8 bg-[#5BA8A0]/20 rounded-2xl p-4 border border-[#5BA8A0]/30">
                  <p className="text-white text-xs font-medium">New members</p>
                  <p className="text-[#98CEC9] text-lg font-bold" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>10% off</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Empty state */}
      {featuredProducts.length === 0 && categories.length === 0 && (
        <section className="py-32 text-center">
          <div className="w-16 h-16 rounded-full bg-[#E4F2F0] flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">✦</span>
          </div>
          <h2
            className="text-2xl font-bold text-[#1A2B2A] mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Welcome to GhaniaSkin
          </h2>
          <p className="text-[#8AA8A5] text-sm mb-8">Products are being prepared.</p>
          <Link
            href="/admin"
            className="bg-[#5BA8A0] text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-[#4A9189] transition-colors"
          >
            Setup Admin Panel
          </Link>
        </section>
      )}
    </div>
  );
}
