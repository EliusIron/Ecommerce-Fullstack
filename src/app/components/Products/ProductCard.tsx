// src/app/components/Products/ProductCard.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import StarRating from "../ui/StartRating";
import AddCart from "../icons/AddCart";
// import CheckIcon from '../icons/CheckIcon'; // Placeholder
import QuantityControl from "../ui/QuantityControl";
import { useProductQuantity } from "@/app/hooks/useProductQuantity";
import { useCart } from "@/app/context/CartContext"; // Necesitamos items aquí
import type { Product } from "@/app/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Hook para cantidad LOCAL a añadir
  const { quantity, incrementQuantity, decrementQuantity, resetQuantity } =
    useProductQuantity(1);
  // Hook para estado GLOBAL del carrito
  const { items, addItem } = useCart(); // Obtenemos 'items' del carrito global
  const [isAdded, setIsAdded] = useState(false);

  // Busca este producto en el carrito global para obtener su cantidad actual
  const cartItem = items.find((item) => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0; // Cantidad en el carrito global (0 si no está)

  const handleAddToCartClick = () => {
    addItem(product, quantity); // Sigue añadiendo la cantidad seleccionada localmente
    setIsAdded(true);
    resetQuantity?.();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAdded) {
      timer = setTimeout(() => {
        setIsAdded(false);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [isAdded]);

  const SimpleCheckIcon = ({ className }: { className?: string }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );

  return (
    // Contenedor principal
    <div className="group relative border border-gray-200 rounded-lg shadow-sm overflow-hidden m-2 w-40 sm:w-64 flex flex-col cursor-pointer">
      {/* ... (Imagen) ... */}
      <div className="relative w-full h-32 sm:h-48 bg-gray-200 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 20vw"
          style={{ objectFit: "contain" }}
          className="
            transition-transform duration-300 ease-in-out
            group-hover:scale-110
            p-2
          "
        />
      </div>

      {/* Contenedor de Detalles del Producto */}
      <div className="p-2 sm:p-4 flex flex-col flex-grow pb-12 sm:pb-14">
        {/* ... (Nombre, Rating, Precio) ... */}
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
        <p className="text-xs sm:text-md font-bold text-gray-900 mb-2">
          ${product.price.toFixed(2)}
        </p>

        {/* Controles posicionados absolutamente */}
        <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between">
          {/* Control de cantidad LOCAL (para seleccionar cuánto añadir) */}
          <QuantityControl
            quantity={quantity}
            onIncrement={incrementQuantity}
            onDecrement={decrementQuantity}
          />
          {/* Botón Añadir al Carrito con Badge mostrando cantidad EN CARRITO */}
          <div className="relative">
            <button
              onClick={handleAddToCartClick}
              disabled={isAdded}
              className={`
                         flex items-center justify-center
                         w-8 h-8 sm:w-10 sm:h-10
                         rounded-full shadow-md
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400
                         transition-all duration-300 ease-in-out
                         transform
                         ${
                           isAdded
                             ? "bg-green-500 text-white scale-110 cursor-default"
                             : "bg-yellow-400 text-black hover:bg-yellow-500 scale-100"
                         }
                     `}
              // aria-label sigue usando la cantidad local para indicar cuánto se añadirá
              aria-label={
                isAdded
                  ? `${product.name} añadido`
                  : `Añadir ${quantity} ${product.name} al carrito`
              }
            >
              {isAdded ? (
                <SimpleCheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <AddCart className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
            {/* Badge de cantidad EN CARRITO (visible si > 0 y no está en estado 'añadido') */}
            {!isAdded &&
              quantityInCart > 0 && ( // Condición y valor usan quantityInCart
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {quantityInCart} {/* Muestra quantityInCart */}
                </span>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
