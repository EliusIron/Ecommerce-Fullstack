// src/app/store/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '@/app/types/product'; //

// --- INTERFACES ---
export interface CartItem extends Product {
  quantity: number;
}

// Interfaz para el estado y las acciones
export interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
}

// --- STORE BASE ---
// Exportamos el hook principal 'useCartStore'
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      // --- ESTADO INICIAL ---
      items: [],
      isDrawerOpen: false, 
      
      // --- ACCIONES ---
      addItem: (product, quantity = 1) => set((state) => {
        const existingItemIndex = state.items.findIndex(item => item.id === product.id);
        let newStateItems;
        if (existingItemIndex > -1) {
          const updatedItems = [...state.items];
          const currentQuantity = updatedItems[existingItemIndex].quantity;
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: Math.max(0, currentQuantity + quantity),
          };
          if (updatedItems[existingItemIndex].quantity <= 0) {
            updatedItems.splice(existingItemIndex, 1);
          }
          newStateItems = updatedItems;
        } else if (quantity > 0) {
          newStateItems = [...state.items, { ...product, quantity }];
        } else {
          newStateItems = state.items;
        }
        return { items: newStateItems };
      }),
      removeItem: (productId) => set((state) => ({ items: state.items.filter(item => item.id !== productId) })),
      updateQuantity: (productId, newQuantity) => set((state) => {
        if (newQuantity <= 0) {
          return { items: state.items.filter(item => item.id !== productId) };
        }
        return {
          items: state.items.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          ),
        };
      }),
      clearCart: () => set({ items: [] }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
    }),
    {
      name: 'cart-storage', // Nombre para localStorage
      storage: createJSONStorage(() => localStorage),
      // Persistimos solo 'items' y 'isDrawerOpen'
      partialize: (state) => ({ 
        items: state.items, 
        isDrawerOpen: state.isDrawerOpen 
      }),
    }
  )
);