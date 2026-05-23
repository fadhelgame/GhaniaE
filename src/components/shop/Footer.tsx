import Link from "next/link";
import { Globe, MessageSquareShare, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A2B2A] text-[#8AA8A5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">

          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-[#5BA8A0] flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <span
                className="text-xl font-semibold text-white tracking-tight"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                GhaniaSkin
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#6B8B88] max-w-xs">
              Premium skincare formulated for radiant, healthy skin. Clean ingredients,
              dermatologist-tested, and made for every skin type.
            </p>
            <div className="flex gap-3 mt-6">
              {[Globe, MessageSquareShare, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-[#2D4A48] flex items-center justify-center text-[#6B8B88] hover:text-white hover:border-[#5BA8A0] transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h5
              className="text-white text-sm font-semibold mb-5 tracking-wide"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Products
            </h5>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/categories/moisturizer", label: "Moisturizer" },
                { href: "/categories/serum", label: "Serum" },
                { href: "/categories/cleanser", label: "Cleanser" },
                { href: "/categories/sunscreen", label: "Sunscreen" },
                { href: "/products", label: "All Products" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[#6B8B88] hover:text-[#5BA8A0] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h5
              className="text-white text-sm font-semibold mb-5 tracking-wide"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Help
            </h5>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/orders", label: "My Orders" },
                { href: "#", label: "Privacy Policy" },
                { href: "#", label: "Terms" },
                { href: "#", label: "Contact Us" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[#6B8B88] hover:text-[#5BA8A0] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2D4A48] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#4A6663]">
            © 2025 GhaniaSkin. All rights reserved.
          </p>
          <p className="text-xs text-[#4A6663]">
            Crafted with care for radiant skin
          </p>
        </div>
      </div>
    </footer>
  );
}
