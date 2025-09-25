describe('Checkboxes', () => {
  it('toggles checkboxes', () => {
    cy.visit('/checkboxes');
    cy.get('#checkboxes input[type="checkbox"]').as('boxes');
    cy.get('@boxes').should('have.length.at.least', 2);
    cy.get('@boxes').first().check().should('be.checked');
    cy.get('@boxes').eq(1).uncheck().should('not.be.checked');
  });
});
