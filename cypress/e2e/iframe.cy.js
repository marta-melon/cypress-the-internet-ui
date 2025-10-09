import { Sel } from '../support/selectors';

describe('iFrame', () => {
  it('Can type into editor using helper', () => {
    cy.visit('/iframe');

    // getIframeBody returns <body> inside iframe (TinyMCE body with id=tinymce)
    cy.getIframeBody(Sel.iframe.frame)
      .should('have.id', 'tinymce')
      // the site often configures editor as read-only; make it editable for the purpose of the test
      .invoke('removeClass', 'mce-content-readonly')
      .invoke('attr', 'contenteditable', 'true')
      .clear()
      .type('Hello from Cypress!');
  });
});
