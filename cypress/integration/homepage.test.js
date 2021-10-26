describe(`Home page`, () => {
  before(() => {
    cy.visit('/')
  })

  it('Should visit the Home page', () => {
    cy.url().should('match', new RegExp(Cypress.config('baseUrl')))
  })
})
