// src/app/types/product.ts

export interface ErpProduct {
  name: string; // Este es el ID principal en ERPNext
  item_name: string; // Nombre descriptivo
  // Añade aquí OTROS CAMPOS que necesites del ERP
  standard_rate?: number; // Ejemplo: Precio (busca el nombre correcto en ERPNext)
  image?: string; // Ejemplo: Imagen (busca el nombre correcto en ERPNext)
  item_group: string;
  stock_uom: string;
  // ...otros campos relevantes...
}

// Estructura que espera tu ProductCard
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating: number; // Considera si lo obtienes del ERP o usas un valor por defecto
  reviewCount?: number;
}