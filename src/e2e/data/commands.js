Cypress.Commands.add('dbClean', () => cy.task('db:clean'));

Cypress.Commands.add('dbLoad', (fixture) => cy.task('db:load', fixture));

before(() => {
  cy.intercept('GET', '/api/v1/csrf-token').as('getToken');
  cy.intercept('POST', '/api/v1/auth/refresh-token').as('getUser');
  cy.intercept('POST', '/api/v1/messages').as('sendMessage');
  cy.intercept('GET', '/api/v1/config').as('getConfig');
  cy.intercept('GET', '/api/v1/contact').as('getContact');
});
