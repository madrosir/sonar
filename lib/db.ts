import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

try {
  console.log("Initializing PrismaClient...");
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
    console.log("PrismaClient initialized in production mode");
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
      console.log("PrismaClient initialized in development mode");
    }
    prisma = global.prisma;
  }
} catch (error) {
  console.error("Failed to initialize PrismaClient:", error);
  throw error;
}

export const db = prisma;