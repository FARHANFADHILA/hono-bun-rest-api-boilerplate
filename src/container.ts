import { container } from "tsyringe";
import { prisma } from "./config/prisma-instance";

// daftarkan instance prisma kita dengan nama kunci "PrismaClient"
// useValue artinya: "Kalau ada yang minta PrismaClient, kasih dia variabel 'prisma' yang sudah kita buat"
container.register("PrismaClient", { useValue: prisma });

export { container };
