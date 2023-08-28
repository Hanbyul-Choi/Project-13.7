/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fvkzqozjdtlaogexuuin.supabase.co',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
