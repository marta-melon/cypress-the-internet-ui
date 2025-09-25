describe('Infinite scroll', () => {
  it('loads more content after scrolling', () => {
    cy.visit('/infinite_scroll');
    cy.get('.jscroll-added').then(($els) => {
      const before = $els.length;
      cy.window().scrollTo('bottom');
      cy.wait(1500);
      cy.get('.jscroll-added').its('length').should('be.greaterThan', before);
    });
  });
});
