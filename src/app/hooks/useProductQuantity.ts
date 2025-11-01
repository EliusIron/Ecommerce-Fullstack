// src/app/hooks/useProductQuantity.ts
"use client"; // Este es un hook de cliente, necesita la directiva

import { useState } from 'react';

const MIN_QUANTITY = 1; // Cantidad mínima

export function useProductQuantity(initialQuantity = MIN_QUANTITY) {
  const [quantity, setQuantity] = useState(initialQuantity);

  // Función para incrementar la cantidad
  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Función para decrementar la cantidad, con un mínimo
  const decrementQuantity = () => {
    setQuantity(prevQuantity => Math.max(MIN_QUANTITY, prevQuantity - 1));
  };

  // Opcional: Función para resetear la cantidad (ej. después de añadir al carrito)
  const resetQuantity = () => {
    setQuantity(initialQuantity);
  };

  return {
    quantity,
    incrementQuantity,
    decrementQuantity,
    resetQuantity, // Puedes usarla o no
    setQuantity,   // Exponer por si se necesita setear manualmente
  };
}