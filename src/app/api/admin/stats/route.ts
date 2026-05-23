import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [totalOrders, totalRevenue, totalProducts, totalUsers, recentOrders] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.product.count({ where: { isActive: true } }),
      prisma.user.count({ where: { role: "USER" } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, email: true } } },
      }),
    ]);

  return NextResponse.json({
    totalOrders,
    totalRevenue: totalRevenue._sum.total || 0,
    totalProducts,
    totalUsers,
    recentOrders,
  });
}
