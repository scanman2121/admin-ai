/** @type {import('next').NextConfig} */

const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/overview",
        destination: "/my-hqo",
        permanent: true,
      },
      // Add redirect from old users page to new one
      {
        source: "/settings/users",
        destination: "/users",
        permanent: true,
      },
    ];
  },
  // Add output configuration to ensure static files are generated properly
  output: 'standalone',
  // Ensure proper asset handling
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  // Configure allowed image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow images from any HTTPS domain
      },
    ],
  },
};

export default nextConfig;
