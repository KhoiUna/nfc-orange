/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
  // CHANGE: hide peers
  async redirects() {
    return [
      {
        source: "/peers",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
