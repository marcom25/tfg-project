import NextAuth from "next-auth";
import * as argon2 from "argon2";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import connectionPool from "./db";
import { UserDB } from "./lib/definitions";
import { LoginFormSchema } from "./lib/schemas";

async function getUser(email: string): Promise<UserDB | null> {
  const getUserQuery = `
    SELECT u.usuario_id AS id,
            u.email,
            u.nombre AS name,
            u.contrasena AS password,
	        r.nombre_rol AS role
        FROM 	usuario u
        JOIN rol_usuario ru ON ru.usuario_id = u.usuario_id 
        JOIN rol r ON	r.rol_id = ru.rol_id 
        WHERE u.email = $1
    `;

  try {
    const {
      rows: [user],
    } = await connectionPool.query(getUserQuery, [email]);

    return user
      ? {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          password: user.password,
        }
      : null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

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
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await argon2.verify(user.password, password);
          if (passwordsMatch) {
            const { password: _, ...userWithoutPassword } = user;
            console.log(userWithoutPassword);
            
            return userWithoutPassword;
          }
        }
        console.log("CREDENCIALES INVALIDAS");

        return null;
      },
      
    }),
  ],
  debug: true
});
