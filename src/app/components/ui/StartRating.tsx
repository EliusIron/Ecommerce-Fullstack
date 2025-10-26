import React from "react";
import StarIcon from "../icons/StarIcon"; // Asegúrate que la ruta sea correcta

// Define las props que espera el componente StarRating
interface StarRatingProps {
  rating: number; // Calificación numérica (ej. 4.5)
  reviewCount?: number; // Número opcional de reseñas
  maxStars?: number; // Máximo de estrellas a mostrar (default 5)
}

// Componente para mostrar estrellas de calificación
export default function StarRating({
  rating,
  reviewCount,
  maxStars = 5,
}: StarRatingProps) {
  // Calcula cuántas estrellas completas mostrar
  const fullStars = Math.floor(rating);
  // Calcula cuántas estrellas vacías mostrar (simplificado, sin media estrella)
  const emptyStars = maxStars - fullStars;

  return (
    // Contenedor flex con espacio responsivo entre estrellas
    <div className="flex items-center gap-0.5 sm:gap-1">
      {/* Renderiza las estrellas llenas */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <StarIcon
          key={`full-${index}`}
          filled // Indica que la estrella debe estar llena
          // Tamaño responsivo para el icono
          className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500"
        />
      ))}

      {/* Renderiza las estrellas vacías */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <StarIcon
          key={`empty-${index}`}
          filled={false} // Indica que la estrella debe estar vacía (solo borde)
          // Tamaño responsivo para el icono
          className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
        />
      ))}

      {/* Muestra el contador de reseñas si está disponible */}
      {reviewCount !== undefined && (
        // Espaciado y tamaño de fuente responsivos
        <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs text-gray-500">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
