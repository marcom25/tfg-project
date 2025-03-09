"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { CommentFormSchemaType } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { getUserIdFromClientId, getUserIdFromProviderId } from "./users";

export async function submitCommentForProvider(
  data: CommentFormSchemaType,
  providerId: number
) {
  const session = await auth();
  const userId = Number(session?.user.id || 0);

//   const validContract = await prisma.contrato.findFirst({
//     where: {
//       OR: [
//         {
//           cliente: { usuario_id: userId },
//           proveedor: { usuario_id: providerId },
//           fecha_fin: { lte: new Date() },
//         },
//         {
//           proveedor: { usuario_id: userId },
//           cliente: { usuario_id: providerId },
//           fecha_fin: { lte: new Date() },
//         },
//       ],
//     },
//   });

//   if (!validContract) {
//     throw new Error("Debes tener un contrato finalizado para comentar");
//   }

  const userProviderId = await getUserIdFromProviderId(providerId);
  await prisma.comentario.create({
    data: {
      comentario: data.comment,
      comentado: {
        connect: {
          usuario_id: userProviderId,
        },
      },
      comentador: {
        connect: {
          usuario_id: userId,
        },
      },
      puntuacion: {
        create: {
          puntuacion: data.rating,
          calificado: {
            connect: {
              usuario_id: userProviderId,
            },
          },
          calificador: {
            connect: {
              usuario_id: userId,
            },
          },
        }
      }
    },
  });

  revalidatePath(`/providers/${providerId}`);
}

export async function checkCommentPermission(
  clientOrProviderId: number,
  type: "provider" | "client"
) {
  const session = await auth();

  if (!session?.user?.id) {
    return { allowed: false, error: "Usuario no autenticado" };
  }

  try {
    // Obtener el usuario_id según el tipo
    let targetUserId: number | undefined | null;
    const sessionUserId: number = Number(session.user.id);

    if (type === "provider") {
      // Si el tipo es "provider", el ID recibido es un proveedor_id
      targetUserId = await getUserIdFromProviderId(clientOrProviderId);
    } else {
      // Si el tipo es "client", el ID recibido es un cliente_id
      targetUserId = await getUserIdFromClientId(clientOrProviderId);
    }

    // Configurar las condiciones dinámicas
    const whereClause = {
      OR: [
        // Caso 1: El usuario de sesión es el CLIENTE y el target es el PROVEEDOR
        type === "provider"
          ? {
              cliente: { usuario_id: sessionUserId },
              proveedor: { usuario_id: targetUserId ? targetUserId : 0 },
              fecha_fin: { lte: new Date() },
            }
          : // Caso 2: El usuario de sesión es el PROVEEDOR y el target es el CLIENTE
            {
              proveedor: { usuario_id: sessionUserId },
              cliente: { usuario_id: targetUserId ? targetUserId : 0 },
              fecha_fin: { lte: new Date() },
            },
      ],
    };

    const validContract = await prisma.contrato.findFirst({
      where: whereClause,
    });

    return { allowed: !!validContract, error: null };
  } catch (error) {
    console.error("Error verificando permiso:", error);
    return { allowed: false, error: "Error al verificar permisos" };
  }
}
