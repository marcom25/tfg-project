"use server";

import { auth } from "@/auth";
import {
  ContractStates,
  DashboardEarnings,
  DecisionStates,
} from "@/lib/definitions";
import prisma from "@/lib/prisma";
import { ReservationFormSchemaType } from "@/lib/schemas";
import { getClientIdFromUserId, getProviderIdFromUserId } from "./users";
import { revalidatePath } from "next/cache";
import {
  eachDayOfInterval,
  isWeekend,
  endOfMonth,
  endOfWeek,
  startOfDay,
  max as dateMax,
  startOfWeek,
} from "date-fns";

export type Contract = Awaited<
  ReturnType<typeof getContractsByProviderId>
>[number];

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
      },
    },
  });
  return contracts;
}

export async function getContractsByProviderId() {
  const session = await auth();

  const providerId = await getProviderIdFromUserId(Number(session?.user.id));

  const contracts = await prisma.contrato.findMany({
    where: {
      proveedor_id: providerId,
    },
    include: {
      cliente: {
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
      },
    },
  });

  return contracts.map((contract) => ({
    ...contract,
    monto_acordado: contract.monto_acordado?.toNumber() ?? null,
  }));
}

export async function calculateEarningnsByProviderId(): Promise<DashboardEarnings> {
  const session = await auth();

  const providerId = await getProviderIdFromUserId(Number(session?.user.id));
  const totalEarnings = await prisma.contrato.aggregate({
    _sum: {
      monto_acordado: true,
    },
    where: {
      proveedor_id: providerId,
      estado: {
        estado_id: ContractStates.FINISHED,
      },
      decision_cliente: DecisionStates.ACCEPTED,
      decision_proveedor: DecisionStates.ACCEPTED,
    },
  });

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const monthlyEarnings = await prisma.contrato.aggregate({
    _sum: {
      monto_acordado: true,
    },
    where: {
      proveedor_id: providerId,
      estado: {
        estado_id: ContractStates.FINISHED,
      },
      decision_cliente: DecisionStates.ACCEPTED,
      decision_proveedor: DecisionStates.ACCEPTED,
      fecha_fin: {
        gte: new Date(`${currentYear}-${currentMonth}-01`),
        lt: new Date(`${currentYear}-${currentMonth + 1}-01`),
      },
    },
  });

  const pendingEarnings = await prisma.contrato.aggregate({
    _sum: {
      monto_acordado: true,
    },
    where: {
      proveedor_id: providerId,
      estado: {
        estado_id: ContractStates.ON_GOING,
      },
      decision_cliente: DecisionStates.ACCEPTED,
      decision_proveedor: DecisionStates.ACCEPTED,
    },
  });

  return {
    total: totalEarnings._sum.monto_acordado || 0,
    monthly: monthlyEarnings._sum.monto_acordado || 0,
    pending: pendingEarnings._sum.monto_acordado || 0,
  };
}

function getLaborDaysBetween(start: Date, end: Date) {
  const days = eachDayOfInterval({ start, end });
  return days.filter((d) => !isWeekend(d)).length;
}

export async function calculateWeeklyHoursByProviderId() {
  const session = await auth();
  const providerId = await getProviderIdFromUserId(Number(session?.user.id));
  const today = startOfDay(new Date());
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 }); // Lunes a domingo
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // 1 = lunes

  // Traer contratos ON_GOING y ACCEPTED (sin límite de fechas)
  const contracts = await prisma.contrato.findMany({
    where: {
      proveedor_id: providerId,
      estado: { estado_id: ContractStates.ON_GOING },
    },
    select: {
      cantidad_horas: true,
      fecha_inicio: true,
      fecha_fin: true,
    },
  });
  

  let total = 0;
  for (const c of contracts) {
    // El inicio real es el mayor entre hoy y la fecha de inicio del contrato
    const start = dateMax([weekStart, startOfDay(new Date(c.fecha_inicio))]);
    const end = startOfDay(new Date(c.fecha_fin)) > weekEnd
      ? weekEnd
      : startOfDay(new Date(c.fecha_fin));
    if (start > end) continue;
    const laborDays = getLaborDaysBetween(start, end);
    total += (c.cantidad_horas || 0) * laborDays;
  }
  return total;
}

export async function calculateMonthlyHoursByProviderId() {
  const session = await auth();
  const providerId = await getProviderIdFromUserId(Number(session?.user.id));
  const today = startOfDay(new Date());
  const monthEnd = endOfMonth(today);

  // Traer contratos ON_GOING y ACCEPTED (sin límite de fechas)
  const contracts = await prisma.contrato.findMany({
    where: {
      proveedor_id: providerId,
      estado: { estado_id: ContractStates.ON_GOING },
    },
    select: {
      cantidad_horas: true,
      fecha_inicio: true,
      fecha_fin: true,
    },
  });

  let total = 0;
  for (const c of contracts) {
    // El inicio real es el mayor entre hoy y la fecha de inicio del contrato
    const start = dateMax([today, startOfDay(new Date(c.fecha_inicio))]);
    const end =
      startOfDay(new Date(c.fecha_fin)) > monthEnd
        ? monthEnd
        : startOfDay(new Date(c.fecha_fin));
    if (start > end) continue;
    const laborDays = getLaborDaysBetween(start, end);
    total += (c.cantidad_horas || 0) * laborDays;
  }
  return total;
}

