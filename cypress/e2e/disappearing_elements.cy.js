describe('Disappearing Elements', () => {
  it('has 4-5 menu items and always Home', () => {
    cy.visit('/disappearing_elements');
    cy.get('.example ul li a').should('contain.text', 'Home');
    cy.get('.example ul li a').its('length').should('be.within', 4, 5);
  });
});
