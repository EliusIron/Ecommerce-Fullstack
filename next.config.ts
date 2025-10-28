// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/img/**',
      },
      // Añade esta nueva entrada:
      {
        protocol: 'http', // Protocolo de tu ERP local
        hostname: '127.0.0.1', // La IP local
        port: '8003', // El puerto de tu ERP
        pathname: '/files/**', // Permite cualquier imagen bajo la ruta /files/ (ajusta si es necesario)
      },
    ],
  },
  /* otras opciones... */
};

export default nextConfig;