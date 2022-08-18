const withPWA = require("next-pwa");

module.exports = withPWA({
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  }
});
