const withPWA = require("next-pwa");

module.exports = withPWA({
  distDir: 'out',
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
