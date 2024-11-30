
import { NextAuthConfig } from "next-auth";
import { Roles } from "./next-auth";



export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Incluye el rol en el token JWT
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        role: token.role as Roles, // Añade el rol desde el token
      };
      return session;
    },
  },
  providers: []
} satisfies NextAuthConfig;
