"use server";

import prisma from "@/lib/prisma";

export async function getProviders() {
  const providers = await prisma.proveedor.findMany({
    include: {
      usuario: {
        include: {
          direccion: {
            include: {
              ciudad: true
            }
          },
          calificados: true
        }
      },
      servicios: true
    },
    where: {
      usuario: {
        nombre: {
          not: null,
        },
        apellido: {
          not: null,
        },
        direccion: {
          isNot: null,
        },
      },
    }
  });

  return providers;
}

