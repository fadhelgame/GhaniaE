"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  _count: { products: number };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: "", description: "", image: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const data = await fetch("/api/admin/categories").then((r) => r.json());
    setCategories(data);
    setLoading(false);
  }

  function openAdd() {
    setEditing(null);
    setForm({ name: "", description: "", image: "" });
    setShowModal(true);
  }

  function openEdit(cat: Category) {
    setEditing(cat);
    setForm({
      name: cat.name,
      description: cat.description || "",
      image: cat.image || "",
    });
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = editing
      ? `/api/admin/categories/${editing.id}`
      : "/api/admin/categories";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setShowModal(false);
      fetchCategories();
    } else {
      const err = await res.json();
      alert(err.error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus kategori ini? Semua produk di kategori ini mungkin terpengaruh.")) return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Kategori</h1>
          <p className="text-stone-500 text-sm">{categories.length} kategori</p>
        </div>
        <Button onClick={openAdd}>
          <Plus size={16} className="mr-1.5" /> Tambah Kategori
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-3 text-center py-10 text-stone-400">Memuat...</div>
        ) : (
          categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-stone-100 p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-stone-800">{cat.name}</h3>
                  <p className="text-xs text-stone-400 mt-0.5">/{cat.slug}</p>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => openEdit(cat)}
                    className="p-1.5 text-stone-400 hover:text-rose-400 transition-colors"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 text-stone-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              {cat.description && (
                <p className="text-xs text-stone-500 mb-2 line-clamp-2">
                  {cat.description}
                </p>
              )}
              <span className="text-xs bg-rose-50 text-rose-500 px-2 py-0.5 rounded-full">
                {cat._count.products} produk
              </span>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md">
            <div className="p-6 border-b border-stone-100">
              <h2 className="text-lg font-bold text-stone-800">
                {editing ? "Edit Kategori" : "Tambah Kategori"}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input
                label="Nama Kategori"
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
                  rows={2}
                />
              </div>
              <Input
                label="Emoji / URL Gambar (opsional)"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="💧 atau https://..."
              />
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1">
                  {editing ? "Simpan" : "Tambah"}
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
