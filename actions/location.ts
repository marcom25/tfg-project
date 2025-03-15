"use server";
import prisma from "@/lib/prisma";

export async function getProvinces() {
  return await prisma.provincia.findMany({
    orderBy: { nombre: "asc" },
    include: {
      ciudades: true,
    },
  });
}
