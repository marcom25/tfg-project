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

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

export const RegisterFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Por favor ingresá un email válido." })
      .trim(),
    password: z
      .string()
      .min(6, { message: "La contraseña debe contener al menos 6 caracteres." })
      .regex(/[a-z]/, {
        message: "La contraseña debe contener al menos una letra minúscula.",
      })
      .regex(/[A-Z]/, {
        message: "La contraseña debe contener al menos una letra mayúscula.",
      })
      .regex(/[0-9]/, {
        message: "La contraseña debe contener al menos un número.",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "La contraseña debe contener al menos un carácter especial.",
      })
      .trim(),
    repeatPassword: z.string(),
    userType: z.enum(["client", "provider"], {
      message: "Por favor selecciona un tipo de usuario.",
    }),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Las contraseñas no coinciden.",
        path: ["repeatPassword"],
      });
    }
  });

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;

// Esquema de validación Zod
export const CommentFormSchema = z.object({
  rating: z.number().min(1, "Debes seleccionar una puntuación"),
  comment: z.string().min(1, "El comentario no puede estar vacío"),
});

export type CommentFormSchemaType = z.infer<typeof CommentFormSchema>;

export const ReservationFormSchema = z
  .object({
    startDate: z.date({
      required_error: "La fecha de inicio es requerida",
    }),
    endDate: z
      .date({
        required_error: "La fecha de finalización es requerida",
      })
      .refine((date) => date > new Date(), {
        message: "La fecha de finalización debe ser en el futuro",
      }),
    minimumRange: z.coerce
      .number({
        required_error: "El rango mínimo es requerido",
        invalid_type_error: "Debe ser un número",
      })
      .min(1, { message: "El valor mínimo debe ser mayor o igual a 1" }),
    maximumRange: z.coerce
      .number({
        required_error: "El rango máximo es requerido",
        invalid_type_error: "Debe ser un número",
      })
      .min(1, { message: "El valor máximo debe ser mayor o igual a 1" }),
    duration: z
      .string({
        required_error: "La duración es requerida",
      })
      .refine((value) => value !== "", {
        message: "La duración es requerida",
      }),
    street: z
      .string()
      .min(3, { message: "La calle debe tener al menos 3 caracteres" })
      .max(200, { message: "La calle no puede tener más de 200 caracteres" }),
    streetNumber: z.coerce
      .number({
        required_error: "El número es requerido",
        invalid_type_error: "Debe ser un número",
      })
      .min(1, { message: "El número debe ser mayor a 0" }),
    provinceId: z
      .string({
        required_error: "La provincia es requerida",
      })
      .refine((value) => value !== "", {
        message: "La provincia es requerida",
      }),
    cityId: z
      .string({
        required_error: "La ciudad es requerida",
      })
      .refine((value) => value !== "", {
        message: "La ciudad es requerida",
      }),
    requirements: z
      .string()
      .max(500, { message: "Máximo 500 caracteres" })
      .optional(),
  })
  .refine((data) => data.maximumRange > data.minimumRange, {
    message: "El rango máximo debe ser mayor que el rango mínimo",
    path: ["maximumRange"],
  });

export type ReservationFormSchemaType = z.infer<typeof ReservationFormSchema>;

export const UserProfileFormProviderSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es requerido" })
    .max(100, { message: "El nombre no puede tener más de 100 caracteres" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe contener al menos 6 caracteres." })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula.",
    })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula.",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "La contraseña debe contener al menos un carácter especial.",
    })
    .max(255, { message: "La contraseña no puede tener más de 255 caracteres" })
    .trim(),
  lastname: z
    .string()
    .min(1, { message: "El apellido es requerido" })
    .max(100, { message: "El apellido no puede tener más de 100 caracteres" }),
  email: z
    .string()
    .email({ message: "Debe ser un correo válido" })
    .max(150, { message: "El correo no puede tener más de 150 caracteres" }),
  phone: z
    .string()
    .regex(/^\d+$/, { message: "El teléfono tiene que ser un número" })
    .min(1, { message: "El teléfono es requerido" })
    .max(13, { message: "El teléfono no puede tener más de 13 caracteres" }),
  experience: z.string().min(1, { message: "La experiencia es requerida" }),
  street: z
    .string()
    .min(1, { message: "La calle es requerida" })
    .max(200, { message: "La calle no puede tener más de 200 caracteres" }),
  streetNumber: z
    .number({ message: "El número tiene que ser un número" })
    .min(1, { message: "El número debe ser mayor a 0" }),
  provinceId: z.string().min(1, { message: "La provincia es requerida" }),
  cityId: z.string().min(1, { message: "La ciudad es requerida" }),
  aboutMe: z.string().optional(), // Este campo no es requerido
  services: z
    .array(
      z.object({
        serviceName: z.string().min(1, { message: "El servicio es requerido" }),
      })
    )
    .min(1, { message: "Debes agregar al menos un servicio" }),
  avatarId: z.string().optional(),
});

export type UserProfileFormProviderSchemaType = z.infer<
  typeof UserProfileFormProviderSchema
>;

export const UserProfileFormClientSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es requerido" })
    .max(100, { message: "El nombre no puede tener más de 100 caracteres" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe contener al menos 6 caracteres." })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula.",
    })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula.",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "La contraseña debe contener al menos un carácter especial.",
    })
    .max(255, { message: "La contraseña no puede tener más de 255 caracteres" })
    .trim(),
  lastname: z
    .string()
    .min(1, { message: "El apellido es requerido" })
    .max(100, { message: "El apellido no puede tener más de 100 caracteres" }),
  email: z
    .string()
    .email({ message: "Debe ser un correo válido" })
    .max(150, { message: "El correo no puede tener más de 150 caracteres" }),
  phone: z
    .string()
    .regex(/^\d+$/, { message: "El teléfono tiene que ser un número" })
    .min(1, { message: "El teléfono es requerido" })
    .max(13, { message: "El teléfono no puede tener más de 13 caracteres" }),
  street: z
    .string()
    .min(1, { message: "La calle es requerida" })
    .max(200, { message: "La calle no puede tener más de 200 caracteres" }),
  streetNumber: z
    .number({ message: "El número tiene que ser un número" })
    .min(1, { message: "El número debe ser mayor a 0" })
    .max(20, { message: "El número no puede tener más de 20 caracteres" }),
  provinceId: z.string().min(1, { message: "La provincia es requerida" }),
  cityId: z.string().min(1, { message: "La ciudad es requerida" }),
  aboutMe: z.string().optional(), // Este campo no es requerido
  services: z
    .array(
      z.object({
        serviceName: z.string().min(1, { message: "El servicio es requerido" }),
      })
    )
    .min(1, { message: "Debes agregar al menos un servicio" }),
  avatarId: z.string().optional(),
});

export type UserProfileFormClientSchemaType = z.infer<
  typeof UserProfileFormClientSchema
>;

export const MessageFormSchema = z.object({
  message: z.string().min(1, { message: "El mensaje no puede estar vacío" }),
});
export type MessageFormSchemaType = z.infer<typeof MessageFormSchema>;

export const AgreementFormSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "El monto es requerido",
      invalid_type_error: "Debe ser un número",
    })
    .min(1, { message: "El monto debe ser mayor o igual a 1" }),
});

export type AgreementFormSchemaType = z.infer<typeof AgreementFormSchema>;
