const WAITING_TIME = 2000

describe(`Home page`, () => {
  before(() => {
    localStorage.setItem('theme', 'dark')
    cy.fixture('../../assets/movies-en-US.json').then(movies => {
      cy.addDocuments('movies-en-US', movies)
      cy.wait(WAITING_TIME)
    })
    cy.fixture('../../assets/movies-ja-JP.json').then(movies => {
      cy.addDocuments('movies-ja-JP', movies)
      cy.wait(WAITING_TIME)
    })
    cy.fixture('../../assets/movies-th-TH.json').then(movies => {
      cy.addDocuments('movies-th-TH', movies)
      cy.wait(WAITING_TIME)
    })
  })

  beforeEach(() => {
    cy.visit('/')
    cy.wait(WAITING_TIME)
    cy.clearLocalStorage()
  })

  it('Should visit the Home page', () => {
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

  context('dark/light mode', () => {
    it('Should have dark mode', () => {
      cy.get('body').should('have.class', 'dark')
      cy.get('body').should('have.css', 'background-color', 'rgb(15, 15, 27)')
    })

    it('Should have light mode', () => {
      cy.get('[data-cy="settings-desktop"] input[aria-label=color-theme]')
        .parent()
        .click()
      cy.get('body').should('have.class', 'light')
      cy.get('body').should(
        'have.css',
        'background-color',
        'rgb(237, 236, 240)'
      )
    })
  })

  context('Switch country', () => {
    it('Should have a button to switch country', () => {
      cy.get(
        '[data-cy="settings-desktop"] button[aria-label="Language selector"]'
      )
    })
    it('Should have 3 country indexes', () => {
      cy.get('[data-cy="country-switcher-desktop"]').click()
      cy.get(
        '[data-cy="settings-desktop"] div[aria-label="Language list"] > div'
      )
        .children()
        .should('have.length', 3)
    })

    it('Should switch between countries', () => {
      cy.get('ul.ais-Hits-list').children().contains('Batman')

      // Switch to Japanese
      cy.get('[data-cy="country-switcher-desktop"]').click()
      cy.get(
        '[data-cy="settings-desktop"] div[aria-label="Language list"] > div'
      )
        .children()
        .eq(1)
        .click()
      cy.get('ul.ais-Hits-list').children().contains('バットマン')

      // Switch to Thai
      cy.get('[data-cy="country-switcher-desktop"]').click()
      cy.get(
        '[data-cy="settings-desktop"] div[aria-label="Language list"] > div'
      )
        .children()
        .eq(2)
        .click()
      cy.get('ul.ais-Hits-list').children().contains('แบทแมน')
    })

    it('Should save the country preferences inside localStorage', () => {
      cy.get('[data-cy="country-switcher-desktop"]').click()
      cy.get(
        '[data-cy="settings-desktop"] div[aria-label="Language list"] > div'
      )
        .children()
        .eq(1)
        .click(() => {
          expect(localStorage.getItem('country-preference')).to.eq('ja-JP')
        })
    })

    it('Should use the preferences of the localStorage onload', () => {
      cy.window().then(win =>
        win.localStorage.setItem('country-preference', '"ja-JP"')
      )
      cy.visit('/')
      cy.wait(WAITING_TIME)
      cy.get('ul.ais-Hits-list').children().contains('バットマン')
    })
  })

  after(() => {
    cy.deleteAllIndexes()
    cy.wait(WAITING_TIME)
  })
})
