"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    image?: string | null;
    stock: number;
    category?: { name: string } | null;
    reviews?: { rating: number }[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const avgRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
        product.reviews.length
      : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock <= 0) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="bg-white rounded-2xl overflow-hidden border border-[#D8ECEB] hover:border-[#98CEC9] hover:shadow-lg transition-all duration-400">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-[#EFF5F4] overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-700 ${
                hovered ? "scale-105" : "scale-100"
              }`}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#C4E4E0]/50 flex items-center justify-center mb-2">
                <span className="text-2xl opacity-60">✦</span>
              </div>
            </div>
          )}

          {/* Stock badges */}
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
              <span className="bg-[#1A2B2A] text-white text-xs px-4 py-1.5 rounded-full font-medium tracking-wide">
                Sold Out
              </span>
            </div>
          )}

          {product.stock > 0 && product.stock <= 5 && (
            <div className="absolute top-3 left-3">
              <span className="bg-[#E8C4C0] text-[#7A3F3C] text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wide uppercase">
                Low Stock
              </span>
            </div>
          )}

          {/* Hover add button */}
          <div
            className={`absolute bottom-3 right-3 transition-all duration-300 ${
              hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                added
                  ? "bg-[#5BA8A0] text-white scale-110"
                  : "bg-white text-[#5BA8A0] hover:bg-[#5BA8A0] hover:text-white"
              }`}
            >
              {added ? (
                <span className="text-xs font-bold">✓</span>
              ) : (
                <ShoppingBag size={15} />
              )}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          {product.category && (
            <p className="text-[10px] font-semibold text-[#5BA8A0] uppercase tracking-widest mb-1.5">
              {product.category.name}
            </p>
          )}

          <h3
            className="text-[15px] font-medium text-[#1A2B2A] leading-snug mb-2 line-clamp-2"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {product.name}
          </h3>

          {avgRating > 0 && (
            <div className="flex items-center gap-1 mb-2.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={10}
                  className={
                    star <= Math.round(avgRating)
                      ? "fill-[#E8C4C0] text-[#E8C4C0]"
                      : "text-[#D8ECEB]"
                  }
                />
              ))}
              <span className="text-[10px] text-[#8AA8A5] ml-0.5">
                ({product.reviews?.length})
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#1A2B2A]">
              {formatPrice(product.price)}
            </p>
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                product.stock <= 0
                  ? "bg-[#F5E8E8] text-[#B06060]"
                  : product.stock <= 5
                  ? "bg-[#FAF0EE] text-[#9A5A58]"
                  : "bg-[#E4F2F0] text-[#4A9189]"
              }`}
            >
              {product.stock <= 0 ? "Sold out" : `${product.stock} left`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
