import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ContractStates, DecisionStates } from "@/lib/definitions";
import { startOfDay } from "date-fns";

export async function GET() {
  const today = startOfDay(new Date()); // Inicio del día actual (00:00:00)

  // Cambiar de ACCEPTED a ON_GOING
  await prisma.contrato.updateMany({
    where: {
      estado_id: ContractStates.ACCEPTED,
      fecha_inicio: { lte: today },
      decision_cliente: DecisionStates.ACCEPTED,
      decision_proveedor: DecisionStates.ACCEPTED,
    },
    data: { estado_id: ContractStates.ON_GOING },
  });

  // Cambiar de ON_GOING a FINISHED
  await prisma.contrato.updateMany({
    where: {
      estado_id: ContractStates.ON_GOING,
      fecha_fin: { lte: today }, // Cambiar de 'lt' a 'lte'
      decision_cliente: DecisionStates.ACCEPTED,
      decision_proveedor: DecisionStates.ACCEPTED,
    },
    data: { estado_id: ContractStates.FINISHED },
  });

  await prisma.contrato.updateMany({
    where: {
      fecha_fin: { lte: today }, // Usar 'today' en lugar de 'new Date()'
      estado_id: { in: [ContractStates.PENDING, ContractStates.ACCEPTED, ContractStates.ON_GOING] },
      OR: [
        { decision_cliente: { not: DecisionStates.ACCEPTED } },
        { decision_proveedor: { not: DecisionStates.ACCEPTED } },
      ],
    },
    data: { estado_id: ContractStates.REJECTED },
  });
  
  return NextResponse.json({ ok: true });
}