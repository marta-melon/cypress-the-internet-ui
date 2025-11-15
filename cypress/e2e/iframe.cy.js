describe('iFrame', () => {
  it('Can type into editor using helper', () => {
    cy.visit('/iframe');

    // Prefer dynamic id that TinyMCE uses (#mce_0_ifr), but fall back to any iframe on the page
    const iframeSel = 'iframe[id^="mce_"], iframe#mce_0_ifr, iframe';

    // getIframeBody returns <body> inside iframe (TinyMCE body with id=tinymce)
    const $body = cy.getIframeBody(iframeSel);
    const text = 'Hello from Cypress!';
    $body.should('have.id', 'tinymce')
      // the site often configures editor as read-only; make it editable for the purpose of the test
      .invoke('removeClass', 'mce-content-readonly')
      .invoke('attr', 'contenteditable', 'true')
      .clear()
      .type(text);

    $body.should('contain.text', text)
  });
});
