import { puntuacion } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRating(ratings: puntuacion[] | null): number {
  // Si no hay puntuaciones, devolver 5 como valor predeterminado
  if (!ratings || ratings.length === 0) return 5;

  // Filtrar puntuaciones válidas
  const validRatings = ratings.filter(
    (rating) => rating.puntuacion !== null && rating.puntuacion !== undefined
  );

  // Calcular el promedio
  const average =
    validRatings.reduce((sum, rating) => sum + (rating.puntuacion || 0), 0) /
    validRatings.length;

  // Si no hay puntuaciones válidas después de filtrar, devolver 5
  return validRatings.length > 0 ? parseFloat(average.toFixed(2)) : 5;
}

export function normalizeText(text: string | undefined): string {
  const normalizedText = text || '';
  return normalizedText
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatNumber(value: number | string): string {
  if (value === 0 || value === "" || value === undefined || value === null) return ""

  // Convertir a string si es un número
  const stringValue = typeof value === "number" ? value.toString() : value

  // Si no hay valor, devolver cadena vacía
  if (!stringValue) return ""

  // Dividir en parte entera y decimal si hay coma
  if (stringValue.includes(",")) {
    const [intPart, decPart] = stringValue.split(",")
    // Formatear la parte entera con puntos como separadores de miles
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return `${formattedInt},${decPart}`
  }

  // Si no hay coma, formatear todo como parte entera
  return stringValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

// Función para convertir de formato argentino a número
export function unformatNumber(value: string): number {
  if (!value) return 0

  // Eliminar todos los puntos (separadores de miles)
  const withoutThousandSeparator = value.replace(/\./g, "")

  // Si hay coma decimal, convertir a formato JavaScript (punto decimal)
  if (withoutThousandSeparator.includes(",")) {
    return Number.parseFloat(withoutThousandSeparator.replace(",", "."))
  }

  // Si no hay coma decimal, es un entero
  return Number.parseInt(withoutThousandSeparator, 10)
}

export function getVariantFromState(state: string | undefined): "info" | "default" | "destructive" | "outline" | "secondary" | "success" | null | undefined {
  switch (state) {
    case "PENDING":
      return "info"
    case "ON_GOING":
      return "success"
    case "REJECTED":
      return "destructive"
    default:
      return "default"
  }
}
