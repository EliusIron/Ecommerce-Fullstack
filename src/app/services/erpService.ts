// src/app/services/erpService.ts
import type { ErpProduct } from '@/app/types/product'; //

// Accede a las variables de entorno
const apiKey = process.env.NEXT_PUBLIC_ERP_API_KEY; //
const apiSecret = process.env.NEXT_PUBLIC_ERP_API_SECRET; //
const apiUrlBase = process.env.NEXT_PUBLIC_ERP_API_URL; //

const ERP_FIELDS_TO_FETCH = [ //
  "name", "item_name", "item_group", "stock_uom",
  "standard_rate",
  "image"
];

/**
 * Realiza una petición POST genérica a la API del ERP.
 * @param endpoint - El endpoint específico de la API (ej: /api/method/frappe.client.get_list).
 * @param body - El cuerpo de la solicitud en formato JSON.
 * @returns La respuesta JSON de la API.
 * @throws Error si las variables de entorno no están configuradas o si la respuesta no es OK.
 */
async function fetchFromERP<T>(endpoint: string, body: object): Promise<T> {
  if (!apiKey || !apiSecret || !apiUrlBase) { //
    console.error("Error: ERP API environment variables not configured."); //
    throw new Error("Error: Variables de entorno de la API del ERP no configuradas."); //
  }

  const apiUrl = `${apiUrlBase}${endpoint}`; //
  const headers = new Headers(); //
  headers.append("Authorization", `token ${apiKey}:${apiSecret}`); //
  headers.append("Content-Type", "application/json"); //

  const response = await fetch(apiUrl, { //
    method: 'POST', //
    headers: headers, //
    body: JSON.stringify(body) //
  });

  if (!response.ok) { //
    let errorDetails = `Error HTTP: ${response.status}`; //
    try {
      const errorData = await response.json(); //
      errorDetails += ` - ${errorData._error_message || JSON.stringify(errorData)}`; //
    } catch { /* Ignora si no se puede parsear el cuerpo del error */ } //
    throw new Error(errorDetails); //
  }

  const data = await response.json(); //
  return data as T;
}

/**
 * Obtiene la lista de productos (Items) desde el ERP.
 * @returns Una promesa que resuelve a un array de ErpProduct.
 * @throws Error si la respuesta de la API no contiene la propiedad 'message'.
 */
export async function getProductListFromERP(): Promise<ErpProduct[]> {
  // Define el cuerpo específico para obtener la lista de items
  const requestBody = { //
    doctype: "Item", //
    fields: ERP_FIELDS_TO_FETCH, //
    limit_page_length: 100 //
  };

  // Llama a la función genérica de fetch
  const responseData = await fetchFromERP<{ message: ErpProduct[] }>('/api/method/frappe.client.get_list', requestBody); //

  // Valida la estructura esperada de la respuesta
  if (!responseData || !responseData.message) { //
    throw new Error("La respuesta de la API no contiene la propiedad 'message' esperada."); //
  }

  // Devuelve solo la lista de productos
  return responseData.message; //
}

// --- Puedes añadir más funciones aquí para otras operaciones del ERP ---
// export async function getProductByIdFromERP(productId: string): Promise<ErpProduct | null> { ... }
// export async function createOrderInERP(orderDetails: any): Promise<any> { ... }