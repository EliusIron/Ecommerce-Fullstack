// src/app/page.tsx
"use client"; // Necesario para usar el hook useProducts

import Navbar from "./components/layout/Navbar";
import SecondaryNavbar from "./components/layout/SecondaryNavbar";
import ProductList from "./components/Products/ProductList"; // Importa el nuevo componente
import { useProducts } from "./hooks/useProducts"; // Importa el hook

export default function Home() {
  // Usa el hook para obtener los datos y estados
  const { products, isLoading, error } = useProducts();

  return (
    <>
      <Navbar />
      <SecondaryNavbar />
      <main className="p-4 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Nuestros Productos</h2>
        {/* Renderiza el componente ProductList pasando los datos y estados */}
        <ProductList products={products} isLoading={isLoading} error={error} />
      </main>
    </>
  );
}
