describe('iFrame', () => {
  it('Can type into editor using helper', () => {
    const text = 'Hello from Cypress!';

    cy.visit('/iframe');

    // TinyMCE iframe on the-internet — usually has id like "mce_0_ifr"
    const iframeSelector = 'iframe[id^="mce_"], iframe#mce_0_ifr';

    // Break the chain to avoid "detached from DOM" when TinyMCE re-renders.
    cy.getIframeBody(iframeSelector)
      .should('have.id', 'tinymce')
      .invoke('removeClass', 'mce-content-readonly')
      .invoke('attr', 'contenteditable', 'true');

    cy.getIframeBody(iframeSelector).then(($body) => {
      cy.wrap($body)
        .click()
        .type(`{selectall}{backspace}${text}`, { delay: 0 });
    });

    cy.getIframeBody(iframeSelector).should('contain.text', text);
  });
});
