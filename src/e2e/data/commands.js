Cypress.Commands.add('dbClean', () => cy.task('db:clean'));

Cypress.Commands.add('dbLoad', (fixture) => cy.task('db:load', fixture));

beforeEach(() => {
  cy.intercept('/api/v1/csrf-token').as('csrfToken');
  cy.intercept('/api/v1/auth/refresh-token').as('user');
  cy.intercept('/api/v1/messages').as('message');
  cy.intercept('/api/v1/config').as('config');
  cy.intercept('/api/v1/contact').as('contact');
});
