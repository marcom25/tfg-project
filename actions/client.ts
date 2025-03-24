"use server"

import prisma from "@/lib/prisma";

export async function getClientInfoFromUserId(userId: number) {
  const client = await prisma.cliente.findFirstOrThrow({
    where: {
      usuario_id: Number(userId),
    },
    include: {
      usuario: {
        include: {
          direccion: {
            include: {
              ciudad: {
                include: {
                  provincia: true,
                },
              },
            },
          },
        },
      },
      servicios: true,
    },
  });

  return client; // No cambios necesarios aquí porque `findFirstOrThrow` lanza un error si no encuentra resultados.
}