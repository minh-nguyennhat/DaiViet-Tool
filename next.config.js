/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove swcMinify as it's no longer needed in Next.js 15
  // swcMinify: true,

  // Ensure we're not using global Next.js installation
  distDir: ".next",

  // Remove experimental.appDir since App Router is now the default
  // experimental: {
  //   appDir: true,
  // },
};

module.exports = nextConfig;
