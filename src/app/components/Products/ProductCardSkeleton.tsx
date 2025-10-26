// src/app/components/Products/ProductCardSkeleton.tsx
import * as React from "react";

export default function ProductCardSkeleton() {
  return (
    // Contenedor principal con el mismo layout que ProductCard
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden m-2 w-40 sm:w-64 flex flex-col animate-pulse">
      {/* Placeholder para la Imagen */}
      <div className="relative w-full h-32 sm:h-48 bg-gray-300"></div>

      {/* Contenedor de Detalles */}
      <div className="p-2 sm:p-4 flex flex-col flex-grow">
        {/* Placeholder para el Nombre */}
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>

        {/* Placeholder para Rating */}
        <div className="h-3 bg-gray-300 rounded w-1/2 mb-2 sm:mb-3"></div>

        {/* Placeholder para Precio */}
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-3 sm:mb-2"></div>

        {/* Placeholder para Botón */}
        <div className="mt-auto w-full h-8 sm:h-10 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
}
