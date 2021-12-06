const WAITING_TIME = 1000

describe(`Home page`, () => {
  before(() => {
    localStorage.setItem('theme', 'dark')
    cy.fixture('movies.json').then(movies => {
      cy.addDocuments('movies', movies)
      cy.wait(WAITING_TIME)
    })
  })

  beforeEach(() => {
    cy.visit('/')
    cy.wait(WAITING_TIME)
  })

  it('Should visit the Home page', () => {
    cy.url().should('match', new RegExp(Cypress.config('baseUrl')))
    cy.contains('What’s Trending')
  })

  it('Should open a modal', () => {
    cy.get('div[role="dialog"]').should('have.attr', 'hidden')
    cy.get('li').first().click()
    cy.get('div[role="dialog"]').should('not.have.attr', 'hidden')
  })

  it('Should have the movie title inside the modal', () => {
    cy.get('li').first().click()
    cy.contains('Léon: The Professional')
  })

  it('Should have the movie description inside the modal', () => {
    cy.get('li').first().click()
    cy.contains(
      'Léon, the top hit man in New York, has earned a rep as an effective "cleaner".'
    )
  })

  it('Should have the movie genres inside the modal', () => {
    cy.get('li').first().click()
    cy.get('div[data-genre]').should($p => {
      expect($p).to.have.length(3)
      expect($p).to.contain('Crime')
      expect($p).to.contain('Drama')
      expect($p).to.contain('Action')
    })
  })

  it('Should have social links inside the modal', () => {
    cy.get('li').first().click()
    cy.get('a[data-socials]').should($p => {
      expect($p).to.have.length(1)
      expect($p).to.have.attr('href', 'https://www.imdb.com/title/tt0110413')
    })
  })

  it('Should have the crew list inside the modal', () => {
    cy.get('li').first().click()
    cy.get('div[data-crew]').should($p => {
      expect($p).to.have.length(2)
      expect($p).to.contain('Luc Besson')
      expect($p).to.contain('Patrice Ledoux')
    })
  })

  it('Should have the cast list inside the modal', () => {
    cy.get('li').first().click()
    cy.get('div[data-cast]').should($p => {
      expect($p).to.have.length(8)
    })
  })

  it('Should have the stream providers inside the modal', () => {
    cy.get('li').first().click()
    cy.contains('Stream')
    cy.get('div[data-provider-type="stream"]')
      .children()
      .should($p => {
        expect($p).to.have.length(3)
      })
  })

  it('Should have the rent providers inside the modal', () => {
    cy.get('li').first().click()
    cy.contains('Rent')
    cy.get('div[data-provider-type="rent"]')
      .children()
      .should($p => {
        expect($p).to.have.length(7)
      })
  })

  it('Should have the buy providers inside the modal', () => {
    cy.get('li').first().click()
    cy.contains('Buy')
    cy.get('div[data-provider-type="buy"]')
      .children()
      .should($p => {
        expect($p).to.have.length(9)
      })
  })

  after(() => {
    cy.deleteAllIndexes()
    cy.wait(WAITING_TIME)
  })
})
