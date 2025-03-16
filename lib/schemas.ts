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
      .min(3, { message: "La calle debe tener al menos 3 caracteres" }),
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
