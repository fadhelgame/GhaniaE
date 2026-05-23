"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { ShoppingBag, User, Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
  user?: { name?: string | null; email?: string | null; role?: string } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#D8ECEB]"
          : "bg-[#F7FAF9]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-18 py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-[#5BA8A0] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold tracking-wide">G</span>
            </div>
            <span
              className="text-lg font-serif font-semibold text-[#1A2B2A] tracking-tight group-hover:text-[#5BA8A0] transition-colors"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              GhaniaSkin
            </span>
          </Link>

          {/* Desktop Nav — centered */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
                  pathname.startsWith(link.href)
                    ? "text-[#5BA8A0]"
                    : "text-[#4A6663] hover:text-[#1A2B2A]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-[#5BA8A0] transition-all duration-300 ${
                    pathname.startsWith(link.href)
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Link
              href="/search"
              className="p-2.5 text-[#4A6663] hover:text-[#1A2B2A] hover:bg-[#E4F2F0] rounded-full transition-all duration-200"
            >
              <Search size={18} />
            </Link>

            <Link
              href="/cart"
              className="relative p-2.5 text-[#4A6663] hover:text-[#1A2B2A] hover:bg-[#E4F2F0] rounded-full transition-all duration-200"
            >
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#5BA8A0] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold leading-none">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative ml-1">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2.5 pr-3.5 py-2 rounded-full border border-[#D8ECEB] hover:border-[#5BA8A0] text-[#1A2B2A] transition-all duration-200 text-sm font-medium"
                >
                  <div className="w-5 h-5 rounded-full bg-[#C4E4E0] flex items-center justify-center">
                    <span className="text-[#3A7870] text-[10px] font-bold">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="hidden md:block">{user.name?.split(" ")[0]}</span>
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-lg border border-[#D8ECEB] py-2 z-20">
                      {[
                        { href: "/profile", label: "My Profile" },
                        { href: "/orders", label: "My Orders" },
                        ...(user.role === "ADMIN"
                          ? [{ href: "/admin", label: "Admin Panel" }]
                          : []),
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-2.5 text-sm text-[#4A6663] hover:text-[#5BA8A0] hover:bg-[#E4F2F0] transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                      <hr className="my-1.5 border-[#E4F2F0]" />
                      <form action="/api/auth/signout" method="POST">
                        <button
                          type="submit"
                          className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-50 transition-colors"
                        >
                          Sign Out
                        </button>
                      </form>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="ml-1 bg-[#1A2B2A] hover:bg-[#5BA8A0] text-white text-sm px-5 py-2.5 rounded-full font-medium transition-all duration-300 tracking-wide"
              >
                Sign In
              </Link>
            )}

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2.5 text-[#4A6663] ml-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#D8ECEB] py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2.5 px-2 text-sm font-medium text-[#4A6663] hover:text-[#5BA8A0] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
