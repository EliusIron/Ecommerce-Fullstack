// src/app/components/layout/Navbar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useCartStore } from "@/app/store/cartStore"; // Importa el store principal
import useStore from "@/app/hooks/useStore";

// --- Iconos ---
import WishlistIcon from "../icons/WishlistIcon";
import Orders from "../icons/orders";
import Cart from "../icons/Cart";
import Sign from "../icons/Sing";
import Cuba from "../icons/Cuba";
import FloatingLabelSearch from "../ui/FloatingLabelSearch";

export default function Navbar() {
  // --- INICIO DE LA CORRECCIÓN ---

  const items = useStore(useCartStore, (state) => state.items);
  const totalItems =
    items?.reduce((total, item) => total + item.quantity, 0) ?? 0;
  const { toggleDrawer } = useCartStore();

  // --- FIN DE LA CORRECCIÓN ---

  return (
    <>
      {/* ===== BARRA SUPERIOR (Desktop y Mobile) ===== */}
      <nav className="flex flex-wrap items-center justify-between font-bold py-4 px-4 md:px-20 border-b border-gray-200 shadow-md">
        {/* LADO IZQUIERDO: Logo */}
        <div className="flex-shrink-0">
          <Link href={"/"}>Logo</Link>
        </div>
        {/* CENTRO: Barra de Búsqueda (Responsive) */}
        <div className="relative w-full md:w-1/3 order-3 md:order-2 mt-4 md:mt-0">
          <FloatingLabelSearch
            id="navbar-search"
            placeholder="Buscar productos..."
          />
        </div>
        {/* LADO DERECHO: Enlaces (Responsive) */}
        <div className="flex flex-1 md:flex-none items-center justify-end gap-x-6 order-2 md:order-3">
          {/* --- ENLACES VISIBLES SOLO EN MÓVIL (ARRIBA DERECHA) --- */}
          <div className="flex md:hidden items-center gap-x-6">
            <Link href="/" className="text-sm hover:no-underline">
              <div className="flex flex-col items-center gap-x-2">
                <Cuba className="w-6 h-6" />
              </div>
            </Link>
            <Link
              href="/signin"
              className="bg-black text-white px-2 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
            >
              <div className="flex items-center gap-x-2">
                <Sign className="w-6 h-6" />
              </div>
            </Link>
          </div>
          {/* --- ENLACES VISIBLES SOLO EN ESCRITORIO --- */}
          <div className="hidden md:flex items-center gap-x-6">
            {/* 1. ÓRDENES (Desktop) */}
            <Link href="/orders" className="text-sm hover:no-underline">
              <div className="flex flex-col items-center gap-x-2">
                <Orders className="w-6 h-6 text-amber-600" />
                <div>orders</div>
              </div>
            </Link>
            {/* 2. WISHLIST (Desktop) */}
            <Link href="/wishlist" className="text-sm hover:no-underline">
              <div className="flex flex-col items-center">
                <WishlistIcon className="w-6 h-6 text-red-600" />
                <div>wishlist</div>
              </div>
            </Link>
            {/* 3. CARRITO (Desktop) - USA EL ESTADO DE ZUSTAND */}
            <button
              onClick={toggleDrawer} // Usa la acción estable
              className="text-sm hover:no-underline relative cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <Cart className="w-6 h-6 text-green-600" />
                <div>cart</div>
              </div>
              {/* 4. Renderiza usando 'totalItems' del store */}
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            {/* 4. REGION (Desktop) */}
            <Link href="/cart" className="text-sm hover:no-underline">
              <div className="flex flex-col items-center w-6 ml-4 mr-4">
                <Cuba className="w-6 h-6 " />
                <div>Region</div>
              </div>
            </Link>
            {/* 5. SIGN IN (Desktop) */}
            <Link
              href="/signin"
              className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
            >
              <div className="flex items-center gap-x-2">
                <Sign className="w-6 h-6" />
                <span>Sign In</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== BARRA INFERIOR FIJA (Solo Mobile) ===== */}
      <nav className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 shadow-lg md:hidden z-50">
        <div className="flex items-center justify-around py-2">
          {/* ... (Orders, Wishlist) ... */}
          <Link href="/orders" className="text-sm hover:no-underline">
            <div className="flex flex-col items-center gap-x-1">
              <Orders className="w-6 h-6 text-amber-600" />
              <div className="text-xs">orders</div>
            </div>
          </Link>
          <Link href="/wishlist" className="text-sm hover:no-underline">
            <div className="flex flex-col items-center gap-x-1">
              <WishlistIcon className="w-6 h-6 text-red-600" />
              <div className="text-xs">wishlist</div>
            </div>
          </Link>
          {/* Carrito (Móvil) */}
          <button
            onClick={toggleDrawer} // Usa la acción estable
            className="text-sm hover:no-underline relative cursor-pointer"
          >
            <div className="flex flex-col items-center gap-x-1">
              <Cart className="w-6 h-6 text-green-600" />
              <div className="text-xs">cart</div>
            </div>
            {/* 4. Renderiza usando 'totalItems' del store */}
            {totalItems > 0 && (
              <span className="absolute -top-1 right-1 bg-red-600 text-white text-[10px] rounded-full h-3.5 w-3.5 flex items-center justify-center p-0.5">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
