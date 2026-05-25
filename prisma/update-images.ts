import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter } as Parameters<typeof PrismaClient>[0]);

const imageMap: Record<string, string> = {
  "facial-wash-acne":      "/products/GHANIAH FACIAL WASH ACNE.png",
  "facial-wash-normal":    "/products/GHANIAH FACIAL WASH NORMAL.png",
  "facial-wash-bright":    "/products/GHANIAH FACIAL WASH BRIGHT.png",
  "facial-wash-aha":       "/products/GHANIAH FACIAL WASH AHA.png",
  "facial-wash-oily":      "/products/GHANIAH FACIAL WASH OILY.png",
  "toner-acne":            "/products/GHANIAH TONER ACNE.png",
  "toner-normal-dry":      "/products/GHANIAH TONER NORMAL.png",
  "toner-bright":          "/products/GHANIAH TONER BRIGHT.png",
  "toner-aha":             "/products/GHANIAH TONER AHA.png",
  "toner-oily":            "/products/GHANIAH TONER OILY.png",
  "suncare-normal":        "/products/GHANIAH SUNCARE NORMAL.png",
  "suncare-white":         "/products/GHANIAH SUNCARE WHITE.png",
  "suncare-oily-plus":     "/products/GHANIAH SUNCARE OILY PLUS.png",
  "daily-glow":            "/products/GHANIAH DAILY GLOW.png",
  "cream-aha":             "/products/GHANIAH CREAM AHA.png",
  "cream-whitening":       "/products/GHANIAH CREAM WHITENING.png",
  "acne-night-cream":      "/products/GHANIAH ACNE NIGHT CREAM.png",
  "serum-aha":             "/products/GHANIAH SERUM AHA 1.png",
  "serum-peptide":         "/products/GHANIAH SERUM PEPTIDE.png",
  "serum-gold-brightening":"/products/GHANIAH SERUM GOLD BRIGHTENUNG.png",
  "serum-whitening":       "/products/GHANIAH SERUM WHITENING.png",
  "serum-acne-plus":       "/products/GHANIAH SERUM ACNE PLUS.png",
  "whitening-essence":     "/products/GHANIAH WHITENING ESSENCE.png",
  "acne-essence":          "/products/GHANIAH ACNE ESSENCE.png",
};

async function main() {
  console.log("🖼️  Updating product images...");
  for (const [slug, image] of Object.entries(imageMap)) {
    await prisma.product.update({
      where: { slug },
      data: { image },
    });
    console.log(`✅ ${slug}`);
  }
  console.log("\n🎉 Semua foto berhasil dipasang!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
