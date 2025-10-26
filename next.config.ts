// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/img/**', // Permite cualquier imagen dentro de /img/
      },
    ],
  },
  /* otras opciones... */
};

export default nextConfig;