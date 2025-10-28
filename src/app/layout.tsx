// src/app/layout.tsx
import type { Metadata } from "next";
import { Roboto_Condensed, Lobster_Two } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import CartToastNotification from "./components/cart/CartToastNotification"; // Asegúrate que esté importado

// ... (fuentes y metadata) ...
const LobsterTwo = Lobster_Two({
  weight: "400",
  variable: "--font-lobster-two",
  subsets: ["latin"],
});
const geistSans = Roboto_Condensed({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Roboto_Condensed({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mi Ecommerce",
  description: "Tienda online creada con Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${LobsterTwo.variable} antialiased`}
      >
        <CartProvider>
          {children}
          {/* Renderiza el componente de notificación aquí */}
          <CartToastNotification />
        </CartProvider>
      </body>
    </html>
  );
}
