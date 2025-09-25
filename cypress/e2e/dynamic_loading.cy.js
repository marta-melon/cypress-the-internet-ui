describe('Dynamic Loading', () => {
  it('waits for Hello World', () => {
    cy.visit('/dynamic_loading/2');
    cy.contains('button', 'Start').click();
    cy.get('#finish', { timeout: 10000 }).should('contain.text', 'Hello World!');
  });
});
