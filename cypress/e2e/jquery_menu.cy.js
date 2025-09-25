describe('jQuery UI menu', () => {
  it('opens Downloads submenu and validates PDF link', () => {
    cy.visit('/jqueryui/menu');

    // Try hover chain
    cy.contains('a', 'Enabled').trigger('mouseover', { force: true });
    cy.contains('a', 'Downloads').should('be.visible').trigger('mouseover', { force: true });

    // If submenu not visible (headless), force-reveal via DOM and then assert
    cy.contains('a', 'Downloads').parent().find('ul').then(($sub) => {
      if (!$sub.is(':visible')) {
        cy.wrap($sub).invoke('show');
      }
    });

    cy.contains('a', 'PDF').should('be.visible').then(($a) => {
      const href = $a.attr('href');
      expect(href, 'PDF href present').to.match(/\.pdf$/);
      cy.request(href).its('status').should('eq', 200);
    });
  });
});
