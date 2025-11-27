import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'comigo-imagenes.s3.us-east-1.amazonaws.com', // Tu bucket de AWS
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**', // (Opcional) Esto permite imágenes de cualquier sitio, útil en desarrollo
      },
    ],
  },

  // 👇 2. TUS REWRITES EXISTENTES
  async rewrites() {
    // Agregamos un fallback: si la variable es undefined, usa localhost:3000
    const apiUrl = process.env.AUTH0_BASE_URL || 'http://localhost:3000';

    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiUrl}/api/v1/:path*`,
      },
    ];
  },

  // experimental: {
  //   serverComponentsExternalPackages: ["@react-pdf/renderer"],
  // },
};

export default nextConfig;