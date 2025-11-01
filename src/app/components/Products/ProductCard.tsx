// src/app/components/Products/ProductCard.tsx
"use client"; // Necesario para hooks y Zustand

import React from "react";
import Image from "next/image";
import StarRating from "../ui/StartRating";
import AddCart from "../icons/AddCart";
import QuantityControl from "../ui/QuantityControl";
import { useProductQuantity } from "@/app/hooks/useProductQuantity";
import type { Product } from "@/app/types/product";
import { useCartStore } from "@/app/store/cartStore"; // Importado

interface ProductCardProps {
  product: Product;
  isPriority?: boolean;
}

export default function ProductCard({
  product,
  isPriority = false,
}: ProductCardProps) {
  // Hook para manejar la cantidad LOCAL (cuántos añadir)
  const { quantity, incrementQuantity, decrementQuantity } =
    useProductQuantity(1);

  // --- INICIO DE LA ACTUALIZACIÓN ---

  // Obtiene la acción para añadir items del store Zustand
  const addItemToCart = useCartStore((state) => state.addItem);

  // 1. Conecta con el store para LEER la cantidad actual en el carrito
  //    Usamos un selector que busca el item y devuelve su cantidad, o 0 si no existe.
  const inCartQuantity = useCartStore(
    (state) => state.items.find((item) => item.id === product.id)?.quantity ?? 0
  );

  // --- FIN DE LA ACTUALIZACIÓN ---

  // Manejador para el clic en el botón de añadir
  const handleAddToCartClick = () => {
    addItemToCart(product, quantity); // Llama a la acción del store
  };

  return (
    // Contenedor principal del card (relative)
    <div className="group relative border border-gray-200 rounded-lg shadow-sm overflow-hidden m-2 w-40 sm:w-64 flex flex-col cursor-pointer">
      {/* --- INICIO DE LA ACTUALIZACIÓN --- */}
      {/* 2. Badge para la cantidad en el carrito */}
      {inCartQuantity > 0 && (
        <div
          className="absolute top-2 right-2 z-10 bg-green-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-sm"
          title={`Tienes ${inCartQuantity} en el carrito`}
        >
          {inCartQuantity}
        </div>
      )}
      {/* --- FIN DE LA ACTUALIZACIÓN --- */}

      {/* Contenedor de la Imagen */}
      <div className="relative w-full h-32 sm:h-48 bg-gray-200 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 20vw"
          style={{ objectFit: "contain" }}
          className="transition-transform duration-300 ease-in-out group-hover:scale-110 p-2"
          // --- CORRECCIÓN LCP ---
          priority={isPriority} // <-- Usa la prop aquí
          // --------------------
        />
      </div>
      {/* Contenedor de Detalles */}
      <div className="p-2 sm:p-4 flex flex-col flex-grow pb-12 sm:pb-14">
        {/* Nombre */}
        <h3
          className="text-xs sm:text-base font-semibold text-gray-800 truncate mb-1"
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
        <p className="text-sm sm:text-md font-bold text-gray-900 mb-2">
          ${product.price.toFixed(2)}
        </p>
        {/* Controles posicionados en la parte inferior */}
        <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between gap-x-2">
          {/* Componente de Controles de Cantidad */}
          <QuantityControl
            quantity={quantity}
            onIncrement={incrementQuantity}
            onDecrement={decrementQuantity}
          />
          {/* Botón Añadir al Carrito */}
          <button
            onClick={handleAddToCartClick}
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 text-black rounded-full shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-all duration-150 ease-in-out flex-shrink-0"
            aria-label={`Añadir ${quantity} ${product.name} al carrito`}
          >
            <AddCart className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
