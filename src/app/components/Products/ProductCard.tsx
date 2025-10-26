// src/app/components/Products/ProductCard.tsx
import React from "react";
import Image from "next/image";
import StarRating from "../ui/StartRating"; // Asegúrate que la ruta sea correcta

// Define la estructura de datos para un producto
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
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden m-2 w-40 sm:w-64 flex flex-col">
      <div className="relative w-full h-32 sm:h-48 bg-gray-200">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 20vw"
          style={{ objectFit: "cover" }}
          className="hover:opacity-75 transition-opacity duration-300"
        />
      </div>

      <div className="p-2 sm:p-4 flex flex-col flex-grow">
        <h3
          className="text-xs sm:text-lg font-semibold text-gray-800 truncate mb-1"
          title={product.name}
        >
          {product.name}
        </h3>

        <div className="mb-1 sm:mb-2">
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>

        <p className="text-xs sm:text-md font-bold text-gray-900 mb-2 sm:mb-0">
          ${product.price.toFixed(2)}
        </p>

        <button
          className="
  mt-auto w-full                
  bg-blue-600 text-white
  py-1 px-2 rounded-md         
  sm:py-2 sm:px-4               
  text-[10px] sm:text-sm         
  font-medium
  hover:bg-blue-700              
  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 S
  "
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
}
