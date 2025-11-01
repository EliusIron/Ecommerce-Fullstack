// src/app/hooks/useProducts.ts (Refactorizado)
import { useState, useEffect } from 'react';
import type { Product, ErpProduct } from '@/app/types/product'; //
import { getProductListFromERP } from '@/app/services/erpService'; // Importa la nueva función

// Función auxiliar para mapear datos (puede estar en un archivo utils)
function formatErpProduct(erpProduct: ErpProduct, baseUrl: string): Product {
  return {
    id: erpProduct.name, //
    name: erpProduct.item_name || erpProduct.name, //
    price: erpProduct.standard_rate || 0, //
    imageUrl: erpProduct.image ? `${baseUrl}${erpProduct.image}` : "/placeholder.png", //
    rating: 4.5, //
    reviewCount: undefined, //
  };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]); //
  const [isLoading, setIsLoading] = useState(true); //
  const [error, setError] = useState<string | null>(null); //
  const apiUrlBase = process.env.NEXT_PUBLIC_ERP_API_URL || ''; // Necesario para construir imageUrl

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true); //
      setError(null); //
      try {
        // Llama a la función del servicio
        const erpProducts = await getProductListFromERP();

        // Mapea los datos aquí (o podrías hacerlo en el servicio si prefieres)
        const formattedProducts = erpProducts.map(p => formatErpProduct(p, apiUrlBase)); //
        setProducts(formattedProducts); //
      } catch (e) {
        console.error("Fallo al obtener productos:", e); //
        setError(e instanceof Error ? e.message : 'Ocurrió un error desconocido'); //
      } finally {
        setIsLoading(false); //
      }
    }

    loadProducts();
  }, [apiUrlBase]); // Dependencia explícita si la URL base pudiera cambiar (aunque suele ser constante)

  return { products, isLoading, error }; //
}