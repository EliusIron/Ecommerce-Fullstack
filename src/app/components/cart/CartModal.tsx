// src/app/components/cart/CartModal.tsx
import React from "react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import type { CartItem } from "@/app/types/cart";
import QuantityControl from "../ui/QuantityControl";
import TrashIcon from "../icons/TrashIcon"; // Make sure you have this icon

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// --- Placeholders for icons (replace with your actual icons if available) ---
const SimpleCartIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
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
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
    />
  </svg>
);
// --- End Icon Placeholders ---

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeItem, updateQuantity, getSubtotal, getItemCount } =
    useCart();
  const subtotal = getSubtotal();
  const itemCount = getItemCount();

  // We don't return null immediately anymore, to allow the exit animation.
  // We control visibility via opacity and pointer-events on the overlay.

  return (
    // Overlay oscuro de fondo - Added transition for opacity
    <div
      className={`fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40 flex justify-end 
                 transition-opacity duration-300 ease-in-out 
                 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} // Control visibility & interaction
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen} // Control accessibility state
      aria-labelledby="cart-modal-title"
    >
      {/* Contenedor del Modal - Added transition and transform */}
      <div
        className={`w-full max-w-md h-full bg-white shadow-xl z-50 flex flex-col 
                   transition-transform duration-300 ease-in-out transform 
                   ${isOpen ? "translate-x-0" : "translate-x-full"}`} // Slide animation
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado del Modal */}
        <div className="flex justify-between items-center p-4 border-b flex-shrink-0">
          <h2 id="cart-modal-title" className="text-lg font-semibold">
            Productos en el carro
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl p-1 leading-none"
            aria-label="Cerrar carrito"
          >
            &times;
          </button>
        </div>

        {/* Contenido del Carrito (Scrollable) */}
        <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 pt-10">
              Tu carrito está vacío.
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item: CartItem) => (
                // Card de Item
                <div
                  key={item.id}
                  className="bg-white p-3 rounded-lg shadow border border-gray-200"
                >
                  <div className="flex items-start space-x-3">
                    {/* Imagen */}
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
                    {/* Detalles */}
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
                      {/* Promo Tag Placeholder */}
                      <div className="inline-flex items-center bg-red-600 text-white text-xs font-medium px-2 py-0.5 rounded mb-1">
                        ⭐ PROMO YEYA
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">
                        Precio unitario: ${item.price.toFixed(2)}
                      </p>
                      {/* Controles y Precio Total Item */}
                      <div className="flex items-center justify-between mt-2">
                        <QuantityControl
                          quantity={item.quantity}
                          onIncrement={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          onDecrement={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          buttonClassName="w-6 h-6 flex items-center justify-center text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                          quantityClassName="text-sm font-medium w-8 text-center px-1"
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
          )}
        </div>

        {/* Pie del Modal */}
        <div className="bg-white p-4 border-t flex-shrink-0 shadow-inner">
          {items.length > 0 && (
            <div className="flex items-center text-xs mb-2">
              <span className="inline-flex items-center bg-red-600 text-white font-medium px-2 py-0.5 rounded mr-2">
                ⭐ PROMO YEYA
              </span>
              <span className="font-bold text-red-600">
                ${subtotal.toFixed(2)} US$
              </span>
              <span className="text-gray-500 line-through ml-1">
                de $120.00 US$
              </span>
            </div>
          )}
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">
              Subtotal ({itemCount} {itemCount === 1 ? "producto" : "productos"}
              ):
            </span>
          </div>
          <p className="text-xl font-bold text-red-600 mb-4">
            ${subtotal.toFixed(2)} US$
          </p>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <SimpleCartIcon className="w-5 h-5 mr-2" />
              Ir al carro
            </button>
            <button
              disabled={items.length === 0}
              className={`flex-1 flex items-center justify-center text-black py-2.5 px-4 rounded-lg transition-colors text-sm font-medium ${
                items.length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500"
              }`}
            >
              <SimplePaymentIcon className="w-5 h-5 mr-2" />
              Pagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
