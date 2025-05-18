import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ContractStates, DecisionStates } from "@/lib/definitions";

export async function GET() {
  // Cambiar de ACCEPTED a ON_GOING
  await prisma.contrato.updateMany({
    where: {
      estado_id: ContractStates.ACCEPTED,
      fecha_inicio: { lte: new Date() },
      decision_cliente: DecisionStates.ACCEPTED,
      decision_proveedor: DecisionStates.ACCEPTED,
    },
    data: { estado_id: ContractStates.ON_GOING },
  });

  // Cambiar de ON_GOING a FINISHED
  await prisma.contrato.updateMany({
    where: {
      estado_id: ContractStates.ON_GOING,
      fecha_fin: { lte: new Date() },
      decision_cliente: DecisionStates.ACCEPTED,
      decision_proveedor: DecisionStates.ACCEPTED,
    },
    data: { estado_id: ContractStates.FINISHED },
  });

  return NextResponse.json({ ok: true });
}