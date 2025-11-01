// src/app/components/cart/CartDrawer.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useCartStore, CartItem } from "@/app/store/cartStore"; // Importa el store y el TIPO
import Link from "next/link";
import Image from "next/image";

// Funciones auxiliares fuera del componente
const calculateTotalItems = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.quantity, 0);

const calculateTotalPrice = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

export default function CartDrawer() {
  // --- INICIO DE LA SOLUCIÓN DE HIDRATACIÓN ---

  // 1. Estado local. VALORES POR DEFECTO (los del servidor)
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isMounted, setIsMounted] = useState(false); // Flag de montaje

  // 2. Selecciona solo las acciones (son estables)
  const { toggleDrawer, removeItem, updateQuantity } = useCartStore(
    (state) => ({
      toggleDrawer: state.toggleDrawer,
      removeItem: state.removeItem,
      updateQuantity: state.updateQuantity,
    })
    // ¡NO NECESITA SHALLOW! Las acciones son estables.
  );

  // 3. Suscripción manual en useEffect
  useEffect(() => {
    // Sincroniza el estado inicial del cliente (de localStorage)
    const currentState = useCartStore.getState();
    setIsOpen(currentState.isDrawerOpen);
    setItems(currentState.items);
    setTotalItems(calculateTotalItems(currentState.items));
    setTotalPrice(calculateTotalPrice(currentState.items));

    // Marca como montado
    setIsMounted(true);

    // Suscríbete a futuros cambios
    const unsubscribe = useCartStore.subscribe((state) => {
      setIsOpen(state.isDrawerOpen);
      setItems(state.items);
      setTotalItems(calculateTotalItems(state.items));
      setTotalPrice(calculateTotalPrice(state.items));
    });

    // 4. Limpia la suscripción
    return () => unsubscribe();
  }, []); // Array vacío = ejecutar una vez en el montaje

  // --- FIN DE LA SOLUCIÓN DE HIDRATACIÓN ---

  // 5. NO RENDERIZAR NADA HASTA QUE ESTÉ MONTADO
  // Esto es lo que soluciona el 'mismatch'
  if (!isMounted) {
    return null;
  }

  // 6. Ahora, si está montado, renderiza basado en el estado 'isOpen'
  if (!isOpen) {
    return null;
  }

  return (
    // Fondo oscuro (Overlay)
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
      onClick={toggleDrawer} // Usa la acción estable
      aria-modal="true"
      role="dialog"
    >
      {/* Contenedor del panel */}
      <div
        className="fixed top-0 right-0 z-50 w-full max-w-sm h-full bg-white shadow-xl transition-transform duration-300 ease-in-out transform translate-x-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Encabezado */}
          <div className="flex items-center justify-between p-4 border-b">
            {/* Usa el estado local 'totalItems' */}
            <h2 className="text-lg font-semibold">Tu Carrito ({totalItems})</h2>
            <button
              onClick={toggleDrawer} // Usa la acción estable
              className="text-gray-500 hover:text-gray-800 text-2xl"
              aria-label="Cerrar carrito"
            >
              &times;
            </button>
          </div>

          {/* Lista de Items */}
          {/* Usa el estado local 'items' */}
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-grow p-4">
              <p className="text-gray-500">Tu carrito está vacío.</p>
              <button
                onClick={toggleDrawer} // Usa la acción estable
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {/* Usa el estado local 'items' */}
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-500">
                      ${item.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)} // Usa la acción estable
                      className="text-xs text-red-500 hover:underline mt-1"
                    >
                      Eliminar
                    </button>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="text-sm font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center border rounded mt-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2 py-0.5 text-lg hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3 text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-0.5 text-lg hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pie de página (Footer) */}
          {/* Usa 'items' y 'totalPrice' locales */}
          {items.length > 0 && (
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Subtotal:</span>
                <span className="text-lg font-semibold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={toggleDrawer} // Usa la acción estable
                className="w-full text-center block px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
              >
                Ir a Pagar
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
