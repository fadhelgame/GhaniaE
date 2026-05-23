"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, ArrowLeft, Star, ShoppingBag } from "lucide-react";
import Button from "@/components/ui/Button";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  image?: string | null;
  description?: string | null;
  category?: { name: string; slug: string } | null;
  reviews?: {
    rating: number;
    comment?: string | null;
    user: { name?: string | null };
    createdAt: string;
  }[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    fetch(`/api/products/${params.slug}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7FAF9]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="aspect-square bg-[#E4F2F0] rounded-3xl" />
            <div className="space-y-4">
              <div className="h-4 bg-[#E4F2F0] rounded w-24" />
              <div className="h-9 bg-[#E4F2F0] rounded w-3/4" />
              <div className="h-6 bg-[#E4F2F0] rounded w-32" />
              <div className="h-24 bg-[#E4F2F0] rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F7FAF9] flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#E4F2F0] flex items-center justify-center mb-4">
          <span className="text-2xl text-[#5BA8A0]">✦</span>
        </div>
        <h1
          className="text-2xl font-bold text-[#1A2B2A] mb-2"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Product not found
        </h1>
        <Link href="/products" className="text-[#5BA8A0] hover:underline text-sm">
          Back to Products
        </Link>
      </div>
    );
  }

  const avgRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F7FAF9]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#8AA8A5] mb-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 hover:text-[#5BA8A0] transition-colors"
          >
            <ArrowLeft size={13} />
            Back
          </button>
          <span>/</span>
          <Link href="/products" className="hover:text-[#5BA8A0]">Products</Link>
          {product.category && (
            <>
              <span>/</span>
              <Link href={`/categories/${product.category.slug}`} className="hover:text-[#5BA8A0]">
                {product.category.name}
              </Link>
            </>
          )}
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="aspect-square relative bg-[#EFF5F4] rounded-3xl overflow-hidden">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-[#C4E4E0]/50 flex items-center justify-center">
                  <span className="text-4xl text-[#5BA8A0]/60">✦</span>
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            {product.category && (
              <Link
                href={`/categories/${product.category.slug}`}
                className="text-xs font-semibold text-[#5BA8A0] uppercase tracking-widest hover:text-[#4A9189] mb-4 block"
              >
                {product.category.name}
              </Link>
            )}

            <h1
              className="text-3xl lg:text-4xl font-bold text-[#1A2B2A] leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {product.name}
            </h1>

            {avgRating > 0 && (
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={13}
                      className={
                        star <= Math.round(avgRating)
                          ? "fill-[#E8C4C0] text-[#E8C4C0]"
                          : "text-[#D8ECEB]"
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-[#8AA8A5]">
                  {avgRating.toFixed(1)} · {product.reviews?.length} reviews
                </span>
              </div>
            )}

            <p
              className="text-3xl font-bold text-[#1A2B2A] mb-5"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {formatPrice(product.price)}
            </p>

            {product.description && (
              <p className="text-sm text-[#4A6663] leading-relaxed mb-6">
                {product.description}
              </p>
            )}

            {/* Stock indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className={`w-2 h-2 rounded-full ${
                  product.stock <= 0
                    ? "bg-red-400"
                    : product.stock <= 5
                    ? "bg-[#E8C4C0]"
                    : "bg-[#5BA8A0]"
                }`}
              />
              <span className="text-sm text-[#4A6663]">
                {product.stock <= 0
                  ? "Out of stock"
                  : product.stock <= 5
                  ? `Only ${product.stock} left`
                  : `In stock (${product.stock} available)`}
              </span>
            </div>

            {/* Quantity picker */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4 mb-7">
                <span className="text-xs font-medium text-[#4A6663] uppercase tracking-wider">
                  Qty
                </span>
                <div className="flex items-center gap-2 bg-[#F7FAF9] rounded-full border border-[#D8ECEB] p-1">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#4A6663] hover:bg-white hover:shadow-sm transition-all"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-[#1A2B2A]">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#4A6663] hover:bg-white hover:shadow-sm transition-all"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <ShoppingBag size={15} className="mr-2" />
                {added ? "✓ Added!" : product.stock <= 0 ? "Sold Out" : "Add to Bag"}
              </Button>
              <Button
                variant="dark"
                size="lg"
                onClick={() => {
                  handleAddToCart();
                  router.push("/cart");
                }}
                disabled={product.stock <= 0}
                className="flex-1"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#D8ECEB]">
            <h2
              className="text-2xl font-bold text-[#1A2B2A] mb-8"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Customer Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.reviews.map((review, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-[#D8ECEB] p-5"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-[#E4F2F0] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#5BA8A0] text-xs font-bold">
                        {review.user.name?.[0] || "?"}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A2B2A]">
                        {review.user.name || "Customer"}
                      </p>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={10}
                            className={
                              star <= review.rating
                                ? "fill-[#E8C4C0] text-[#E8C4C0]"
                                : "text-[#D8ECEB]"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-sm text-[#4A6663] leading-relaxed">
                      {review.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
