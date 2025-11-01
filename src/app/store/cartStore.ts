// src/app/store/cartStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/app/types/product";

// --- INTERFACES (Integradas) ---
// (Basado en CartState.ts y CartToastNotification.tsx)
export interface CartItem extends Product {
  quantity: number;
}

export interface CartNotification {
  message: string;
  productName: string;
  imageUrl: string;
  quantity: number;
}

// Interfaz para el estado y las acciones
export interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  // --- INICIO DE LA ACTUALIZACIÓN ---
  notification: CartNotification | null; // Estado para el toast
  // --- FIN DE LA ACTUALIZACIÓN ---

  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  // --- INICIO DE LA ACTUALIZACIÓN ---
  clearNotification: () => void; // Acción para limpiar el toast
  // --- FIN DE LA ACTUALIZACIÓN ---
}

// --- STORE BASE ---
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      // --- ESTADO INICIAL ---
      items: [],
      isDrawerOpen: false,
      notification: null, // Estado inicial del toast

      // --- ACCIONES ---
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === product.id
          );
          let newStateItems;
          let newQuantity = quantity;

          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            const currentQuantity = updatedItems[existingItemIndex].quantity;
            newQuantity = Math.max(0, currentQuantity + quantity); // Cantidad actualizada total
            
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: newQuantity,
            };

            if (updatedItems[existingItemIndex].quantity <= 0) {
              updatedItems.splice(existingItemIndex, 1);
            }
            newStateItems = updatedItems;
          } else if (quantity > 0) {
            newQuantity = quantity; // Cantidad nueva
            newStateItems = [...state.items, { ...product, quantity }];
          } else {
            newStateItems = state.items;
          }

          // --- INICIO DE LA ACTUALIZACIÓN ---
          // Al añadir un item, también crea la notificación
          const newNotification: CartNotification = {
            message: "Añadido al carrito",
            productName: product.name,
            imageUrl: product.imageUrl,
            quantity: newQuantity, // Usa la cantidad actualizada o nueva
          };

          return { items: newStateItems, notification: newNotification };
          // --- FIN DE LA ACTUALIZACIÓN ---
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),

      updateQuantity: (productId, newQuantity) =>
        set((state) => {
          if (newQuantity <= 0) {
            return {
              items: state.items.filter((item) => item.id !== productId),
            };
          }
          return {
            items: state.items.map((item) =>
              item.id === productId ? { ...item, quantity: newQuantity } : item
            ),
          };
        }),

      clearCart: () => set({ items: [] }),
      toggleDrawer: () =>
        set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
      
      // --- INICIO DE LA ACTUALIZACIÓN ---
      // Acción para que el Toast se limpie a sí mismo
      clearNotification: () => set({ notification: null }),
      // --- FIN DE LA ACTUALIZACIÓN ---
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      // Persistimos solo 'items' y 'isDrawerOpen'
      // La notificación no debe persistir, es temporal
      partialize: (state) => ({
        items: state.items,
        isDrawerOpen: state.isDrawerOpen,
      }),
    }
  )
);