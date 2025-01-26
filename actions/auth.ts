"use server";

import {
  LoginFormSchemaType,
  RegisterFormSchema,
  RegisterFormSchemaType,
} from "./../lib/schemas";
import * as argon2 from "argon2";
import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { faker } from "@faker-js/faker";


export async function register(data: RegisterFormSchemaType){
  const parsedData = RegisterFormSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      error: true,
      message: "Error en los datos ingresados.",
    };
  }

  const { email, password, userType } = parsedData.data;
  const hashedPassword = await argon2.hash(password);

  try {
    const newUser = await prisma.usuario.create({
      data: {
        email: email,
        contrasena: hashedPassword,
        ultimo_ingreso: new Date(),
        imagen_perfil_id: faker.image.avatar(),
        [userType === "client" ? "clientes" : "proveedores"]: {
          create: {},
        },
        roles: {
          create: {
            rol: {
              connect: {
                rol_id: userType === "client" ? 1 : 2, // Assuming 1 is for CLIENT and 2 is for PROVIDER
              },
            },
          },
        },
      },
    });
    const data: LoginFormSchemaType = {
      email,
      password
    }
    await signIn("credentials", {
      ...data,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          error: true,
          message: "El email ya está en uso.",
        };
      }
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: true,
            message: "Credenciales inválidas.",
          };
        default:
          return {
            error: true,
            message: "Algo salió mal.",
          };
      }
    }
  }
  
}

export async function authenticate(data: LoginFormSchemaType) {
  try {
   
    await signIn("credentials", {
      ...data,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: true,
            message: "Credenciales inválidas.",
          };
        default:
          return {
            error: true,
            message: "Algo salió mal.",
          };
      }
    }
  }
}

export async function logout() {
  await signOut({
    redirectTo: "/",
  });
}
