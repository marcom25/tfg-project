"use server";

import prisma from "@/lib/prisma";

export async function getQualifications(userId: number) {
  //Obtiene las califcaciones que da un usuario
  const qualifications = await prisma.puntuacion.findMany({
    where: {
      calificador: {
        usuario_id: userId,
      },
    },
  });

  return qualifications;
}
