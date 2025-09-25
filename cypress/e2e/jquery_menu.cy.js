describe('jQuery UI menu', () => {
  it('navigates through hover menus and checks PDF link', () => {
    cy.visit('/jqueryui/menu');
    cy.contains('a', 'Enabled').trigger('mouseover');
    cy.contains('a', 'Downloads').should('be.visible').trigger('mouseover');
    cy.contains('a', 'PDF').should('be.visible').then(($a) => {
      const href = $a.attr('href');
      expect(href, 'PDF href').to.match(/\.pdf$/);
      cy.request(href).its('status').should('eq', 200);
    });
  });
});
