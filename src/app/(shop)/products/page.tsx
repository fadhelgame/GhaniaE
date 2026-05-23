import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/shop/ProductCard";

interface Props {
  searchParams: Promise<{ category?: string; sort?: string; search?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const { category, sort, search } = params;

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: {
        isActive: true,
        ...(category ? { category: { slug: category } } : {}),
        ...(search ? { name: { contains: search } } : {}),
      },
      orderBy:
        sort === "price-asc"
          ? { price: "asc" }
          : sort === "price-desc"
          ? { price: "desc" }
          : { createdAt: "desc" },
      include: {
        category: { select: { name: true } },
        reviews: { select: { rating: true } },
      },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="min-h-screen bg-[#F7FAF9]">
      {/* Header */}
      <div className="bg-white border-b border-[#D8ECEB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          <p className="text-xs font-semibold text-[#5BA8A0] uppercase tracking-widest mb-3">
            Collection
          </p>
          <h1
            className="text-4xl font-bold text-[#1A2B2A]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            All Products
          </h1>
          <p className="text-[#8AA8A5] text-sm mt-2">
            {products.length} products available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-[#D8ECEB] p-5 sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-[#4A6663] uppercase tracking-wider mb-2.5">
                  Search
                </p>
                <form>
                  <input
                    name="search"
                    defaultValue={search}
                    placeholder="Product name..."
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#D8ECEB] bg-[#F7FAF9] text-[#1A2B2A] placeholder-[#8AA8A5] focus:outline-none focus:ring-2 focus:ring-[#5BA8A0]/30 focus:border-[#5BA8A0] transition-all"
                  />
                  {category && (
                    <input type="hidden" name="category" value={category} />
                  )}
                </form>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-[#4A6663] uppercase tracking-wider mb-2.5">
                  Category
                </p>
                <div className="space-y-1">
                  <a
                    href="/products"
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      !category
                        ? "bg-[#E4F2F0] text-[#5BA8A0] font-medium"
                        : "text-[#4A6663] hover:bg-[#F0F8F7]"
                    }`}
                  >
                    All Categories
                  </a>
                  {categories.map((cat) => (
                    <a
                      key={cat.id}
                      href={`/products?category=${cat.slug}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        category === cat.slug
                          ? "bg-[#E4F2F0] text-[#5BA8A0] font-medium"
                          : "text-[#4A6663] hover:bg-[#F0F8F7]"
                      }`}
                    >
                      {cat.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <p className="text-xs font-semibold text-[#4A6663] uppercase tracking-wider mb-2.5">
                  Sort By
                </p>
                <div className="space-y-1">
                  {[
                    { value: "", label: "Latest" },
                    { value: "price-asc", label: "Price: Low to High" },
                    { value: "price-desc", label: "Price: High to Low" },
                  ].map((option) => (
                    <a
                      key={option.value}
                      href={`/products?${category ? `category=${category}&` : ""}sort=${option.value}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        sort === option.value || (!sort && option.value === "")
                          ? "bg-[#E4F2F0] text-[#5BA8A0] font-medium"
                          : "text-[#4A6663] hover:bg-[#F0F8F7]"
                      }`}
                    >
                      {option.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-16 h-16 rounded-full bg-[#E4F2F0] flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-[#5BA8A0]">✦</span>
                </div>
                <p className="text-[#8AA8A5] text-sm">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
