import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Ingrese un email válido" }).trim(),
  password: z
    .string()
    .min(6, { message: "Debe contener al menos 6 caracteres." })
    .regex(/[a-z]/, { message: "Debe contener al menos una letra minúscula." })
    .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula." })
    .regex(/[0-9]/, { message: "Debe contener al menos un número." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Debe contener al menos un carácter especial.",
    })
    .trim(),
});

export type LoginFormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export const RegisterFormSchema = z.object({
  email: z.string().email({ message: "Ingrese un email válido" }).trim(),
  password: z
    .string()
    .min(6, { message: "Debe contener al menos 6 caracteres." })
    .regex(/[a-z]/, { message: "Debe contener al menos una letra minúscula." })
    .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula." })
    .regex(/[0-9]/, { message: "Debe contener al menos un número." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Debe contener al menos un carácter especial.",
    })
    .trim(),
  userType: z.enum(["client", "provider"], {
    message: "Debe ser 'cliente' o 'proveedor'.",
  }),
});

export type RegisterFormState = {
  errors?: {
    email?: string[];
    password?: string[];
    userType?: string[];
  };
  message?: string | null;
};
