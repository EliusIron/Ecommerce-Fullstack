// src/app/components/Products/ProductList.tsx
import React from "react";
import ProductCard from "./ProductCard"; // Ajusta la ruta si es necesario
import type { Product } from "@/app/types/product"; // Asegúrate que la ruta sea correcta
import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}
const SKELETON_COUNT = 10;

export default function ProductList({
  products,
  isLoading,
  error,
}: ProductListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5 place-items-center md:place-items-start">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <ProductCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }
  if (products.length === 0) {
    return <p>No se encontraron productos.</p>;
  }

  if (error) {
    return <p className="text-red-600">Error al cargar productos: {error}</p>;
  }

  if (products.length === 0) {
    return <p>No se encontraron productos.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5 place-items-center md:place-items-start">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          // --- CORRECCIÓN LCP ---
          // Prioriza la carga de las primeras 10 imágenes
          isPriority={index < SKELETON_COUNT}
          // --------------------
        />
      ))}
    </div>
  );
}
