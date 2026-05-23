"use client";

import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const cartTotal = total();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-[#F7FAF9]">
        <div className="w-20 h-20 rounded-full bg-[#E4F2F0] flex items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-[#98CEC9]" />
        </div>
        <h2
          className="text-2xl font-bold text-[#1A2B2A] mb-2"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Your bag is empty
        </h2>
        <p className="text-[#8AA8A5] text-sm mb-8">
          Discover products that your skin will love
        </p>
        <Link href="/products">
          <Button variant="dark" size="lg">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FAF9]">
      {/* Header */}
      <div className="bg-white border-b border-[#D8ECEB]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10">
          <h1
            className="text-3xl font-bold text-[#1A2B2A]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Shopping Bag
          </h1>
          <p className="text-[#8AA8A5] text-sm mt-1">{items.length} item{items.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#D8ECEB] p-5 flex gap-4"
              >
                <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-[#EFF5F4]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xl text-[#98CEC9]">✦</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className="font-semibold text-[#1A2B2A] text-sm leading-snug mb-1 line-clamp-2"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-[#5BA8A0] font-semibold text-sm mb-3">
                    {formatPrice(item.price)}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-[#F7FAF9] rounded-full p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[#4A6663] hover:bg-white hover:shadow-sm transition-all"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-7 text-center text-sm font-medium text-[#1A2B2A]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))
                        }
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[#4A6663] hover:bg-white hover:shadow-sm transition-all"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[#1A2B2A]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-[#B8D9D7] hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-xs text-[#8AA8A5] hover:text-red-400 transition-colors flex items-center gap-1.5 pt-1"
            >
              <Trash2 size={12} />
              Clear all items
            </button>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-[#D8ECEB] p-6 sticky top-24">
              <h2
                className="text-lg font-bold text-[#1A2B2A] mb-5"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Order Summary
              </h2>

              <div className="space-y-2.5 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[#4A6663] line-clamp-1 flex-1 mr-3">
                      {item.name} ×{item.quantity}
                    </span>
                    <span className="font-medium text-[#1A2B2A] flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#D8ECEB] pt-4 space-y-2 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8AA8A5]">Subtotal</span>
                  <span className="text-[#1A2B2A]">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8AA8A5]">Shipping</span>
                  <span className="text-[#5BA8A0] font-medium">Free</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2.5 border-t border-[#D8ECEB] mt-1">
                  <span className="text-[#1A2B2A]">Total</span>
                  <span className="text-[#5BA8A0]">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button variant="dark" size="lg" className="w-full group">
                  Checkout
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="ghost" size="md" className="w-full mt-2 text-xs">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
