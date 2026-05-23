import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter } as Parameters<typeof PrismaClient>[0]);

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@ghaniaskin.com" },
    update: {},
    create: {
      name: "Admin GhaniaSkin",
      email: "admin@ghaniaskin.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user:", admin.email);

  // Categories
  const categories = [
    { name: "Moisturizer", slug: "moisturizer", description: "Pelembab kulit untuk menjaga hidrasi", image: "💧" },
    { name: "Serum", slug: "serum", description: "Serum dengan kandungan aktif tinggi", image: "✨" },
    { name: "Cleanser", slug: "cleanser", description: "Pembersih wajah lembut dan efektif", image: "🫧" },
    { name: "Sunscreen", slug: "sunscreen", description: "Perlindungan dari sinar UV", image: "☀️" },
    { name: "Toner", slug: "toner", description: "Penyeimbang pH dan hidrasi kulit", image: "🌊" },
    { name: "Eye Cream", slug: "eye-cream", description: "Perawatan khusus area mata", image: "👁️" },
  ];

  const createdCategories: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    createdCategories[cat.slug] = created.id;
  }
  console.log("✅ Categories:", categories.length);

  // Products
  const products = [
    {
      name: "Hydra Glow Moisturizer",
      slug: "hydra-glow-moisturizer",
      description: "Pelembab ringan dengan kandungan hyaluronic acid dan aloe vera yang memberikan hidrasi intensif 24 jam.",
      price: 185000,
      stock: 50,
      categoryId: createdCategories["moisturizer"],
    },
    {
      name: "Barrier Repair Cream",
      slug: "barrier-repair-cream",
      description: "Krim pelembab untuk memperkuat skin barrier dengan ceramide dan niacinamide.",
      price: 245000,
      stock: 35,
      categoryId: createdCategories["moisturizer"],
    },
    {
      name: "Vitamin C Brightening Serum",
      slug: "vitamin-c-brightening-serum",
      description: "Serum vitamin C 15% untuk mencerahkan kulit kusam dan meratakan warna kulit.",
      price: 320000,
      stock: 25,
      categoryId: createdCategories["serum"],
    },
    {
      name: "Retinol Night Serum",
      slug: "retinol-night-serum",
      description: "Serum retinol 0.5% untuk mengurangi kerutan dan memperbaiki tekstur kulit.",
      price: 285000,
      stock: 20,
      categoryId: createdCategories["serum"],
    },
    {
      name: "Gentle Foam Cleanser",
      slug: "gentle-foam-cleanser",
      description: "Sabun wajah berbusa lembut yang membersihkan tanpa menghilangkan kelembaban.",
      price: 125000,
      stock: 60,
      categoryId: createdCategories["cleanser"],
    },
    {
      name: "Micellar Cleansing Water",
      slug: "micellar-cleansing-water",
      description: "Air micellar untuk membersihkan makeup dan kotoran tanpa perlu dibilas.",
      price: 145000,
      stock: 45,
      categoryId: createdCategories["cleanser"],
    },
    {
      name: "Daily UV Shield SPF 50+",
      slug: "daily-uv-shield-spf50",
      description: "Sunscreen ringan SPF 50+ PA++++ yang tidak meninggalkan white cast.",
      price: 210000,
      stock: 40,
      categoryId: createdCategories["sunscreen"],
    },
    {
      name: "AHA BHA Exfoliating Toner",
      slug: "aha-bha-exfoliating-toner",
      description: "Toner eksfoliasi dengan kandungan AHA dan BHA untuk kulit lebih halus dan cerah.",
      price: 195000,
      stock: 30,
      categoryId: createdCategories["toner"],
    },
    {
      name: "Hydrating Rose Toner",
      slug: "hydrating-rose-toner",
      description: "Toner berbasis air mawar untuk melembabkan dan menyegarkan kulit.",
      price: 155000,
      stock: 5,
      categoryId: createdCategories["toner"],
    },
    {
      name: "Peptide Eye Cream",
      slug: "peptide-eye-cream",
      description: "Krim mata dengan peptide dan caffeine untuk mengurangi puffiness dan dark circle.",
      price: 275000,
      stock: 0,
      categoryId: createdCategories["eye-cream"],
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }
  console.log("✅ Products:", products.length);

  console.log("\n🎉 Seeding selesai!");
  console.log("📧 Admin login: admin@ghaniaskin.com");
  console.log("🔑 Password: admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
