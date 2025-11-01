// src/app/page.tsx (Refactorizado como Server Component)
import Navbar from "./components/layout/Navbar"; //
import SecondaryNavbar from "./components/layout/SecondaryNavbar"; //
import ProductList from "./components/Products/ProductList"; //
import { getProductListFromERP } from "./services/erpService"; // Importa desde el servicio que creamos
import type { Product, ErpProduct } from "./types/product"; //

// Función auxiliar para mapear datos (puede vivir aquí o en un archivo utils)
function formatErpProduct(erpProduct: ErpProduct, baseUrl: string): Product {
  return {
    id: erpProduct.name, //
    name: erpProduct.item_name || erpProduct.name, //
    price: erpProduct.standard_rate || 0, //
    // Asegúrate de que la URL base se obtenga correctamente para construir la URL completa de la imagen
    imageUrl: erpProduct.image
      ? `${baseUrl}${erpProduct.image}`
      : "/placeholder.png", //
    rating: 4.5, // Valor por defecto o del ERP si existe //
    reviewCount: undefined, //
  };
}

// Convertimos el componente Home en async para usar await
export default async function Home() {
  let products: Product[] = [];
  let error: string | null = null;
  // isLoading ahora se maneja implícitamente por Next.js Suspense si usas loading.tsx
  // Mantenemos una variable local para pasarla a ProductList en caso de error o éxito inmediato
  let dataFetched = false;

  const baseUrl = process.env.NEXT_PUBLIC_ERP_API_URL || ""; // Necesario para las imágenes

  try {
    const erpProducts = await getProductListFromERP(); // Llamada directa al servicio
    products = erpProducts.map((p) => formatErpProduct(p, baseUrl));
    dataFetched = true; // Marcamos que los datos se obtuvieron (o están vacíos)
  } catch (e) {
    console.error("Failed to fetch products on server:", e); //
    error =
      e instanceof Error
        ? e.message
        : "Ocurrió un error desconocido al cargar los productos."; //
    // isLoading se considera false porque el intento de carga terminó (con error)
    dataFetched = false;
  }

  return (
    <>
      <Navbar /> {/* */}
      <SecondaryNavbar /> {/* */}
      <main className="p-4 md:p-8">
        {" "}
        {/* */}
        <h2 className="text-2xl font-bold mb-6">Nuestros Productos</h2> {/* */}
        {/*
          Pasamos isLoading como !dataFetched si hay error, o false si dataFetched es true.
          Si no hubo error y dataFetched es true, isLoading es false.
          Si hubo error, dataFetched es false, isLoading se pasa como true (o podrías mostrar el error directamente).
          Ajusta la lógica de `ProductList` para manejar esto: si hay error, muestra el error; si isLoading es true, muestra esqueletos; si no, muestra productos.
        */}
        <ProductList
          products={products}
          isLoading={!dataFetched && !error}
          error={error}
        />{" "}
        {/* */}
      </main>
    </>
  );
}
