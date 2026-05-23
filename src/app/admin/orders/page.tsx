"use client";

import { useState, useEffect } from "react";
import { formatPrice, formatDate, getStatusColor, getStatusLabel } from "@/lib/utils";

interface Order {
  id: string;
  status: string;
  total: number;
  shippingName: string;
  shippingAddress: string;
  createdAt: string;
  user: { name?: string | null; email: string };
  items: { id: string; quantity: number; price: number; product: { name: string } }[];
}

const STATUS_OPTIONS = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const data = await fetch("/api/admin/orders").then((r) => r.json());
    setOrders(data);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
    if (selected?.id === id) {
      setSelected({ ...selected, status });
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-800">Pesanan</h1>
        <p className="text-stone-500 text-sm">{orders.length} total pesanan</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-stone-400">Memuat...</div>
        ) : orders.length === 0 ? (
          <div className="p-10 text-center text-stone-400">Belum ada pesanan</div>
        ) : (
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase">ID</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase">Pelanggan</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase">Total</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase">Tanggal</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-mono text-stone-500">
                      #{order.id.slice(-8).toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-stone-700">
                      {order.user.name}
                    </p>
                    <p className="text-xs text-stone-400">{order.user.email}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-bold">
                      {formatPrice(order.total)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded-full border-0 font-medium cursor-pointer focus:outline-none ${getStatusColor(order.status)}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {getStatusLabel(s)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs text-stone-400">
                      {formatDate(order.createdAt)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => setSelected(order)}
                      className="text-xs text-rose-400 hover:underline"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-stone-100 flex justify-between">
              <div>
                <h2 className="text-lg font-bold text-stone-800">Detail Pesanan</h2>
                <p className="text-xs font-mono text-stone-400">
                  #{selected.id.slice(-8).toUpperCase()}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-medium text-stone-400 uppercase mb-1">Pelanggan</p>
                <p className="text-sm font-medium">{selected.user.name}</p>
                <p className="text-xs text-stone-500">{selected.user.email}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-stone-400 uppercase mb-1">Pengiriman ke</p>
                <p className="text-sm">{selected.shippingName}</p>
                <p className="text-xs text-stone-500">{selected.shippingAddress}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-stone-400 uppercase mb-2">Item</p>
                <div className="space-y-2">
                  {selected.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.product.name} ×{item.quantity}</span>
                      <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-rose-500">{formatPrice(selected.total)}</span>
              </div>
              <div>
                <p className="text-xs font-medium text-stone-400 uppercase mb-1">Update Status</p>
                <select
                  value={selected.status}
                  onChange={(e) => updateStatus(selected.id, e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{getStatusLabel(s)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
