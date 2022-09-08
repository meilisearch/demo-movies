const WAITING_TIME = 1000

describe(`Home page`, () => {
  before(() => {
    localStorage.setItem('theme', 'dark')
    cy.fixture('movies-en-US.json').then(movies => {
      cy.addDocuments('movies-en-US', movies)
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

  it.only('Should open a modal', () => {
    cy.get('[data-cy="movie-detail"]').should('have.attr', 'hidden')
    cy.get('li').first().click()
    cy.get('[data-cy="movie-detail"]').should('not.have.attr', 'hidden')
  })

  it('Should have the movie title inside the modal', () => {
    cy.get('li').first().click()
    cy.contains('12 Angry Men')
  })

  it('Should have the movie description inside the modal', () => {
    cy.get('li').first().click()
    cy.contains(
      'The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young Spanish-American is guilty or innocent of murdering his father. '
    )
  })

  it('Should have the movie genres inside the modal', () => {
    cy.get('li').first().click()
    cy.get('div[data-genre]').should($p => {
      expect($p).to.have.length(1)
      expect($p).to.contain('Drama')
    })
  })

  it('Should have social links inside the modal', () => {
    cy.get('li').first().click()
    cy.get('a[data-socials]').should($p => {
      expect($p).to.have.length(1)
      expect($p).to.have.attr('href', 'https://www.imdb.com/title/tt0050083')
    })
  })

  it('Should have the crew list inside the modal', () => {
    cy.get('li').first().click()
    cy.get('div[data-crew]').should($p => {
      expect($p).to.have.length(3)
      expect($p).to.contain('Henry Fonda')
      expect($p).to.contain('Sidney Lumet')
      expect($p).to.contain('Reginald Rose')
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
        expect($p).to.have.length(8)
      })
  })

  it('Should have the buy providers inside the modal', () => {
    cy.get('li').first().click()
    cy.contains('Buy')
    cy.get('div[data-provider-type="buy"]')
      .children()
      .should($p => {
        expect($p).to.have.length(7)
      })
  })

  it('Should show `No provider found` when there is no provider', () => {
    cy.get('li').last().click()
    cy.contains('Sorry, no provider currently offers this program 😢')
  })

  after(() => {
    cy.deleteAllIndexes()
    cy.wait(WAITING_TIME)
  })
})
