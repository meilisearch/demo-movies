const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  env: {
    NEXT_PUBLIC_MEILISEARCH_HOST: 'http://0.0.0.0:7700',
    NEXT_PUBLIC_MEILISEARCH_API_KEY: 'masterKey',
    NEXT_PUBLIC_TWICPICS_DOMAIN: 'https://meilisearch.twic.pics',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    // setupNodeEvents(on, config) {
    //   return require('./cypress/plugins/index.js')(on, config)
    // },
    baseUrl: 'http://localhost:3000',
  },
})
