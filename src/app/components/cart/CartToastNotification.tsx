// src/app/components/cart/CartToastNotification.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
// Importa el store de Zustand y el tipo de notificación
import { useCartStore, CartNotification } from "@/app/store/cartStore";

export default function CartToastNotification() {
  // --- CONECTADO A ZUSTAND ---
  // 1. Selecciona el estado y la acción del store
  const { notification, clearNotification } = useCartStore((state) => ({
    notification: state.notification,
    clearNotification: state.clearNotification,
  }));
  // --- FIN DE LA CONEXIÓN ---

  const [isVisible, setIsVisible] = useState(false);
  // Store de la notificación localmente para persistir durante el fade-out
  const [currentNotification, setCurrentNotification] =
    useState<CartNotification | null>(null);

  // Timer para la animación de salida
  const internalTimerRef = useRef<NodeJS.Timeout | null>(null);
  // Timer para auto-cerrar el toast
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Limpia timers anteriores si existen
    if (internalTimerRef.current) clearTimeout(internalTimerRef.current);
    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);

    // Cuando llega una nueva notificación del store de Zustand
    if (notification) {
      setCurrentNotification(notification);
      setIsVisible(true);

      // Inicia un timer para auto-cerrar la notificación
      autoCloseTimerRef.current = setTimeout(() => {
        clearNotification(); // Llama a la acción de Zustand para limpiar
      }, 3000); // Cierra después de 3 segundos
    }
    // Cuando la notificación se limpia en el store (ya sea por el timer o manualmente)
    else if (!notification && isVisible) {
      setIsVisible(false); // Inicia la animación de salida

      // Inicia un timer interno para limpiar los datos locales *después* de la animación
      internalTimerRef.current = setTimeout(() => {
        setCurrentNotification(null); // Limpia datos locales
      }, 300); // Debe coincidir con la duración de la animación
    }

    // Limpia ambos timers al desmontar
    return () => {
      if (internalTimerRef.current) clearTimeout(internalTimerRef.current);
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    };
  }, [notification, isVisible, clearNotification]); // Depende de la notificación del store

  // Manejador del botón de cierre inmediato
  const handleCloseClick = () => {
    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current); // Cancela el auto-cierre
    clearNotification(); // Limpia el estado en Zustand inmediatamente
  };

  // No renderiza nada si no hay datos de notificación locales
  if (!currentNotification) {
    return null;
  }

  // Determina las clases de animación
  const animationClasses = isVisible ? "animate-toast-in" : "animate-toast-out";

  return (
    // Container posicionado
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm pointer-events-none">
      {/* Elemento Toast */}
      <div
        className={`
          bg-white rounded-lg shadow-xl p-4 flex items-start space-x-3
          border border-gray-200
          pointer-events-auto /* Habilita eventos de puntero para el toast */
          ${animationClasses}
        `}
        role="alert"
        aria-live="assertive"
      >
        {/* Imagen */}
        <div className="relative w-12 h-12 flex-shrink-0">
          <Image
            src={currentNotification.imageUrl || "/placeholder.png"}
            alt={currentNotification.productName}
            fill
            style={{ objectFit: "contain" }}
            className="rounded border"
            sizes="48px"
          />
        </div>
        {/* Contenido de texto */}
        <div className="flex-grow min-w-0">
          <p className="text-sm font-semibold text-green-700">
            {currentNotification.message}
          </p>
          <p
            className="text-sm font-medium text-gray-800 line-clamp-1"
            title={currentNotification.productName}
          >
            {currentNotification.productName}
          </p>
          <p className="text-xs text-gray-500">
            Cantidad: {currentNotification.quantity}
          </p>
        </div>
        {/* Botón de cierre */}
        <button
          onClick={handleCloseClick} // Usa el manejador de cierre
          className="text-gray-400 hover:text-gray-600 flex-shrink-0 p-1 -m-1"
          aria-label="Cerrar notificación"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
