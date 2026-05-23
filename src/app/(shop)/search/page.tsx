import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/shop/ProductCard";
import { Search } from "lucide-react";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  const products = q
    ? await prisma.product.findMany({
        where: {
          isActive: true,
          OR: [
            { name: { contains: q } },
            { description: { contains: q } },
          ],
        },
        include: {
          category: { select: { name: true } },
          reviews: { select: { rating: true } },
        },
      })
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <form>
          <div className="relative max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              name="q"
              defaultValue={q}
              placeholder="Cari produk skincare..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-stone-200 bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
              autoFocus
            />
          </div>
        </form>
      </div>

      {q && (
        <p className="text-stone-500 text-sm mb-6">
          {products.length > 0
            ? `${products.length} hasil untuk "${q}"`
            : `Tidak ada hasil untuk "${q}"`}
        </p>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : q ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-stone-500">Coba kata kunci lain</p>
        </div>
      ) : null}
    </div>
  );
}
