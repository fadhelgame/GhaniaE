import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { formatPrice, formatDate, getStatusColor, getStatusLabel } from "@/lib/utils";
import Link from "next/link";

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?redirect=/orders");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id! },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: { product: { select: { name: true, image: true } } },
      },
    },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-stone-800 mb-8">Pesanan Saya</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📦</p>
          <p className="text-stone-500 mb-4">Belum ada pesanan</p>
          <Link href="/products">
            <button className="bg-rose-400 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-rose-500 transition-colors">
              Mulai Belanja
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-stone-100 p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-stone-400 mb-1">
                    {formatDate(order.createdAt)}
                  </p>
                  <p className="text-sm font-mono text-stone-600">
                    #{order.id.slice(-8).toUpperCase()}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(order.status)}`}
                >
                  {getStatusLabel(order.status)}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-stone-600">
                      {item.product.name} ×{item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-100 pt-3 flex justify-between items-center">
                <div>
                  <p className="text-xs text-stone-400">Alamat</p>
                  <p className="text-sm text-stone-600">{order.shippingAddress}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-stone-400">Total</p>
                  <p className="font-bold text-rose-500">{formatPrice(order.total)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
