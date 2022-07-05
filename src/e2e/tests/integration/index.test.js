describe('Test', () => {
  before(() => {
    cy.dbClean();
    cy.dbLoad();
  });

  it('should pass', () => {
    expect(true).to.equal(true);
  });
});
