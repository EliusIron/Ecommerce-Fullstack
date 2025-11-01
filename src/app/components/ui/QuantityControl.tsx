// src/app/components/ui/QuantityControl.tsx
"use client"; // Necesario porque tiene botones con onClick

import React from "react";

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  minQuantity?: number; // Opcional: cantidad mínima (por defecto 1)
}

export default function QuantityControl({
  quantity,
  onIncrement,
  onDecrement,
  minQuantity = 1,
}: QuantityControlProps) {
  return (
    <div className="flex items-center border border-gray-300 rounded">
      <button
        onClick={onDecrement}
        disabled={quantity <= minQuantity} // Deshabilita si es menor o igual al mínimo
        className="px-2 py-1 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        aria-label="Disminuir cantidad"
      >
        -
      </button>
      <span className="px-3 py-1 text-sm font-medium text-gray-800 border-x border-gray-300">
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        className="px-2 py-1 text-gray-700 hover:bg-gray-100"
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );
}
