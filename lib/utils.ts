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