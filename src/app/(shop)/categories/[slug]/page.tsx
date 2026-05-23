import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        where: { isActive: true },
        include: {
          category: { select: { name: true } },
          reviews: { select: { rating: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!category) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-2 text-sm text-stone-400 mb-6">
        <Link href="/" className="hover:text-rose-400">Beranda</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-rose-400">Kategori</Link>
        <span>/</span>
        <span className="text-stone-600">{category.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-800">{category.name}</h1>
        {category.description && (
          <p className="text-stone-500 mt-2">{category.description}</p>
        )}
        <p className="text-stone-400 text-sm mt-1">
          {category.products.length} produk
        </p>
      </div>

      {category.products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🌸</p>
          <p className="text-stone-500">Belum ada produk di kategori ini</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
