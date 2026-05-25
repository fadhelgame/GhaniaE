import { prisma } from "@/lib/prisma";
import HomeContent from "@/components/shop/HomeContent";

async function getHomeData() {
  const [categories, featuredProducts] = await Promise.all([
    prisma.category.findMany({
      take: 6,
      include: {
        _count: { select: { products: true } },
        products: {
          where: { image: { not: null }, isActive: true },
          take: 1,
          select: { image: true },
        },
      },
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

export default async function HomePage() {
  const { categories, featuredProducts } = await getHomeData();
  return <HomeContent categories={categories} featuredProducts={featuredProducts} />;
}
