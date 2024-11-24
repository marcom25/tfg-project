"use server";
import connectionPool from "@/db";
import {
  LoginFormSchema,
  LoginFormState,
  RegisterFormSchema,
  RegisterFormState,
} from "./../lib/schemas";
import * as argon2 from "argon2";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
      message: "Faltan campos. Fallo al registrar usuario",
    };
  }

  const { email, password, userType } = validatedFields.data;
  const [date] = new Date().toISOString().split("T");
  const hashedPassword = await argon2.hash(password);

  try {
    const {
      rows: [newUser],
    } = await connectionPool.query(createUserQuery, [
      email,
      hashedPassword,
      date,
    ]);

    console.log(newUser, "newUser");

    if (userType === "client") {
      await connectionPool.query(assignRoleQuery, [newUser.usuario_id, 1]);
      await connectionPool.query(createClientUserQuery, [newUser.usuario_id]);
    } else {
      await connectionPool.query(assignRoleQuery, [newUser.usuario_id, 2]);
      await connectionPool.query(createProviderUserQuery, [newUser.usuario_id]);
    }
  } catch (error) {
    return {
      message: "Error al registrar el usuario.",
    };
  }

  revalidatePath("/login");
  redirect("/login");
}

export async function login(state: LoginFormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. Fallo al inciar sesión",
    };
  }

  const { email, password } = validatedFields.data;

  const [date] = new Date().toISOString().split("T");

  //   try {
  //     const userData = await connectionPool.query(`
  //             SELECT u.usuario_id FROM usuario u WHERE u.email = ${email} AND u.password = ${password}
  //         `);

  //     await connectionPool.query(`
  //             INSERT INTO usuario (usuario_id, ultimo_ingreso)
  //             VALUES(${userData.}${date})
  //         `);
  //   } catch (error) {
  //     return {
  //       message: "Database Error: No se pudo recuperar el usuario",
  //     };
  //   }
}
