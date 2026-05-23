import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { User, Package, MapPin } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id! },
    include: { _count: { select: { orders: true } } },
  });

  if (!user) redirect("/login");

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-stone-800 mb-8">Profil Saya</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-stone-100 p-6 mb-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center">
            <span className="text-rose-400 text-2xl font-bold">
              {user.name?.[0]?.toUpperCase() || "?"}
            </span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-800">{user.name}</h2>
            <p className="text-stone-500 text-sm">{user.email}</p>
            <span className="text-xs bg-rose-50 text-rose-500 px-2 py-0.5 rounded-full font-medium">
              {user.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-stone-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-stone-800">
              {user._count.orders}
            </p>
            <p className="text-xs text-stone-500">Total Pesanan</p>
          </div>
          <div className="bg-stone-50 rounded-xl p-3 text-center">
            <p className="text-sm font-medium text-stone-700">
              {formatDate(user.createdAt)}
            </p>
            <p className="text-xs text-stone-500">Bergabung Sejak</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
        <h3 className="font-semibold text-stone-800">Informasi Akun</h3>
        {[
          { icon: User, label: "Nama", value: user.name || "-" },
          { icon: Package, label: "Email", value: user.email },
          { icon: MapPin, label: "Telepon", value: user.phone || "-" },
          { icon: MapPin, label: "Alamat", value: user.address || "-" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 py-2 border-b border-stone-50 last:border-0"
          >
            <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <item.icon size={15} className="text-rose-400" />
            </div>
            <div>
              <p className="text-xs text-stone-400">{item.label}</p>
              <p className="text-sm text-stone-700">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
