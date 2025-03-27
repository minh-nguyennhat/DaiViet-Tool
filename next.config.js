/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure we're not using global Next.js installation
  distDir: ".next",
  // Workaround for some path resolution issues
  experimental: {
    // This helps with some route resolution issues
    appDir: true,
  },
};

module.exports = nextConfig;
