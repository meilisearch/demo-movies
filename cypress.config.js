const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  // These environment variables are only used for cypress commands
  env: {
    MEILISEARCH_HOST: 'http://0.0.0.0:7700',
    MEILISEARCH_API_KEY: 'masterKey',
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
