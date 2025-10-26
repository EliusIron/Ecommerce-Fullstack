// src/app/page.tsx
import Navbar from "./components/layout/Navbar";
import SecondaryNavbar from "./components/layout/SecondaryNavbar";
import ProductCard from "./components/Products/ProductCard";

// Datos de ejemplo con calificaciones
const sampleProducts = [
  {
    id: "1",
    name: "Producto Increíble 1",
    price: 29.99,
    imageUrl: "/placeholder-image.jpg",
    rating: 4.5,
    reviewCount: 120,
  },
  {
    id: "2",
    name: "Producto Fantástico 2 con un nombre muy largo",
    price: 45.5,
    imageUrl: "/placeholder-image.jpg",
    rating: 3.8,
    reviewCount: 85,
  },
  {
    id: "3",
    name: "Producto Básico 3",
    price: 15.0,
    imageUrl: "/placeholder-image.jpg",
    rating: 5.0,
    reviewCount: 210,
  },
  {
    id: "4",
    name: "Producto Económico 4",
    price: 9.99,
    imageUrl: "/placeholder-image.jpg",
    rating: 2.5,
    reviewCount: 30,
  },
  // ... más productos
];

export default function Home() {
  return (
    <>
      <Navbar />
      <SecondaryNavbar />
      <main className="p-4 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Nuestros Productos</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5 place-items-center md:place-items-start">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}
