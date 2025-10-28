// src/app/components/Products/ProductCard.tsx
import React from "react"; // Ya no necesitas useState aquí
import Image from "next/image";
import StarRating from "../ui/StartRating";
import AddCart from "../icons/AddCart";
import QuantityControl from "../ui/QuantityControl"; // Importa el nuevo componente
import { useProductQuantity } from "@/app/hooks/useProductQuantity"; // Importa el hook

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
  // Opcional: Podrías pasar una función onAddToCart desde el padre si la lógica del carrito es global
  // onAddToCart: (productId: string, quantity: number) => void;
}

export default function ProductCard({
  product /*, onAddToCart */,
}: ProductCardProps) {
  // Usa el hook para manejar la cantidad de ESTE producto
  const { quantity, incrementQuantity, decrementQuantity } =
    useProductQuantity(1);

  // Manejador local para añadir al carrito (podría llamar a una prop del padre)
  const handleAddToCartClick = () => {
    console.log(
      `Añadir ${quantity} de ${product.name} (ID: ${product.id}) al carrito`
    );
    // Aquí llamarías a la función global del carrito, por ejemplo:
    // onAddToCart(product.id, quantity);
    // O si tienes un contexto/estado global:
    // cartContext.addItem(product.id, quantity);
  };

  return (
    // Contenedor principal
    <div className="group relative border border-gray-200 rounded-lg shadow-sm overflow-hidden m-2 w-40 sm:w-64 flex flex-col cursor-pointer">
      {/* Contenedor de la Imagen */}
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
        <p className="text-xs sm:text-md font-bold text-gray-900 mb-2">
          ${product.price.toFixed(2)}
        </p>

        {/* Controles posicionados absolutamente en la parte inferior */}
        <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between">
          {/* Componente de Controles de Cantidad */}
          <QuantityControl
            quantity={quantity}
            onIncrement={incrementQuantity}
            onDecrement={decrementQuantity}
          />

          {/* Botón Añadir al Carrito (Circular) */}
          <div>
            <button
              onClick={handleAddToCartClick} // Llama al manejador
              className="
                     flex items-center justify-center
                     w-8 h-8 sm:w-10 sm:h-10
                     bg-yellow-400
                     text-black
                     rounded-full
                     shadow-md
                     hover:bg-yellow-500
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400
                     transition-all duration-150 ease-in-out
                 "
              aria-label={`Añadir ${product.name} al carrito`}
            >
              <AddCart className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
