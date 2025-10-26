import React from "react";
import Image from "next/image";
import StarRating from "../ui/StartRating"; // Asegúrate que la ruta sea correcta

// Define la estructura de datos para un producto
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string; // URL de la imagen del producto
  rating: number; // Calificación numérica (ej. 4.5)
  reviewCount?: number; // Número opcional de reseñas
}

// Define las props que espera el componente ProductCard
interface ProductCardProps {
  product: Product;
}

// Componente de la tarjeta de producto
export default function ProductCard({ product }: ProductCardProps) {
  return (
    // Contenedor principal con ancho responsivo y margen
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden m-2 w-40 sm:w-64 flex flex-col">
      {/* Contenedor de la Imagen con altura responsiva */}
      <div className="relative w-full h-32 sm:h-48 bg-gray-200">
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill" // Rellena el contenedor padre
          objectFit="cover" // Cubre el área manteniendo la relación de aspecto
          className="hover:opacity-75 transition-opacity duration-300" // Efecto visual al pasar el mouse
        />
      </div>

      {/* Contenedor de Detalles del Producto */}
      {/* Padding responsivo y flex para empujar el botón hacia abajo */}
      <div className="p-2 sm:p-4 flex flex-col flex-grow">
        {/* Nombre del Producto: Tamaño de fuente responsivo y truncado */}
        <h3 className="text-xs sm:text-lg font-semibold text-gray-800 truncate mb-1">
          {product.name}
        </h3>

        {/* Componente de Calificación por Estrellas */}
        <div className="mb-1 sm:mb-2">
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>

        {/* Precio del Producto: Tamaño de fuente responsivo */}
        <p className="text-xs sm:text-md font-bold text-gray-900 mb-2 sm:mb-0">
          ${product.price.toFixed(2)}
        </p>

        {/* Botón Añadir al Carrito */}
        <button
          className="
            mt-auto w-full                 {/* Empuja el botón al final */}
            bg-blue-600 text-white
            py-1 px-2 rounded-md           {/* Padding base reducido (móvil) */}
            sm:py-2 sm:px-4                {/* Padding mayor en sm+ */}
            text-[10px] sm:text-sm         {/* Fuente muy pequeña en móvil, normal en sm+ */}
            font-medium
            hover:bg-blue-700              {/* Efecto hover */}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 {/* Estilos de foco */}
          "
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
}
