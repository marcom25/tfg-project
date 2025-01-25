
import { NextAuthConfig } from "next-auth";
import { redirect } from "next/navigation";
import { Roles } from "./next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string, // Incluir el ID en la sesión
        role: token.role as Roles, // Incluir el rol en la sesión
      };
     
      
      return session;
    },
   
  },
  providers: []
} satisfies NextAuthConfig;
