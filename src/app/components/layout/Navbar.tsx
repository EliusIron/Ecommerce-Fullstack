// src/app/components/layout/Navbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import CartModal from "../cart/CartModal";
import { useCart } from "@/app/context/CartContext"; // Importa useCart

// --- Iconos ---
import WishlistIcon from "../icons/WishlistIcon";
import Orders from "../icons/orders";
import Cart from "../icons/Cart";
import Sign from "../icons/Sing";
import Cuba from "../icons/Cuba";

// --- Componentes UI ---
import FloatingLabelSearch from "../ui/FloatingLabelSearch";

// Componente reutilizable para el icono del carrito con contador
const CartIconWithBadge = () => {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <div className="relative">
      {" "}
      {/* Contenedor relativo para el badge */}
      <Cart className="w-6 h-6 text-green-600" />
      {itemCount > 0 && ( // Muestra el badge solo si hay items
        <span className="absolute -top-3 w-0.5 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getItemCount } = useCart(); // Llama al hook aquí también si necesitas el count directamente en Navbar
  const itemCount = getItemCount(); // Obtiene el número total de items

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <>
      {/* ===== BARRA SUPERIOR (Desktop y Mobile) ===== */}
      <nav className="flex flex-wrap items-center justify-between font-bold py-4 px-4 md:px-20 border-b border-gray-200 shadow-md">
        {/* ... (Logo y Búsqueda como antes) ... */}
        <div className="flex-shrink-0">
          <Link href={"/"}>Logo</Link>
        </div>
        <div className="relative w-full md:w-1/3 order-3 md:order-2 mt-4 md:mt-0">
          <FloatingLabelSearch
            id="navbar-search"
            placeholder="Buscar productos..."
          />
        </div>

        {/* LADO DERECHO: Enlaces (Responsive) */}
        <div className="flex flex-1 md:flex-none items-center justify-end gap-x-6 order-2 md:order-3">
          {/* --- ENLACES VISIBLES SOLO EN MÓVIL (ARRIBA DERECHA) --- */}
          <div className="flex md:hidden items-center gap-x-4">
            {/* ... (Region, Sign In como antes) ... */}
            <Link href="/" className="text-sm p-1">
              <Cuba className="w-6 h-6" />
            </Link>
            <Link
              href="/signin"
              className="bg-black text-white p-2 rounded-md text-sm font-medium hover:bg-gray-800"
            >
              <Sign className="w-5 h-5" />
            </Link>

            {/* --- Botón Carrito Móvil (USA EL NUEVO COMPONENTE) --- */}
            <button
              onClick={openCart}
              className="text-sm p-1"
              aria-label={`Abrir carrito (${itemCount} items)`}
            >
              <CartIconWithBadge /> {/* Usa el componente con badge */}
            </button>
          </div>

          {/* --- ENLACES VISIBLES SOLO EN ESCRITORIO --- */}
          <div className="hidden md:flex items-center gap-x-6">
            {/* ... (Órdenes, Wishlist como antes) ... */}
            <Link href="/orders" className="text-sm hover:no-underline">
              <div className="flex flex-col items-center gap-y-1">
                <Orders className="w-6 h-6 text-amber-600" />
                <div className="text-xs">orders</div>
              </div>
            </Link>
            <Link href="/wishlist" className="text-sm hover:no-underline">
              <div className="flex flex-col items-center gap-y-1">
                <WishlistIcon className="w-6 h-6 text-red-600" />
                <div className="text-xs">wishlist</div>
              </div>
            </Link>

            {/* 3. CARRITO (Desktop - USA EL NUEVO COMPONENTE) */}
            <button
              onClick={openCart}
              className="text-sm hover:no-underline"
              aria-label={`Abrir carrito (${itemCount} items)`}
            >
              <div className="flex flex-col items-center gap-y-1">
                <CartIconWithBadge /> {/* Usa el componente con badge */}
                <div className="text-xs">cart</div>
              </div>
            </button>

            {/* ... (Region, Sign In como antes) ... */}
            <Link href="/" className="text-sm hover:no-underline">
              <div className="flex flex-col items-center gap-y-1 ml-4 mr-4">
                <Cuba className="w-6 h-6 " />
                <div className="text-xs">Region</div>
              </div>
            </Link>
            <Link
              href="/signin"
              className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
            >
              <div className="flex items-center gap-x-2">
                <Sign className="w-5 h-5" />
                <span>Sign In</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== BARRA INFERIOR FIJA (Solo Mobile) ===== */}
      <nav className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 shadow-lg md:hidden z-50">
        <div className="flex items-center justify-around py-2">
          {/* ... (Órdenes, Wishlist como antes) ... */}
          <Link href="/orders" className="text-sm hover:no-underline">
            <div className="flex flex-col items-center gap-y-1">
              <Orders className="w-6 h-6 text-amber-600" />
              <div className="text-xs">orders</div>
            </div>
          </Link>
          <Link href="/wishlist" className="text-sm hover:no-underline">
            <div className="flex flex-col items-center gap-y-1">
              <WishlistIcon className="w-6 h-6 text-red-600" />
              <div className="text-xs">wishlist</div>
            </div>
          </Link>

          {/* Botón Carrito en barra inferior (USA EL NUEVO COMPONENTE) */}
          <button
            onClick={openCart}
            className="text-sm hover:no-underline"
            aria-label={`Abrir carrito (${itemCount} items)`}
          >
            <div className="flex flex-col items-center gap-y-1">
              <CartIconWithBadge /> {/* Usa el componente con badge */}
              <div className="text-xs">cart</div>
            </div>
          </button>
        </div>
      </nav>

      {/* Renderiza el Modal del Carrito */}
      <CartModal isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}
