import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate, getStatusColor, getStatusLabel } from "@/lib/utils";
import { Package, ShoppingBag, Users, TrendingUp } from "lucide-react";

async function getStats() {
  const [totalOrders, revenueAgg, totalProducts, totalUsers, recentOrders, lowStock] =
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
      prisma.product.findMany({
        where: { isActive: true, stock: { lte: 5 } },
        orderBy: { stock: "asc" },
        take: 5,
      }),
    ]);

  return {
    totalOrders,
    totalRevenue: revenueAgg._sum.total || 0,
    totalProducts,
    totalUsers,
    recentOrders,
    lowStock,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    {
      label: "Total Orders",
      value: stats.totalOrders.toString(),
      icon: ShoppingBag,
      bg: "bg-[#E4F2F0]",
      iconColor: "text-[#5BA8A0]",
    },
    {
      label: "Revenue",
      value: formatPrice(stats.totalRevenue),
      icon: TrendingUp,
      bg: "bg-[#EAF2EA]",
      iconColor: "text-[#5A9A5A]",
    },
    {
      label: "Products",
      value: stats.totalProducts.toString(),
      icon: Package,
      bg: "bg-[#FAF0EE]",
      iconColor: "text-[#9A7070]",
    },
    {
      label: "Customers",
      value: stats.totalUsers.toString(),
      icon: Users,
      bg: "bg-[#F0EEF8]",
      iconColor: "text-[#7A70A0]",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-xs font-semibold text-[#5BA8A0] uppercase tracking-widest mb-1">
          Overview
        </p>
        <h1
          className="text-2xl font-bold text-[#1A2B2A]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Dashboard
        </h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl border border-[#D8ECEB] p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-[#8AA8A5] font-medium uppercase tracking-wide">
                {card.label}
              </p>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${card.bg}`}>
                <card.icon size={15} className={card.iconColor} />
              </div>
            </div>
            <p
              className="text-2xl font-bold text-[#1A2B2A]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-[#D8ECEB] p-5">
          <h2
            className="text-base font-bold text-[#1A2B2A] mb-5"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Recent Orders
          </h2>
          {stats.recentOrders.length === 0 ? (
            <p className="text-[#8AA8A5] text-sm text-center py-8">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {stats.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-2.5 border-b border-[#F0F8F7] last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-[#1A2B2A]">
                      {order.user.name}
                    </p>
                    <p className="text-xs text-[#8AA8A5]">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#1A2B2A]">
                      {formatPrice(order.total)}
                    </p>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getStatusColor(order.status)}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-2xl border border-[#D8ECEB] p-5">
          <h2
            className="text-base font-bold text-[#1A2B2A] mb-5"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Low Stock Alert
          </h2>
          {stats.lowStock.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-2xl mb-2 block">✦</span>
              <p className="text-[#8AA8A5] text-sm">All stock levels are healthy</p>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.lowStock.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between py-2.5 border-b border-[#F0F8F7] last:border-0"
                >
                  <p className="text-sm font-medium text-[#1A2B2A] line-clamp-1 flex-1 mr-3">
                    {product.name}
                  </p>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${
                      product.stock === 0
                        ? "bg-red-50 text-red-500"
                        : "bg-[#FAF0EE] text-[#9A7070]"
                    }`}
                  >
                    {product.stock === 0 ? "Out of stock" : `${product.stock} left`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
