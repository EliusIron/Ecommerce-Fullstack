// src/app/components/cart/CartToastNotification.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import type { CartNotification } from "@/app/types/cart"; // Import CartNotification type

export default function CartToastNotification() {
  const { notification, clearNotification } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  // Store the notification data locally to persist during fade-out
  const [currentNotification, setCurrentNotification] =
    useState<CartNotification | null>(null);
  const internalTimerRef = useRef<NodeJS.Timeout | null>(null); // For handling exit animation timing

  useEffect(() => {
    // When a new notification arrives from context
    if (notification) {
      // Store it locally and make the component visible
      setCurrentNotification(notification);
      setIsVisible(true);

      // Clear any existing internal timer (e.g., from a previous exit animation)
      if (internalTimerRef.current) {
        clearTimeout(internalTimerRef.current);
        internalTimerRef.current = null;
      }
    }
    // When notification is cleared in context (e.g., by timer in context or manually)
    else if (!notification && isVisible) {
      // Start the exit animation by setting isVisible to false
      setIsVisible(false);

      // Set an internal timer to clear local data *after* animation completes
      internalTimerRef.current = setTimeout(() => {
        setCurrentNotification(null); // Clear local data
        internalTimerRef.current = null;
      }, 300); // Should match animation duration
    }

    // Cleanup internal timer on unmount
    return () => {
      if (internalTimerRef.current) {
        clearTimeout(internalTimerRef.current);
      }
    };
  }, [notification, isVisible]); // Depend on context notification and local visibility

  // Immediate close button handler
  const handleCloseClick = () => {
    // Clear context notification immediately
    clearNotification();
    // Start exit animation immediately
    setIsVisible(false);
    // Set timer to clear local data after animation
    if (internalTimerRef.current) clearTimeout(internalTimerRef.current);
    internalTimerRef.current = setTimeout(() => {
      setCurrentNotification(null);
      internalTimerRef.current = null;
    }, 300);
  };

  // Render nothing if there's no local notification data
  if (!currentNotification) {
    return null;
  }

  // Determine animation classes based on visibility state
  const animationClasses = isVisible ? "animate-toast-in" : "animate-toast-out";

  return (
    // Container positioned at bottom-right
    // Opacity is handled by the animation classes now
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm pointer-events-none">
      {" "}
      {/* Added pointer-events-none to container */}
      {/* Toast element */}
      <div
        className={`
          bg-white rounded-lg shadow-xl p-4 flex items-start space-x-3
          border border-gray-200
          pointer-events-auto /* Enable pointer events for the toast itself */
          ${animationClasses}
        `}
        role="alert"
        aria-live="assertive"
      >
        {/* Image */}
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
        {/* Text content */}
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
        {/* Close button */}
        <button
          onClick={handleCloseClick} // Use dedicated handler
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
