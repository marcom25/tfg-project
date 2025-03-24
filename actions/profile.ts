"use server";

import { auth, signIn, signOut } from "@/auth";
import { LoginFormSchemaType, UserProfileFormClientSchemaType, UserProfileFormProviderSchemaType } from "@/lib/schemas";
import { getClientIdFromUserId, getProviderIdFromUserId } from "./users";
import prisma from "@/lib/prisma";
import * as argon2 from "argon2";

export async function updateProfile(data: UserProfileFormProviderSchemaType | UserProfileFormClientSchemaType) {
  const session = await auth();
  const email = session?.user.email;
  
  let updatedUser: any

  if (session?.user.role === "PROVIDER" && "experience" in data) {
    const providerId = await getProviderIdFromUserId(Number(session?.user.id));
  
    await prisma.servicio.deleteMany({
      where: {
        proveedor_id: providerId,
      },
    });

    updatedUser = await prisma.proveedor.update({
      where: {
        proveedor_id: providerId,
      },
      data: {
        experiencia: data.experience,
        usuario: {
          update: {
            nombre: data.name,
            apellido: data.lastname,
            email: data.email,
            telefono: data.phone,
            descripcion: data.aboutMe,
            direccion: {
              upsert: {
                create: {
                  calle: data.street,
                  numero: data.streetNumber.toString(),
                  ciudad: {
                    connect: {
                      ciudad_id: Number(data.cityId),
                    },
                  },
                },
                update: {
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
            imagen_perfil_id: data.avatarId,
          },
        },
        servicios: {
          create: data.services.map((service) => ({
            nombre_servicio: service.serviceName,
          })),
        },
      },
    });
    
  } else {
    const clientId = await getClientIdFromUserId(Number(session?.user.id));

    updatedUser = await prisma.cliente.update({
      where: {
        cliente_id: clientId,
      },
      data: {
        usuario: {
          update: {
            nombre: data.name,
            apellido: data.lastname,
            email: data.email,
            telefono: data.phone,
            descripcion: data.aboutMe,
            direccion: {
              upsert: {
                create: {
                  calle: data.street,
                  numero: data.streetNumber.toString(),
                  ciudad: {
                    connect: {
                      ciudad_id: Number(data.cityId),
                    },
                  },
                },
                update: {
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
            imagen_perfil_id: data.avatarId,
          },
        },
        servicios: {
          create: data.services.map((service) => ({
            nombre_servicio: service.serviceName,
          })),
        },
      },
    });
  }

  await signOut({
    redirect: false
  });


  const loginData: LoginFormSchemaType = {
    email: email ?? "",
    password: data.password
  };
  await signIn("credentials", {
    ...loginData,
    redirect: false
  });

  

  if (updatedUser) {
    return {
      error: false,
      message: "Perfil actualizado correctamente",
    };
  }
  return {
    error: true,
    message: "Error al actualizar el perfil",
  };
}
