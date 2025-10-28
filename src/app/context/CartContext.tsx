// src/app/context/CartContext.tsx
"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import type { CartItem, CartState, CartNotification } from "@/app/types/cart";
import type { Product } from "@/app/types/product";

const CART_STORAGE_KEY = "myAppCartItems";

// REMOVED getInitialState function - Initial state will always be empty array

const CartContext = createContext<CartState | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  // Initialize state as empty array ALWAYS for the first render
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false); // Flag to track hydration

  const [notification, setNotification] = useState<CartNotification | null>(
    null
  );
  const notificationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Effect to load from localStorage ONLY ON CLIENT after initial render/hydration
  useEffect(() => {
    // This effect runs only on the client side after the component mounts
    if (typeof window !== "undefined") {
      try {
        const storedItems = localStorage.getItem(CART_STORAGE_KEY);
        if (storedItems) {
          setItems(JSON.parse(storedItems)); // Load the stored items into state
        }
      } catch (error) {
        console.error("Error al leer el carrito de localStorage:", error);
      } finally {
        setIsInitialLoadComplete(true); // Mark initial load as complete
      }
    } else {
      setIsInitialLoadComplete(true); // Also mark complete on server (though localStorage won't load)
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to save to localStorage whenever 'items' changes, AFTER initial load
  useEffect(() => {
    // Only save to localStorage if the initial load from it is complete
    // and we are on the client side. Prevents overwriting loaded state during hydration.
    if (isInitialLoadComplete && typeof window !== "undefined") {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error("Error al guardar el carrito en localStorage:", error);
      }
    }
  }, [items, isInitialLoadComplete]); // Depend on items AND the load completion flag

  // --- Functions (clearNotification, addItem, etc.) remain largely the same ---
  // (Ensure clearNotification logic is robust)
  const clearNotification = useCallback(() => {
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
      notificationTimerRef.current = null;
    }
    setNotification(null);
  }, []);

  const addItem = useCallback((product: Product, quantity: number) => {
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
      notificationTimerRef.current = null;
    }
    setNotification(null);

    setTimeout(() => {
      setItems((prevItems) => {
        // ... (add/update logic same as before) ...
        const existingItemIndex = prevItems.findIndex(
          (item) => item.id === product.id
        );
        if (existingItemIndex > -1) {
          const updatedItems = [...prevItems];
          const newQuantity =
            updatedItems[existingItemIndex].quantity + quantity;
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: Math.max(1, newQuantity),
          };
          return updatedItems;
        } else {
          if (quantity > 0) {
            return [...prevItems, { ...product, quantity }];
          }
          return prevItems;
        }
      });

      setNotification({
        message: "Producto añadido al carrito",
        productName: product.name,
        imageUrl: product.imageUrl,
        quantity: quantity,
      });

      notificationTimerRef.current = setTimeout(() => {
        setNotification(null);
        notificationTimerRef.current = null;
      }, 3000);
    }, 50);
  }, []); // Removed clearNotification dependency

  // ... (removeItem, updateQuantity, clearCart, getItemCount, getSubtotal remain the same) ...
  const removeItem = useCallback((productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.id !== productId);
      }
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    clearNotification(); // Also clear notification when cart is cleared
  }, [clearNotification]);

  const getItemCount = useCallback(() => {
    // Ensure count is only calculated after initial load if needed,
    // but generally okay as it depends on `items` which updates post-hydration.
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const getSubtotal = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getSubtotal,
    notification,
    clearNotification,
  };

  // Conditionally render children only after initial load? Maybe not necessary,
  // let child components handle potential initial state differences if needed.
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook remains the same
export const useCart = (): CartState => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
