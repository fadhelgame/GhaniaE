import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Users } from "lucide-react";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      createdAt: true,
      _count: { select: { orders: true } },
    },
  });

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-800">Pengguna</h1>
        <p className="text-stone-500 text-sm">{users.length} pengguna terdaftar</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        {users.length === 0 ? (
          <div className="p-10 text-center">
            <Users size={48} className="text-stone-200 mx-auto mb-3" />
            <p className="text-stone-400">Belum ada pengguna</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase">Pengguna</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase">Role</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase">Pesanan</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase">Daftar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-400 text-xs font-bold">
                          {user.name?.[0]?.toUpperCase() || "?"}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-stone-700">
                          {user.name || "—"}
                        </p>
                        <p className="text-xs text-stone-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        user.role === "ADMIN"
                          ? "bg-rose-100 text-rose-500"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-stone-600">
                      {user._count.orders} pesanan
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs text-stone-400">
                      {formatDate(user.createdAt)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
