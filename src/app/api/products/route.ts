import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");

  const products = await prisma.product.findMany({
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
      category: { select: { name: true, slug: true } },
      reviews: { select: { rating: true } },
    },
  });

  return NextResponse.json(products);
}
