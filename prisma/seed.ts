import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter } as Parameters<typeof PrismaClient>[0]);

async function main() {
  console.log("🌱 Seeding database...");

  // Cleanup old data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

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
    { name: "Ghaniah Facial Wash", slug: "facial-wash", description: "Sabun wajah lembut untuk berbagai jenis kulit" },
    { name: "Ghaniah Toner", slug: "toner", description: "Toner wajah untuk menyeimbangkan dan merawat kulit" },
    { name: "Ghaniah Day Cream", slug: "day-cream", description: "Day cream dengan perlindungan SPF untuk kulit cerah seharian" },
    { name: "Ghaniah Night Cream", slug: "night-cream", description: "Krim malam untuk regenerasi dan perawatan kulit intensif" },
    { name: "Ghaniah Serum", slug: "serum", description: "Serum wajah dengan kandungan aktif tinggi untuk berbagai masalah kulit" },
    { name: "Ghaniah Essence", slug: "essence", description: "Essence wajah untuk perawatan kulit mendalam" },
  ];

  const createdCategories: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat });
    createdCategories[cat.slug] = created.id;
  }
  console.log("✅ Categories:", categories.length);

  // Products
  const products = [
    // --- FACIAL WASH ---
    {
      name: "Facial Wash Acne",
      slug: "facial-wash-acne",
      description: "Sabun wajah yang membantu membersihkan kulit dan merawat jerawat. Mengurangi minyak berlebih, mencegah timbulnya jerawat baru, dan menenangkan peradangan kulit.",
      price: 75000,
      stock: 50,
      categoryId: createdCategories["facial-wash"],
    },
    {
      name: "Facial Wash Normal",
      slug: "facial-wash-normal",
      description: "Sabun wajah lembut yang membersihkan tanpa membuat kulit kering dan sensitif. Menjaga kelembapan, menenangkan, dan membuat kulit terasa segar.",
      price: 70000,
      stock: 50,
      categoryId: createdCategories["facial-wash"],
    },
    {
      name: "Facial Wash Bright",
      slug: "facial-wash-bright",
      description: "Sabun wajah yang membantu membersihkan dan mencerahkan kulit. Membantu kulit tampak lebih cerah, glowing, dan sehat.",
      price: 75000,
      stock: 45,
      categoryId: createdCategories["facial-wash"],
    },
    {
      name: "Facial Wash AHA",
      slug: "facial-wash-aha",
      description: "Sabun wajah yang membantu mengangkat sel kulit mati secara lembut. Membuat kulit lebih halus, cerah, dan segar.",
      price: 85000,
      stock: 40,
      categoryId: createdCategories["facial-wash"],
    },
    {
      name: "Facial Wash Oily",
      slug: "facial-wash-oily",
      description: "Sabun wajah yang membersihkan dan membantu mengontrol minyak berlebih. Menyegarkan kulit, mencegah pori tersumbat, dan mengurangi kilap berlebih.",
      price: 75000,
      stock: 45,
      categoryId: createdCategories["facial-wash"],
    },

    // --- TONER ---
    {
      name: "Toner Acne",
      slug: "toner-acne",
      description: "Toner wajah yang membantu merawat kulit berjerawat. Mengontrol sebum, mengurangi kemerahan, dan membantu penyembuhan jerawat.",
      price: 85000,
      stock: 40,
      categoryId: createdCategories["toner"],
    },
    {
      name: "Toner Normal Dry",
      slug: "toner-normal-dry",
      description: "Toner wajah yang melembapkan dan menenangkan kulit kering dan sensitif. Memberikan hidrasi, melembutkan, dan menjaga keseimbangan kulit.",
      price: 85000,
      stock: 40,
      categoryId: createdCategories["toner"],
    },
    {
      name: "Toner Bright",
      slug: "toner-bright",
      description: "Toner wajah yang membantu mencerahkan kulit kusam. Membantu kulit tampak cerah, segar, dan sehat.",
      price: 90000,
      stock: 35,
      categoryId: createdCategories["toner"],
    },
    {
      name: "Toner AHA",
      slug: "toner-aha",
      description: "Toner wajah yang membantu mengangkat sel kulit mati. Membuat kulit lebih halus, cerah, dan merata.",
      price: 95000,
      stock: 35,
      categoryId: createdCategories["toner"],
    },
    {
      name: "Toner Oily",
      slug: "toner-oily",
      description: "Toner wajah yang membantu mengontrol minyak berlebih. Menjaga kesegaran kulit, membersihkan pori, dan mengurangi kilap.",
      price: 85000,
      stock: 40,
      categoryId: createdCategories["toner"],
    },

    // --- DAY CREAM ---
    {
      name: "Suncare Normal",
      slug: "suncare-normal",
      description: "Day cream untuk kulit kering dan sensitif serta dilengkapi dengan SPF 30 sebagai perlindungan kulit sehari-hari dari sinar UV. Melindungi kulit dari sinar matahari, melembapkan, dan menenangkan kulit.",
      price: 110000,
      stock: 35,
      categoryId: createdCategories["day-cream"],
    },
    {
      name: "Suncare White",
      slug: "suncare-white",
      description: "Day cream yang membantu melindungi dari sinar UV sekaligus membantu mencerahkan kulit. Melindungi dari sinar UV, membuat kulit tampak cerah, dan merata.",
      price: 115000,
      stock: 35,
      categoryId: createdCategories["day-cream"],
    },
    {
      name: "Suncare Oily Plus",
      slug: "suncare-oily-plus",
      description: "Day cream untuk kulit berminyak dan cenderung berjerawat dengan SPF 30 sebagai perlindungan kulit. Melindungi dari sinar UV, membantu mengontrol minyak, dan menjaga kulit tetap segar.",
      price: 115000,
      stock: 30,
      categoryId: createdCategories["day-cream"],
    },
    {
      name: "Daily Glow",
      slug: "daily-glow",
      description: "Day cream yang memberi efek cerah natural seketika dengan SPF 30 sebagai perlindungan kulit. Membuat kulit tampak glowing alami, ringan, dan nyaman digunakan.",
      price: 120000,
      stock: 30,
      categoryId: createdCategories["day-cream"],
    },

    // --- NIGHT CREAM ---
    {
      name: "Cream AHA",
      slug: "cream-aha",
      description: "Krim malam yang membantu regenerasi kulit dan mencerahkan. Membantu kulit lebih halus, cerah, dan sehat.",
      price: 120000,
      stock: 30,
      categoryId: createdCategories["night-cream"],
    },
    {
      name: "Cream Whitening",
      slug: "cream-whitening",
      description: "Krim wajah untuk membantu mencerahkan dan meratakan warna kulit. Whitening intensif, memperbaiki warna kulit, dan menjaga keremajaan.",
      price: 125000,
      stock: 30,
      categoryId: createdCategories["night-cream"],
    },
    {
      name: "Acne Night Cream",
      slug: "acne-night-cream",
      description: "Krim malam yang diformulasikan khusus untuk kulit berjerawat. Mengurangi jerawat, menenangkan kulit, dan mempercepat regenerasi.",
      price: 120000,
      stock: 35,
      categoryId: createdCategories["night-cream"],
    },

    // --- SERUM ---
    {
      name: "Serum AHA",
      slug: "serum-aha",
      description: "Serum wajah untuk membantu eksfoliasi dan mencerahkan kulit. Membantu kulit lebih halus, cerah, dan lembap.",
      price: 150000,
      stock: 25,
      categoryId: createdCategories["serum"],
    },
    {
      name: "Serum Peptide",
      slug: "serum-peptide",
      description: "Serum wajah untuk perawatan elastisitas dan keremajaan kulit. Menyegarkan kulit, menyamarkan garis halus, dan membuat kulit lebih kencang.",
      price: 165000,
      stock: 25,
      categoryId: createdCategories["serum"],
    },
    {
      name: "Serum Gold Brightening",
      slug: "serum-gold-brightening",
      description: "Serum wajah untuk perawatan intensif kulit kusam agar tampak glowing. Membantu brightening premium, memperbaiki tekstur, dan membuat kulit lebih sehat.",
      price: 185000,
      stock: 20,
      categoryId: createdCategories["serum"],
    },
    {
      name: "Serum Whitening",
      slug: "serum-whitening",
      description: "Serum wajah untuk perawatan whitening dan anti-aging. Membantu mencerahkan, meratakan warna kulit, dan memperlambat penuaan dini.",
      price: 175000,
      stock: 25,
      categoryId: createdCategories["serum"],
    },
    {
      name: "Serum Acne Plus",
      slug: "serum-acne-plus",
      description: "Serum wajah khusus untuk perawatan kulit berjerawat. Mengurangi peradangan jerawat, menenangkan kulit, dan mempercepat pemulihan.",
      price: 155000,
      stock: 30,
      categoryId: createdCategories["serum"],
    },

    // --- ESSENCE ---
    {
      name: "Whitening Essence",
      slug: "whitening-essence",
      description: "Essence wajah untuk membantu mencerahkan kulit secara mendalam. Membantu meratakan warna kulit, mencerahkan, dan menjaga kelembapan.",
      price: 135000,
      stock: 30,
      categoryId: createdCategories["essence"],
    },
    {
      name: "Acne Essence",
      slug: "acne-essence",
      description: "Essence wajah khusus untuk merawat kulit berjerawat. Mengurangi kemerahan, membantu proses regenerasi, dan menenangkan kulit.",
      price: 130000,
      stock: 30,
      categoryId: createdCategories["essence"],
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
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
