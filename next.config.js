const { i18n } = require('./next-i18next.config')

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  webpack5: true,
  webpack: config => {
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false }
    return config
  },
  i18n,
}
