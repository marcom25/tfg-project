"use server";
import prisma from "@/lib/prisma";

export async function getUserIdFromProviderId(providerId: number) {
  const provider = await prisma.proveedor.findFirst({
    where: {
      proveedor_id: providerId,
    },
  });

  return provider?.usuario_id;
}

export async function getUserIdFromClientId(clientId: number) {
  const client = await prisma.cliente.findFirst({
    where: {
      cliente_id: clientId,
    },
  });

  return client?.usuario_id;
}

export async function getClientIdFromUserId(userId: number) {
  const client = await prisma.cliente.findFirst({
    where: {
      usuario_id: userId,
    },
  });

  return client?.cliente_id;
}

export async function getProviderIdFromUserId(userId: number) {
  const provider = await prisma.proveedor.findFirst({
    where: {
      usuario_id: userId,
    },
  });

  return provider?.proveedor_id;
}
