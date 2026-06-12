import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPrismaClient = any;

function createPrisma(): AnyPrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");

  const authToken = process.env.TURSO_AUTH_TOKEN;
  const adapter = new PrismaLibSql({ url, authToken });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new (PrismaClient as any)({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: AnyPrismaClient | undefined;
};

export const prisma: InstanceType<typeof PrismaClient> =
  globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
