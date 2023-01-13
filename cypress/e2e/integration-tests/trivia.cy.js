describe('Navigation', () => {
    it('should navigate to the about page', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
  
      // Find a link with an href attribute containing "about" and click it
      cy.get('a[href*="book-3/start"]').click()
  
      // The new url should include "/about"
      cy.url().should('include', "/book-3/start")
  
      // The new page should contain an h1 with "About page"
      cy.get('h1').should('contain', 'Harry Potter and the Prisoner of Azkaban')
    })
  })

describe('Join an existing a game', () => {
    it('should type in user information, select house, and manually enter gameId. Redirect happens when four characters are entered', () => {
        cy.visit('http://localhost:3000/book-3/start')
        cy.url().should('include', "/book-3/start")
        cy.get(`[data-cy="join-existing-game-text-input"]`).should('not.exist')
        cy.get('#name')
            .type('Harry')
        cy.get('#name').should('have.value', 'HARRY')
        cy.get('[data-cy="select-house-Gryffindor"]')
            .click()
        cy.get(`[data-cy="join-existing-game-text-input"]`)
            .should('exist')
            .type('abcd')
        cy.url().should('include', "/book-3/ABCD/waiting-room")
        cy.get('[data-cy="Gryffindor-0-HARRY"]').should('contain', "HARRY")
    })
})

describe('Start a new game', () => {
    it('should type in user information, select house, and press "Start A New Game"', () => {
        cy.visit('http://localhost:3000/book-3/start')
        cy.url().should('include', "/book-3/start")
        cy.get(`[data-cy="join-existing-game-text-input"]`).should('not.exist')
        cy.get('#name')
            .type('Harry').should('have.value', 'HARRY')
        cy.get('[data-cy="select-house-Gryffindor"]')
            .click()
        cy.get('[data-cy="start-a-new-game"]').click()
        cy.url().should('include', "/waiting-room")
        cy.get('[data-cy="Gryffindor-0-HARRY"]').should('contain', "HARRY")
    })
})

describe('Can add another player to the same game', () => {
    it('should type in user information, select house, and manually enter gameId. Redirect happens when four characters are entered', () => {
        cy.visit('http://localhost:3000/book-3/start')
        cy.url().should('include', "/book-3/start")
        cy.get(`[data-cy="join-existing-game-text-input"]`).should('not.exist')
        cy.get('#name')
            .type('Draco')
        cy.get('#name').should('have.value', 'DRACO')
        cy.get('[data-cy="select-house-Slytherin"]')
            .click()
        cy.get(`[data-cy="join-existing-game-text-input"]`)
            .should('exist')
            .type('abcd')
        cy.url().should('include', "/book-3/ABCD/waiting-room")
        cy.get('[data-cy="Gryffindor-0-HARRY"]').should('contain', "HARRY")
        cy.get('[data-cy="Slytherin-0-DRACO"]').should('contain', "DRACO")
    })
})