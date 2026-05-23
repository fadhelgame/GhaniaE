"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const cartTotal = total();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.id,
            quantity: i.quantity,
            price: i.price,
          })),
          shippingName: form.name,
          shippingPhone: form.phone,
          shippingAddress: `${form.address}, ${form.city} ${form.postalCode}`,
          notes: form.notes,
          total: cartTotal,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          router.push("/login?redirect=/checkout");
          return;
        }
        throw new Error(data.error || "Terjadi kesalahan");
      }

      // Load Midtrans snap
      if (data.snapToken) {
        const snap = (window as unknown as { snap: { pay: (token: string, options: Record<string, unknown>) => void } }).snap;
        snap.pay(data.snapToken, {
          onSuccess: () => {
            clearCart();
            router.push(`/orders?success=true&orderId=${data.orderId}`);
          },
          onPending: () => {
            clearCart();
            router.push(`/orders?pending=true&orderId=${data.orderId}`);
          },
          onError: () => {
            alert("Pembayaran gagal. Silakan coba lagi.");
          },
          onClose: () => {
            router.push(`/orders`);
          },
        });
      } else {
        clearCart();
        router.push(`/orders?success=true&orderId=${data.orderId}`);
      }
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        async
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-stone-800 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-stone-100 p-6">
                <h2 className="text-lg font-bold text-stone-800 mb-5">
                  Informasi Pengiriman
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Nama Lengkap"
                    required
                    placeholder="Masukkan nama lengkap"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />
                  <Input
                    label="Nomor Telepon"
                    required
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Alamat Lengkap
                    </label>
                    <textarea
                      required
                      placeholder="Jalan, nomor rumah, kelurahan, kecamatan..."
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Kota"
                      required
                      placeholder="Jakarta"
                      value={form.city}
                      onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                      }
                    />
                    <Input
                      label="Kode Pos"
                      required
                      placeholder="12345"
                      value={form.postalCode}
                      onChange={(e) =>
                        setForm({ ...form, postalCode: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Catatan (opsional)
                    </label>
                    <textarea
                      placeholder="Catatan untuk penjual..."
                      value={form.notes}
                      onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-white rounded-2xl border border-stone-100 p-6">
                <h2 className="text-lg font-bold text-stone-800 mb-3">
                  Metode Pembayaran
                </h2>
                <div className="bg-rose-50 border border-rose-100 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-400 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg">💳</span>
                    </div>
                    <div>
                      <p className="font-medium text-stone-800 text-sm">
                        Midtrans Payment Gateway
                      </p>
                      <p className="text-xs text-stone-500">
                        Transfer Bank, GoPay, OVO, DANA, Kartu Kredit & lebih
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-2xl border border-stone-100 p-6 sticky top-20">
                <h2 className="text-lg font-bold text-stone-800 mb-5">
                  Pesananmu
                </h2>

                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-stone-500 line-clamp-1 flex-1 mr-2">
                        {item.name} ×{item.quantity}
                      </span>
                      <span className="font-medium flex-shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-100 pt-4 space-y-2 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Pengiriman</span>
                    <span className="text-green-500">Gratis</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-stone-100">
                    <span>Total</span>
                    <span className="text-rose-500">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  loading={loading}
                >
                  Bayar Sekarang
                </Button>

                <p className="text-xs text-stone-400 text-center mt-3">
                  Pembayaran aman dengan enkripsi SSL
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
