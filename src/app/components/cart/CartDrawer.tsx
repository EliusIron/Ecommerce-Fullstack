// src/app/components/cart/CartDrawer.tsx
"use client";

import React from "react";
import { useCartStore, CartItem } from "@/app/store/cartStore";
import Link from "next/link";
import Image from "next/image";

// 1. Importa los componentes de UI que ya tenías
import QuantityControl from "../ui/QuantityControl";
import TrashIcon from "../icons/TrashIcon";

// Funciones auxiliares fuera del componente
const calculateTotalItems = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.quantity, 0);

const calculateTotalPrice = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

// 2. Iconos placeholder (idealmente mover a /icons)
const SimpleCartIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);
const SimplePaymentIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
    />
  </svg>
);

export default function CartDrawer() {
  const isOpen = useCartStore((state) => state.isDrawerOpen);
  const items = useCartStore((state) => state.items);
  const toggleDrawer = useCartStore((state) => state.toggleDrawer);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const totalItems = calculateTotalItems(items);
  const totalPrice = calculateTotalPrice(items);

  // 4. Renderiza el componente y usa 'isOpen' para las clases condicionales
  //    No usamos `if (!isOpen) return null;` para permitir la animación de salida
  return (
    // Fondo oscuro (Overlay)
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 
                 transition-opacity duration-300 ease-in-out 
                 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={toggleDrawer}
      aria-modal="true"
      role="dialog"
      aria-hidden={!isOpen}
    >
      {/* Contenedor del panel (Drawer) */}
      <div
        className={`fixed top-0 right-0 z-50 w-full max-w-md h-full bg-white shadow-xl 
                   transition-transform duration-300 ease-in-out transform 
                   ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Encabezado */}
          <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
            <h2 className="text-lg font-semibold">Tu Carrito ({totalItems})</h2>
            <button
              onClick={toggleDrawer}
              className="text-gray-500 hover:text-gray-800 text-2xl"
              aria-label="Cerrar carrito"
            >
              &times;
            </button>
          </div>

          {/* Lista de Items */}
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-grow p-4">
              <p className="text-gray-500">Tu carrito está vacío.</p>
              <button
                onClick={toggleDrawer}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            // 5. Cuerpo del carrito (con scroll) y estilos del Modal
            <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {items.map((item: CartItem) => (
                  <div
                    key={item.id}
                    className="bg-white p-3 rounded-lg shadow border border-gray-200"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                        <Image
                          src={item.imageUrl || "/placeholder.png"}
                          alt={item.name}
                          fill
                          style={{ objectFit: "contain" }}
                          className="rounded border bg-white p-1"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p
                            className="font-semibold text-sm sm:text-base line-clamp-2 mr-2"
                            title={item.name}
                          >
                            {item.name}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                            aria-label={`Eliminar ${item.name}`}
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">
                          Precio unitario: ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <QuantityControl
                            quantity={item.quantity}
                            onIncrement={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            onDecrement={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          />
                          <div className="text-right">
                            <p className="text-xs text-gray-500">IMPORTE</p>
                            <p className="font-semibold text-sm sm:text-base">
                              ${(item.price * item.quantity).toFixed(2)} US$
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Pie de página (Footer) con estilos del Modal */}
          {items.length > 0 && (
            <div className="bg-white p-4 border-t flex-shrink-0 shadow-inner">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">
                  Subtotal ({totalItems}{" "}
                  {totalItems === 1 ? "producto" : "productos"}):
                </span>
              </div>
              <p className="text-xl font-bold text-gray-900 mb-4">
                ${totalPrice.toFixed(2)} US$
              </p>

              <div className="flex space-x-3">
                <Link
                  href="/cart"
                  onClick={toggleDrawer}
                  className="flex-1 flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <SimpleCartIcon className="w-5 h-5 mr-2" />
                  Ir al carro
                </Link>
                <Link
                  href="/checkout" // (Enlace directo a checkout)
                  onClick={toggleDrawer}
                  className="flex-1 flex items-center justify-center text-black py-2.5 px-4 rounded-lg transition-colors text-sm font-medium bg-yellow-400 hover:bg-yellow-500"
                >
                  <SimplePaymentIcon className="w-5 h-5 mr-2" />
                  Pagar
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
