describe('Frames / iFrame editing', () => {
  it('types into TinyMCE iframe', () => {
    cy.visit('/iframe');
    cy.get('iframe#mce_0_ifr').should('exist');
    cy.get('iframe#mce_0_ifr').its('0.contentDocument.body').should('not.be.empty')
      .then(cy.wrap)
      .clear()
      .type('Hello from Cypress!');
    cy.get('iframe#mce_0_ifr').its('0.contentDocument.body').find('p')
      .should('contain.text', 'Hello from Cypress!');
  });
});
