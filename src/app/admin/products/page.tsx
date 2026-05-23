"use client";

import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  isActive: boolean;
  category?: { name: string } | null;
  image?: string | null;
}

interface Category {
  id: string;
  name: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    image: "",
    isActive: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const [prods, cats] = await Promise.all([
      fetch("/api/admin/products").then((r) => r.json()),
      fetch("/api/admin/categories").then((r) => r.json()),
    ]);
    setProducts(prods);
    setCategories(cats);
    setLoading(false);
  }

  function openAdd() {
    setEditing(null);
    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      categoryId: categories[0]?.id || "",
      image: "",
      isActive: true,
    });
    setShowModal(true);
  }

  function openEdit(product: Product) {
    setEditing(product);
    setForm({
      name: product.name,
      description: "",
      price: String(product.price),
      stock: String(product.stock),
      categoryId: (product as unknown as { categoryId?: string }).categoryId || "",
      image: product.image || "",
      isActive: product.isActive,
    });
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = editing
      ? `/api/admin/products/${editing.id}`
      : "/api/admin/products";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setShowModal(false);
      fetchData();
    } else {
      const err = await res.json();
      alert(err.error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus produk ini?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    fetchData();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Produk</h1>
          <p className="text-stone-500 text-sm">{products.length} produk</p>
        </div>
        <Button onClick={openAdd}>
          <Plus size={16} className="mr-1.5" /> Tambah Produk
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-stone-400">Memuat...</div>
        ) : products.length === 0 ? (
          <div className="p-10 text-center">
            <Package size={48} className="text-stone-200 mx-auto mb-3" />
            <p className="text-stone-400">Belum ada produk</p>
            <Button onClick={openAdd} className="mt-4" size="sm">
              Tambah Produk Pertama
            </Button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  Produk
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  Kategori
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  Harga
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  Stok
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-medium text-stone-800">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-stone-500">
                      {product.category?.name || "-"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-medium">
                      {formatPrice(product.price)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-sm font-medium ${
                        product.stock === 0
                          ? "text-red-500"
                          : product.stock <= 5
                          ? "text-orange-500"
                          : "text-stone-700"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        product.isActive
                          ? "bg-green-100 text-green-600"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {product.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => openEdit(product)}
                        className="p-1.5 text-stone-400 hover:text-rose-400 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1.5 text-stone-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-stone-100">
              <h2 className="text-lg font-bold text-stone-800">
                {editing ? "Edit Produk" : "Tambah Produk"}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input
                label="Nama Produk"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none text-sm"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Harga (Rp)"
                  type="number"
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
                <Input
                  label="Stok"
                  type="number"
                  required
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Kategori
                </label>
                <select
                  required
                  value={form.categoryId}
                  onChange={(e) =>
                    setForm({ ...form, categoryId: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-300 text-sm"
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                label="URL Gambar (opsional)"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                  className="w-4 h-4 accent-rose-400"
                />
                <label htmlFor="isActive" className="text-sm text-stone-600">
                  Produk Aktif
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1">
                  {editing ? "Simpan Perubahan" : "Tambah Produk"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
