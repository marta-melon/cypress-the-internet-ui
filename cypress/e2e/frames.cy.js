describe('Frames / iFrame', () => {
  it('can type into TinyMCE iframe content', () => {
    cy.visit('/iframe');
    // TinyMCE iframe sometimes has dynamic id; select the only iframe
    cy.getIframeBody('iframe').within(() => {
      cy.get('p').click().type('{selectall}{backspace}Hello from Cypress!');
      cy.get('p').should('contain.text', 'Hello from Cypress!');
    });
  });
});
