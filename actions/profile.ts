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
    name: formData.get("name"),
    lastname: formData.get("lastname"),
    phone: formData.get("phone"),
    experience: formData.get("experience"),
    services: formData.get("services"),
    aboutMe: formData.get("aboutMe"),
    address: {
      street: formData.get("address"),
      city: formData.get("city"),
      province: formData.get("province"),
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
