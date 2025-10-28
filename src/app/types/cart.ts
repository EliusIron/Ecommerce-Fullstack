// src/app/types/cart.ts
import { Product } from './product'; // Asumiendo que Product está en product.ts

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}