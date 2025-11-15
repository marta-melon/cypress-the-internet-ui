describe('iFrame', () => {
  it('Can type into editor using helper', () => {
    const text = 'Hello from Cypress!';

    cy.visit('/iframe');

    // TinyMCE iframe on the-internet — usually has id "mce_0_ifr"
    const iframeSelector = 'iframe[id^="mce_"], iframe#mce_0_ifr';

    // getIframeBody returns the <body> inside the iframe (TinyMCE body with id="tinymce")
    cy.getIframeBody(iframeSelector)
      .should('have.id', 'tinymce')
      // TinyMCE sometimes marks the body as read-only — make it editable for the test
      .invoke('removeClass', 'mce-content-readonly')
      .invoke('attr', 'contenteditable', 'true')
      .find('p')
      .clear()
      .type(text)
      .should('contain.text', text);
  });
});
