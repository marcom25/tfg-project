"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getAllUsersFromClients } from "./client";
import { getAllUsersFromProviders } from "./provider";
import { MessageFormSchemaType } from "@/lib/schemas";
import { getUserIdFromClientId, getUserIdFromProviderId } from "./users";
import { redirect } from "next/navigation";


export async function getConversations() {
  const session = await auth();
  const conversations = await prisma.conversacion.findMany({
    where: {
      OR: [
        {
          usuario_receptor_id: Number(session?.user.id),
        },
        {
          usuario_remitente_id: Number(session?.user.id),
        },
      ],
    },
    include: {
      receptor: true,
      remitente: true,
      mensajes: {
        orderBy: {
          fecha_creacion: "desc",
        },
        select: {
          fecha_creacion: true,
          mensaje: true,
        },
      },
    },
  });
  
  return conversations;
}
export type Conversations = Awaited<ReturnType<typeof getConversations>>;

export async function createConversation(receptorUserId: number) {
  const session = await auth();
  const conversation = await prisma.conversacion.create({
    data: {
      usuario_receptor_id: receptorUserId,
      usuario_remitente_id: Number(session?.user.id),
    },
    include: {
      receptor: true,
      remitente: true,
      mensajes: {
        orderBy: {
          fecha_creacion: "desc",
        },
        select: {
          fecha_creacion: true,
          mensaje: true,
        },
      },
    }
  });
  
  return conversation;
}
export type Conversation = Awaited<ReturnType<typeof createConversation>>;

export async function getConversation(conversationId: number) {
  const session = await auth(); // Obtener el usuario logueado
  const conversation = await prisma.conversacion.findUnique({
    where: {
      conversacion_id: conversationId,
    },
    include: {
      receptor: true,
      remitente: true,
    },
  });

  if (!conversation) return null;

  // Determinar cuál es el otro usuario (receptor o remitente)
  const otherUser =
    conversation.usuario_receptor_id === Number(session?.user.id)
      ? conversation.remitente
      : conversation.receptor;

  return {
    ...conversation,
    otherUser, // Incluir solo el otro usuario
  };
}
export type ConversationDetails = Awaited<ReturnType<typeof getConversation>>;

export async function getMessages(conversationId: number) {
  const messages = await prisma.mensaje.findMany({
    where: {
      conversacion_id: conversationId,
    },
  });

  return messages;
}
export type Messages = Awaited<ReturnType<typeof getMessages>>;

export async function createMessage(conversationId: number, data: MessageFormSchemaType) {
  const session = await auth();
  const message = await prisma.mensaje.create({
    data: {
      conversacion_id: conversationId,
      mensaje: data.message,
      remitente_id: Number(session?.user.id),
    },
  });

  return message;
}
export type Message = Awaited<ReturnType<typeof createMessage>>;

export async function getUsers() {
  const session = await auth();

  // Obtener todos los usuarios con los que ya tienes una conversación
  const existingConversations = await prisma.conversacion.findMany({
    where: {
      OR: [
        { usuario_receptor_id: Number(session?.user.id) },
        { usuario_remitente_id: Number(session?.user.id) },
      ],
    },
    select: {
      usuario_receptor_id: true,
      usuario_remitente_id: true,
    },
  });

  // Extraer los IDs de los usuarios con los que ya tienes conversaciones
  const excludedUserIds = new Set<number>(
    existingConversations.flatMap((conv) => [
      conv.usuario_receptor_id,
      conv.usuario_remitente_id,
    ])
  );

  // Obtener todos los usuarios según el rol del usuario logueado
  let users;
  if (session?.user.role === "PROVIDER") {
    users = await getAllUsersFromClients();
  } else {
    users = await getAllUsersFromProviders();
  }

  // Filtrar usuarios que no están en `excludedUserIds`
  const filteredUsers = users.filter(
    (user) => !excludedUserIds.has(Number(user.usuario_id))
  );

  return filteredUsers;
}
export type GetUsers = Awaited<ReturnType<typeof getUsers>>;

export async function redirectToConversation({
  clientId,
  providerId,
}: { clientId?: number; providerId?: number }) {
  const session = await auth();
  if (!session?.user.id) throw new Error("No autenticado");

  // Obtener el userId del cliente o proveedor
  let otherUserId: number | undefined;
  if (clientId) {
    otherUserId = await getUserIdFromClientId(clientId)
  } else if (providerId) {
    otherUserId = await getUserIdFromProviderId(providerId);
  }

  if (!otherUserId) throw new Error("Usuario no encontrado");

  // Buscar si ya existe una conversación
  const existingConversation = await prisma.conversacion.findFirst({
    where: {
      OR: [
        {
          usuario_remitente_id: Number(session.user.id),
          usuario_receptor_id: otherUserId,
        },
        {
          usuario_remitente_id: otherUserId,
          usuario_receptor_id: Number(session.user.id),
        },
      ],
    },
  });

  if (existingConversation) {
    redirect(`/chat?conversation=${existingConversation.conversacion_id}`)
  }

  // Crear nueva conversación
  const newConversation = await prisma.conversacion.create({
    data: {
      usuario_remitente_id: Number(session.user.id),
      usuario_receptor_id: otherUserId,
    },
  });

  redirect(`/chat?conversation=${newConversation.conversacion_id}`);
}