// src/app/types/product.ts

// Estructura de datos de la API
export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  // Agrega otros campos si los necesitas (description, category)
}

// Estructura de datos que espera tu componente ProductCard
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount?: number;
}