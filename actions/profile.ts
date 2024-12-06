"use server";

import { UserProfileFormSchema, UserProfileFormState } from "@/lib/schemas";

export async function updateProfile({
  state,
  formData,
}: {
  state: UserProfileFormState;
  formData: FormData;
}) {
  const validatedFields = UserProfileFormSchema.safeParse({
    nombre: formData.get("nombre"),
    apellido: formData.get("apellido"),
    telefono: formData.get("telefono"),
    experiencia: formData.get("experiencia"),
    servicios: formData.get("servicios"),
    sobreMi: formData.get("sobreMi"),
    fotoPerfil: formData.get("fotoPerfil"),
    direccion: {
      calle: formData.get("address"),
      ciudad: formData.get("city"),
      provincia: formData.get("province"),
    },
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. Fallo al actualizar usuario",
    };
  }

  try {
    // Aquí realizarías la lógica para actualizar/insertar en la base de datos.
    return {
      message: "Perfil actualizado correctamente.",
    };
  } catch (error) {
    return {
      message: "Error al actualizar el perfil.",
    };
  }
}
