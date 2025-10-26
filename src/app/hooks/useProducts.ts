// src/app/hooks/useProducts.ts
import { useState, useEffect } from 'react';
import type { Product, ApiProduct } from '@/app/types/product'; // Asegúrate que la ruta sea correcta

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiProduct[] = await response.json();

        const formattedProducts = data.map((apiProduct) => ({
          id: String(apiProduct.id),
          name: apiProduct.title,
          price: apiProduct.price,
          imageUrl: apiProduct.image,
          rating: apiProduct.rating.rate,
          reviewCount: apiProduct.rating.count,
        }));

        setProducts(formattedProducts);
      } catch (e) {
        console.error("Failed to fetch products:", e);
        setError(e instanceof Error ? e.message : 'Ocurrió un error desconocido');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []); // Se ejecuta solo una vez al montar

  return { products, isLoading, error };
}