export async function calculateWeeklyAverageHoursByProviderId() {
  const session = await auth();
  const providerId = await getProviderIdFromUserId(Number(session?.user.id));
  const today = startOfDay(new Date());
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = endOfMonth(today);

  // Traer contratos ON_GOING y ACCEPTED (sin límite de fechas)
  const contracts = await prisma.contrato.findMany({
    where: {
      proveedor_id: providerId,
      estado: { estado_id: ContractStates.ON_GOING },
    },
    select: {
      cantidad_horas: true,
      fecha_inicio: true,
      fecha_fin: true,
    },
  });

  let totalHours = 0;
  for (const c of contracts) {
    // El inicio real es el mayor entre el primer día del mes y la fecha de inicio del contrato
    const start = dateMax([monthStart, startOfDay(new Date(c.fecha_inicio))]);
    const end =
      startOfDay(new Date(c.fecha_fin)) > monthEnd
        ? monthEnd
        : startOfDay(new Date(c.fecha_fin));
    if (start > end) continue;
    const laborDays = getLaborDaysBetween(start, end);
    totalHours += (c.cantidad_horas || 0) * laborDays;
  }

  // Calcular cantidad de semanas completas en el mes actual
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const weeksInMonth = Math.ceil(daysInMonth.length / 7);

  // Promedio semanal
  return weeksInMonth > 0 ? totalHours / weeksInMonth : 0;
}

export async function getContractsByDateRange(date: Date) {
  const session = await auth();
  const providerId = await getProviderIdFromUserId(Number(session?.user.id));
  const contracts = await prisma.contrato.findMany({
    where: {
      proveedor_id: providerId,
      fecha_inicio: {
        lte: date,
      },
      fecha_fin: {
        gte: date,
      },
      estado: {
        estado_id: ContractStates.ON_GOING,
      },
    },
    include: {
      cliente: {
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
      },
      servicio: true,
    },
  });

  return contracts.map((contract) => ({
    ...contract,
    monto_acordado: contract.monto_acordado?.toNumber() ?? null,
  }));
}

export async function getConctractById(contractId: number) {
  const session = await auth();
  let userId;
  if (session?.user.role !== "PROVIDER") {
    userId = await getClientIdFromUserId(Number(session?.user.id));
  } else {
    userId = await getProviderIdFromUserId(Number(session?.user.id));
  }

  const contract = await prisma.contrato.findUnique({
    where: {
      contrato_id: contractId,
      OR: [
        {
          proveedor_id: Number(userId),
        },
        {
          cliente_id: Number(userId),
        },
      ],
    },
    include: {
      cliente: {
        include: {
          usuario: true,
          servicios: true,
        },
      },
      rango_cliente: true,
      proveedor: {
        include: {
          usuario: true,
          servicios: true,
        },
      },
      estado: true,
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
  });

  return contract;
}

export async function updateContractDecisionClient(
  contractId: number,
  decision: DecisionStates
) {
  // Actualizar la decisión del cliente y obtener ambas decisiones y fecha de inicio
  const updated = await prisma.contrato.update({
    where: { contrato_id: contractId },
    data: { decision_cliente: decision },
    select: {
      decision_cliente: true,
      decision_proveedor: true,
      fecha_inicio: true,
    },
  });

  // Si ambas decisiones ya no están en PENDING
  if (
    updated.decision_cliente !== DecisionStates.PENDING &&
    updated.decision_proveedor !== DecisionStates.PENDING
  ) {
    let newState: ContractStates;
    if (
      updated.decision_cliente === DecisionStates.REJECTED ||
      updated.decision_proveedor === DecisionStates.REJECTED
    ) {
      newState = ContractStates.REJECTED;
    } else {
      // Ambas son ACCEPTED, chequear fecha de inicio
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDate = new Date(updated.fecha_inicio);
      startDate.setHours(0, 0, 0, 0);
      newState =
        startDate <= today ? ContractStates.ON_GOING : ContractStates.ACCEPTED;
    }

    await prisma.contrato.update({
      where: { contrato_id: contractId },
      data: { estado_id: newState },
    });
  }

  revalidatePath(`/agreement/${contractId}`);
}

export async function updateContractDecisionProvider(
  contractId: number,
  decision: DecisionStates,
  amount: number
) {
  // Actualizar la decisión del proveedor y el monto, y obtener ambas decisiones y fecha de inicio
  const updated = await prisma.contrato.update({
    where: { contrato_id: contractId },
    data: { decision_proveedor: decision, monto_acordado: amount },
    select: {
      decision_cliente: true,
      decision_proveedor: true,
      fecha_inicio: true,
    },
  });

  // Si ambas decisiones ya no están en PENDING
  if (
    updated.decision_cliente !== DecisionStates.PENDING &&
    updated.decision_proveedor !== DecisionStates.PENDING
  ) {
    let newState: ContractStates;
    if (
      updated.decision_cliente === DecisionStates.REJECTED ||
      updated.decision_proveedor === DecisionStates.REJECTED
    ) {
      newState = ContractStates.REJECTED;
    } else {
      // Ambas son ACCEPTED, chequear fecha de inicio
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const startDate = new Date(updated.fecha_inicio);
      startDate.setHours(0, 0, 0, 0);
      newState =
        startDate <= today ? ContractStates.ON_GOING : ContractStates.ACCEPTED;
    }

    await prisma.contrato.update({
      where: { contrato_id: contractId },
      data: { estado_id: newState },
    });
  }

  revalidatePath(`/agreement/${contractId}`);
}

