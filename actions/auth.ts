"use server";
import connectionPool from "@/db";
import { RegisterFormSchema, RegisterFormState } from "./../lib/schemas";
import * as argon2 from "argon2";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

const createUserQuery = `
    INSERT INTO usuario(email, contrasena, ultimo_ingreso)
    VALUES ($1, $2, $3)
    RETURNING usuario_id
`;

const assignRoleQuery = `
    INSERT INTO rol_usuario(usuario_id, rol_id)
    VALUES ($1, $2)
`;
const createClientUserQuery = `
INSERT INTO cliente(usuario_id)
    VALUES ($1)
`;

const createProviderUserQuery = `
INSERT INTO proveedor(usuario_id)
    VALUES ($1)
`;

export async function register(state: RegisterFormState, formData: FormData) {
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    userType: formData.get("userType"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation error",
    };
  }

  const { email, password, userType } = validatedFields.data;
  const hashedPassword = await argon2.hash(password);

  try {
    
  } catch (error) {
    return {
      message: "Error al registrar el usuario.",
    };
  }

  revalidatePath("/login");
  redirect("/login");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {   
   
    await signIn("credentials", formData);
   
    
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Credenciales inválidas.";
        default:
          return "Algo salió mal.";
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({
    redirectTo: "/login"
  })
}
