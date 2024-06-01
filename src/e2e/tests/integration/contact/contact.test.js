describe('Contact Page', () => {
  before(() => {
    cy.dbClean();
    cy.dbLoad();
  });

  beforeEach(() => {
    cy.visit('/contact');
  });

  it('should fill and send message correctly', () => {
    cy.wait('@getToken');
    cy.wait('@getUser');
    cy.wait('@getConfig');
    cy.wait('@getContact');

    cy.get('#first_name')
      .type('Jan')
      .should('have.value', 'Jan');

    cy.get('#last_name')
      .type('Kowalski')
      .should('have.value', 'Kowalski');

    cy.get('#email')
      .type('email@domain.pl')
      .should('have.value', 'email@domain.pl');

    cy.get('#subject')
      .type('Temat')
      .should('have.value', 'Temat');

    cy.get('#contents')
      .type('Treść wiadomości.')
      .should('have.value', 'Treść wiadomości.');

    cy.get('.btn.btn-primary.rounded-pill.px-4').click();

    cy.get('#first_name')
      .should('have.value', '');

    cy.get('#last_name')
      .should('have.value', '');

    cy.get('#email')
      .should('have.value', '');

    cy.get('#subject')
      .should('have.value', '');

    cy.get('#contents')
      .should('have.value', '');

    cy.wait('@sendMessage').its('response.statusCode').should('eq', 201);

    cy.get('.toast-body').should('contain', 'Pomyślnie wysłano.');

    cy.wait(3000);

    cy.get('.toast').should('not.exist');
  });
});
