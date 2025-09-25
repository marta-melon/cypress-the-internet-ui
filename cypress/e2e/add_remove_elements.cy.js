describe('Add/Remove Elements', () => {
  it('adds and removes buttons', () => {
    cy.visit('/add_remove_elements/');
    cy.contains('button', 'Add Element').click().click().click();
    cy.get('.added-manually').should('have.length', 3);
    cy.get('.added-manually').first().click();
    cy.get('.added-manually').should('have.length', 2);
  });
});
