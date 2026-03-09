/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration pour export statique (hébergement sans Node.js)
  output: 'export',
  basePath: '/chellois-es',
  trailingSlash: true,
  
  allowedDevOrigins: ["*.preview.same-app.com"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
