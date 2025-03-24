import NextAuth from "next-auth";
import * as argon2 from "argon2";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { LoginFormSchema } from "./lib/schemas";
import prisma from "./lib/prisma";
import { Roles } from "./next-auth";



export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { name: "email" },
        password: { name: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const parsedCredentials = await LoginFormSchema.parseAsync({
          email,
          password,
        });
        if (parsedCredentials) {
          const { email, password } = parsedCredentials;
          const user = await prisma.usuario.findFirst({
            where: {
              email,
            },
            include: {
              roles: {
                select: {
                  rol: true,
                },
              },
            },
          });
          if (!user) return null;
          const passwordsMatch = await argon2.verify(user.contrasena, password);
          if (passwordsMatch) {
            const { contrasena, email, usuario_id, nombre, apellido, roles, imagen_perfil_id } = user;
            const role = roles[0].rol.nombre_rol as Roles;
                   
            return {
              id: usuario_id.toString(),
              name: nombre,
              lastname: apellido,
              email,
              role,
              image: imagen_perfil_id,
            }
          }
        }
        return null;
      },
      
    }),
  ],
});
