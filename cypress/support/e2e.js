/* global cy, Cypress */

/**
 * Log in as a user
 */
function join (user = 'Gamemaster') {
  cy.visit('/join')
  cy.url().should('eq', Cypress.config('baseUrl') + '/join')

  cy.get('select[name="userid"]').select(user)
  cy.get('button[name="join"').click()

  cy.url().should('eq', Cypress.config('baseUrl') + '/game')

  cy.window().its('game').and('have.property', 'ready').and('be.true')
  cy.window().its('game').should('have.property', 'canvas').and('have.property', 'ready').and('be.true')
}

Cypress.Commands.add('join', () => {
  join()
})
