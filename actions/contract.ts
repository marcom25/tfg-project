"use server";

import { auth } from "@/auth";
import { ContractStates, DecisionStates } from "@/lib/definitions";
import prisma from "@/lib/prisma";
import { ReservationFormSchemaType } from "@/lib/schemas";
import { getClientIdFromUserId } from "./users";

export async function createReservation(
  id: number,
  data: ReservationFormSchemaType
) {
  const session = await auth();

  const clientId = await getClientIdFromUserId(Number(session?.user.id));
  const newContract = await prisma.contrato.create({
    data: {
      fecha_inicio: new Date(data.startDate),
      fecha_fin: new Date(data.endDate),
      cantidad_horas: Number(data.duration),
      rango_cliente: {
        create: {
          minimo: data.minimumRange,
          maximo: data.maximumRange,
        },
      },
      cliente: {
        connect: {
          cliente_id: clientId,
        },
      },
      estado: {
        connect: {
          estado_id: ContractStates.PENDING,
        },
      },
      decision_cliente: DecisionStates.PENDING,
      decision_proveedor: DecisionStates.PENDING,
      proveedor: {
        connect: {
          proveedor_id: id,
        },
      },
      detalles: data.requirements,
      direccion: {
        create: {
          calle: data.street,
          numero: data.streetNumber.toString(),
          ciudad: {
            connect: {
              ciudad_id: Number(data.cityId),
            },
          },
        },
      },
    },
  });
  if (newContract) {
    return {
      error: false,
      message: "Reserva creada correctamente",
    };
  }
  return {
    error: true,
    message: "Error al crear la reserva",
  };
}


export async function getContractsByClientId() {
  const session = await auth();

  const clientId = await getClientIdFromUserId(Number(session?.user.id));
  const contracts = await prisma.contrato.findMany({
    where: {
      cliente_id: clientId,
    },
    include: {
      proveedor: {
        include: {
          usuario: true,
          servicios: true,
        },
      },
      estado: true,
      direccion: {
        include: {
          ciudad: true,
        },
      }
    },
  });
  return contracts;
}
