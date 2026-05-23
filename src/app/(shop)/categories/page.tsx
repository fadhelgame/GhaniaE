import { prisma } from "@/lib/prisma";
import Link from "next/link";

function getCategoryEmoji(slug: string): string {
  const map: Record<string, string> = {
    moisturizer: "💧",
    serum: "✨",
    cleanser: "🫧",
    sunscreen: "☀️",
    toner: "🌊",
    mask: "🎭",
    "eye-cream": "👁️",
    "body-lotion": "🧴",
    default: "🌸",
  };
  return map[slug] || map.default;
}

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { products: { where: { isActive: true } } } },
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-800">Semua Kategori</h1>
        <p className="text-stone-500 mt-1">{categories.length} kategori produk</p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📦</p>
          <p className="text-stone-500">Belum ada kategori</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group bg-white rounded-2xl border border-stone-100 hover:border-rose-200 hover:shadow-md transition-all p-6 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-rose-50 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                <span className="text-4xl">
                  {cat.image || getCategoryEmoji(cat.slug)}
                </span>
              </div>
              <h3 className="font-semibold text-stone-800 group-hover:text-rose-500 transition-colors mb-1">
                {cat.name}
              </h3>
              {cat.description && (
                <p className="text-xs text-stone-400 line-clamp-2 mb-2">
                  {cat.description}
                </p>
              )}
              <span className="text-xs text-stone-400">
                {cat._count.products} produk
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
