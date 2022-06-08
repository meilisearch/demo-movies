const WAITING_TIME = 2000

describe(`Home page`, () => {
  before(() => {
    localStorage.setItem('theme', 'dark')
    cy.fixture('movies.json').then(movies => {
      cy.addDocuments('movies', movies)
      cy.wait(WAITING_TIME)
    })
  })

  it('Should visit the Home page', () => {
    cy.visit('/')
    cy.wait(WAITING_TIME)
    cy.url().should('match', new RegExp(Cypress.config('baseUrl')))
    cy.contains('What’s Trending')
  })

  it('Should contain movies', () => {
    cy.contains('What’s Trending')
    cy.get('ul.ais-Hits-list').children().should('have.length', 11)
  })

  it('Should search for a movie', () => {
    cy.get('input[type="search"]').type('scarface')
    cy.get('ul.ais-Hits-list').children().should('have.length', 1)
  })

  it('Should clear the input field', () => {
    cy.get('input[type="search"]').clear()
    cy.get('ul.ais-Hits-list').children().should('have.length', 11)
  })

  it('Should have dark mode', () => {
    cy.get('body').should('have.class', 'dark')
    cy.get('body').should('have.css', 'background-color', 'rgb(15, 15, 27)')
  })

  it('Should have light mode', () => {
    cy.get('input[aria-label=color-theme]').parent().click()
    cy.get('body').should('have.class', 'light')
    cy.get('body').should('have.css', 'background-color', 'rgb(237, 236, 240)')
  })

  after(() => {
    cy.deleteAllIndexes()
    cy.wait(WAITING_TIME)
  })
})
