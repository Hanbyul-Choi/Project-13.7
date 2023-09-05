/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fvkzqozjdtlaogexuuin.supabase.co',
        port: '',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'fvkzqozjdtlaogexuuin.supabase.co',
        port: '',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
  },
};

module.exports = nextConfig;
