"use server"

import { auth } from "@/auth";
import { ContractStates, DecisionStates } from "@/lib/definitions";
import prisma from "@/lib/prisma";
import { ReservationFormSchemaType } from "@/lib/schemas";


export async function createReservation(id: number, data: ReservationFormSchemaType) {
    const session = await auth();
    const newContract = await prisma.contrato.create({
        data: {
            fecha_inicio: new Date(data.startDate),
            fecha_fin: new Date(data.endDate),
            cantidad_horas: Number(data.duration),
            rango_cliente: {
                create: {
                    minimo: data.minimumRange,
                    maximo: data.maximumRange,
                }
            },
            cliente: {
                connect: {
                    cliente_id: Number(session?.user.id),
                },
            },
            estado: {
                connect: {
                    estado_id: ContractStates.PENDING,
                }
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
                        }
                    }
                },
            }
        },
    })
    if (newContract) {
        return {
            error: false,
            message: "Reserva creada correctamente",
        }
    }
    return {
        error: true,
        message: "Error al crear la reserva",
    }
}