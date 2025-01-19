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
  email: z.string().email({ message: "Por favor ingresá un email válido." }).trim(),
  password: z
    .string()
    .min(6, { message: "La contraseña debe contener al menos 6 caracteres." })
    .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula." })
    .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula." })
    .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "La contraseña debe contener al menos un carácter especial.",
    })
    .trim(),
  userType: z.enum(["client", "provider"], {
    message: "Por favor selecciona un tipo de usuario.",
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
  name: z.string().min(1, "El nombre es requerido").trim(),
  lastname: z.string().min(1, "El apellido es requerido").trim(),
  phone: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .trim(),
  experience: z.string().nullable(),
  services: z.string().min(1, "Debe seleccionar al menos un servicio").trim(),
  aboutMe: z
    .string()
    .max(500, "La descripción no puede exceder los 500 caracteres")
    .trim(),
  address: z.object({
    street: z.string().min(1, "La dirección es requerida").trim(),
    city: z.string().min(1, "La ciudad es requerida").trim(),
    province: z.string().min(1, "La provincia es requerida").trim(),
  }),
});

export type UserProfileFormState = {
  errors?: {
    name?: string;
    lastname?: string;
    phone?: string;
    experience?: string | null;
    services?: Array<{ serviceName?: string }> | null;
    aboutMe?: string;
    address?: {
      street?: string;
      city?: string;
      province?: string;
    };
  };
  message?: string | null;
};
