import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import "next-auth/jwt";

// Definimos los roles
export enum Roles {
  CLIENT = "CLIENT",
  PROVIDER = "PROVIDER",
}

// Extiende el tipo de `User` para incluir `role`
declare module "next-auth" {
  interface User extends DefaultUser {
    role: Roles; // Agrega la propiedad role
    lastname: string | null;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Roles; // Agrega role al JWT
    lastname?: string | null;
  }
}