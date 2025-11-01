// src/app/types/cart.ts
import { Product } from './product';

export interface CartItem extends Product {
  quantity: number;
}

// Interface for the notification data
export interface CartNotification {
  message: string;
  productName: string;
  imageUrl: string;
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
  // --- Notification State ---
  notification: CartNotification | null; // Holds current notification data
  clearNotification: () => void; // Function to dismiss notification
}