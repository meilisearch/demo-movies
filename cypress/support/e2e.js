import './commands'

// Ignore uncaught exceptions from third-party scripts
Cypress.on('uncaught:exception', err => {
  // Ignore errors from Google Tag Manager and Crisp
  if (
    err.message.includes('$crisp is not defined') ||
    err.message.includes('gtm.js') ||
    err.message.includes('googletagmanager') ||
    err.message.includes('Script error')
  ) {
    return false
  }
  // Let other errors fail the test
  return true
})
