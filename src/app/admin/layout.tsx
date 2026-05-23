import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, Tag, Users } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    redirect("/login");
  }

  const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/categories", icon: Tag, label: "Categories" },
    { href: "/admin/orders", icon: ShoppingBag, label: "Orders" },
    { href: "/admin/users", icon: Users, label: "Users" },
  ];

  return (
    <div className="flex h-screen bg-[#F7FAF9] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-[#1A2B2A] flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-5 py-6 border-b border-[#2D4A48]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#5BA8A0] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <div>
              <p
                className="text-sm font-bold text-white leading-none"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                GhaniaSkin
              </p>
              <p className="text-[10px] text-[#4A6663] mt-0.5">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 pt-4 space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#6B8B88] hover:text-white hover:bg-[#2D4A48] transition-all text-sm font-medium group"
            >
              <item.icon size={16} className="flex-shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-[#2D4A48]">
          <div className="flex items-center gap-2.5 px-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-[#5BA8A0]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[#5BA8A0] text-xs font-bold">
                {session.user.name?.[0]?.toUpperCase() || "A"}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate">
                {session.user.name}
              </p>
              <p className="text-[10px] text-[#4A6663]">Administrator</p>
            </div>
          </div>
          <Link
            href="/"
            className="block text-xs text-center text-[#4A6663] hover:text-[#5BA8A0] transition-colors py-1"
          >
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
