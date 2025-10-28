// src/app/hooks/useProducts.ts
import { useState, useEffect } from 'react';
import type { Product, ErpProduct } from '@/app/types/product';

const ERP_FIELDS_TO_FETCH = [
  "name", "item_name", "item_group", "stock_uom",
  "standard_rate", // <-- Reemplaza con el nombre real del campo de precio
  "image"          // <-- Reemplaza con el nombre real del campo de imagen
];

// Accede a las variables de entorno
const apiKey = process.env.NEXT_PUBLIC_ERP_API_KEY;
const apiSecret = process.env.NEXT_PUBLIC_ERP_API_SECRET;
const apiUrlBase = process.env.NEXT_PUBLIC_ERP_API_URL;

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verifica si las variables de entorno están cargadas
    if (!apiKey || !apiSecret || !apiUrlBase) {
      setError("Error: Variables de entorno de la API del ERP no configuradas.");
      setIsLoading(false);
      console.error("Asegúrate de configurar NEXT_PUBLIC_ERP_API_KEY, NEXT_PUBLIC_ERP_API_SECRET y NEXT_PUBLIC_ERP_API_URL en tu archivo .env.local");
      return;
    }

    async function fetchProductsFromErp() {
      setIsLoading(true);
      setError(null);
      try {
        const apiUrl = `${apiUrlBase}/api/method/frappe.client.get_list`; // Construye la URL completa

        const requestBody = JSON.stringify({
          doctype: "Item",
          fields: ERP_FIELDS_TO_FETCH,
          limit_page_length: 100
        });

        const headers = new Headers();
        // Usa las variables de entorno para la autorización
        headers.append("Authorization", `token ${apiKey}:${apiSecret}`);
        headers.append("Content-Type", "application/json");

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: headers,
          body: requestBody
        });

        if (!response.ok) {
          let errorDetails = `Error HTTP: ${response.status}`;
          try {
            const errorData = await response.json();
            errorDetails += ` - ${errorData._error_message || JSON.stringify(errorData)}`;
          } catch { /* Ignora */ }
          throw new Error(errorDetails);
        }

        const data: { message: ErpProduct[] } = await response.json();

        if (!data.message) {
          throw new Error("La respuesta de la API no contiene la propiedad 'message'.");
        }

        const formattedProducts = data.message.map((erpProduct): Product => ({
          id: erpProduct.name,
          name: erpProduct.item_name || erpProduct.name,
          price: erpProduct.standard_rate || 0,
          imageUrl: erpProduct.image ? `${apiUrlBase}${erpProduct.image}` : "/placeholder.png", // Añade la URL base si la imagen es relativa
          rating: 4.5,
          reviewCount: undefined,
        }));

        setProducts(formattedProducts);
      } catch (e) {
        console.error("Fallo al obtener productos del ERP:", e);
        setError(e instanceof Error ? e.message : 'Ocurrió un error desconocido');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProductsFromErp();
  }, []); // Las dependencias ahora son implícitas por las variables fuera del hook

  return { products, isLoading, error };
}