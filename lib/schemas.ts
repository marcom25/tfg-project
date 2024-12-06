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

export const UserProfileFormSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").trim(),
  apellido: z.string().min(1, "El apellido es requerido").trim(),
  telefono: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .trim(),
  experiencia: z.string().nullable(),
  servicios: z.string().min(1, "Debe seleccionar al menos un servicio").trim(),
  sobreMi: z
    .string()
    .max(500, "La descripción no puede exceder los 500 caracteres")
    .trim(),
  fotoPerfil: z.string().min(1, "Debe seleccionar un color para el avatar"),
  direccion: z.object({
    calle: z.string().min(1, "La dirección es requerida").trim(),
    ciudad: z.string().min(1, "La ciudad es requerida").trim(),
    provincia: z.string().min(1, "La provincia es requerida").trim(),
  }),
});

export type UserProfileFormState = {
  errors?: {
    nombre?: string;
    apellido?: string;
    telefono?: string;
    experiencia?: string | null;
    servicios?: Array<{ nombre_servicio?: string }> | null;
    sobreMi?: string;
    fotoPerfil?: string;
    direccion?: {
      calle?: string;
      ciudad?: string;
      provincia?: string;
    };
  };
  message?: string | null;
};
