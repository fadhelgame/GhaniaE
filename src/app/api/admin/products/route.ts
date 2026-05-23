import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

async function checkAdmin() {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    return null;
  }
  return session;
}

export async function GET() {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: { select: { name: true } } },
  });

  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { name, description, price, stock, categoryId, image, isActive } = body;

    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const slug = slugify(name) + "-" + Date.now();

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: Number(price),
        stock: Number(stock) || 0,
        categoryId,
        image,
        isActive: isActive !== false,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal membuat produk" }, { status: 500 });
  }
}
