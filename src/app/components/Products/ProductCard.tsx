// src/app/components/Products/ProductCard.tsx
import React from "react";
import Image from "next/image";
import StarRating from "../ui/StartRating";
import AddCart from "../icons/AddCart";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount?: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    // Contenedor principal - Añadimos 'group' aquí
    <div className="group border border-gray-200 rounded-lg shadow-sm overflow-hidden m-2 w-40 sm:w-64 flex flex-col cursor-pointer">
      {/* Contenedor de la Imagen */}
      <div className="relative w-full h-32 sm:h-48 bg-gray-200 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 20vw"
          // Cambia 'cover' por 'contain'
          style={{ objectFit: "contain" }} // <-- CAMBIO AQUÍ
          className="
  transition-transform duration-300 ease-in-out
  group-hover:scale-110
  p-2  // Añade un poco de padding si quieres más espacio alrededor
  "
        />
      </div>

      {/* Contenedor de Detalles del Producto */}
      <div className="p-2 sm:p-4 flex flex-col flex-grow">
        {/* Nombre */}
        <h3
          className="text-xs sm:text-lg font-semibold text-gray-800 truncate mb-1"
          title={product.name}
        >
          {product.name}
        </h3>
        {/* Rating */}
        <div className="mb-1 sm:mb-2">
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>
        {/* Precio */}
        <p className="text-xs sm:text-md font-bold text-gray-900 mb-2 sm:mb-0">
          ${product.price.toFixed(2)}
        </p>
        {/* Botón */}
        <div className="w-7">
          <button
            className="
  bg-transparent
  mt-auto w-full
  text-black
  py-1 px-2 rounded-md
  sm:py-2 sm:px-4
  text-[10px] sm:text-sm
  font-medium
  hover:bg-blue-700
  focus:outline-none focus:ring-2 focus:ring-offset-2 ring-black outline-1
  "
          >
            <AddCart className="inline-block mr-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
