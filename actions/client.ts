"use server"

import prisma from "@/lib/prisma";

export async function getFilteredClients(
  query: string,
  sortBy: string,
  location: string,
  minRating: string,
  from: string,
  to: string
) {
  // 1. Configurar ordenamiento
  const orderBy = [];
  if (sortBy === "nameAsc") {
    orderBy.push({ usuario: { nombre: "asc" as const } });
  } else if (sortBy === "nameDesc") {
    orderBy.push({ usuario: { nombre: "desc" as const } });
  }

  // 2. Convertir parámetros
  const minRatingValue = parseInt(minRating);
  const fromDate = from ? new Date(from) : undefined;
  const toDate = to ? new Date(to) : undefined;

  // 3. Construir condiciones WHERE dinámicamente
  const whereConditions: any[] = [
    {
      usuario: {
        nombre: { not: null },
        apellido: { not: null },
        direccion: { isNot: null },
      },
    },
  ];

  // Filtro de búsqueda (OR)
  if (query) {
    whereConditions.push({
      OR: [
        { usuario: { nombre: { contains: query, mode: "insensitive" } } },
        { usuario: { apellido: { contains: query, mode: "insensitive" } } },
        {
          usuario: {
            direccion: {
              ciudad: { nombre: { contains: query, mode: "insensitive" } },
            },
          },
        },
        {
          usuario: {
            direccion: {
              ciudad: {
                provincia: { nombre: { contains: query, mode: "insensitive" } },
              },
            },
          },
        },
        {
          servicios: {
            some: { nombre_servicio: { contains: query, mode: "insensitive" } },
          },
        },
      ],
    });
  }

  // Filtro de ubicación (provincia)
  if (location !== "all") {
    whereConditions.push({
      usuario: {
        direccion: {
          ciudad: {
            provincia: {
              nombre: { equals: location, mode: "insensitive" },
            },
          },
        },
      },
    });
  }

  // Filtro de calificación mínima
  if (minRatingValue > 0) {
    whereConditions.push({
      usuario: {
        calificados: {
          some: {
            puntuacion: { gte: minRatingValue },
          },
        },
      },
    });
  }

  // Filtro de disponibilidad (sin contratos que se solapen)
  if (fromDate && toDate) {
    whereConditions.push({
      NOT: {
        contratos: {
          some: {
            AND: [
              { fecha_inicio: { lte: toDate } },
              { fecha_fin: { gte: fromDate } },
            ],
          },
        },
      },
    });
  }

  // 4. Ejecutar consulta
  return await prisma.cliente.findMany({
    include: {
      usuario: {
        include: {
          direccion: {
            include: {
              ciudad: {
                include: { provincia: true },
              },
            },
          },
          calificados: true,
        },
      },
      servicios: true,
      contratos: true,
    },
    where: { AND: whereConditions },
    orderBy: orderBy,
  });
}

export async function getClientInfo(id: number) {
  const client = await prisma.cliente.findFirstOrThrow({
    where: {
      cliente_id: id,
      usuario: {
        nombre: {
          not: null,
        },
        apellido: {
          not: null,
        },
        direccion: {
          isNot: null,
        },
      },
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
          calificados: true,
          comentarios: {
            include: {
              comentador: true,
              puntuacion: true,
            },
          },
        },
      },
      servicios: true,
    },
  });

  return client;
}


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

export async function getAllUsersFromClients() {
  const clients = await prisma.cliente.findMany({
    include: {
      usuario: true
    }
  })

  const users = clients.map((client) => (client.usuario))

  return users
}