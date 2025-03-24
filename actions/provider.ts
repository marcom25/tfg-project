"use server";

import prisma from "@/lib/prisma";

export async function getFilteredProviders(
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
  return await prisma.proveedor.findMany({
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

export async function getProviderInfo(id: number) {
  const provider = await prisma.proveedor.findFirstOrThrow({
    where: {
      proveedor_id: id,
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

  return provider;
}

export async function getProviderInfoFromUserId(userId: number) {
  const provider = await prisma.proveedor.findFirstOrThrow({
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

  return provider; // No cambios necesarios aquí porque `findFirstOrThrow` lanza un error si no encuentra resultados.
}