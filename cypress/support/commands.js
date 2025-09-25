// / <reference types="cypress" />

// / <reference types="cypress" />
import 'cypress-axe'

Cypress.Commands.add('shouldBeVisibleWithin', (selector, timeout = 8000) => {
  cy.get(selector, { timeout }).should('be.visible');
});

Cypress.Commands.add('html5Dnd', (source, target) => {
  const dataTransfer = new DataTransfer();
  cy.get(source).trigger('dragstart', { dataTransfer });
  cy.get(target).trigger('drop', { dataTransfer });
  cy.get(source).trigger('dragend');
});

Cypress.Commands.add('getIframeBody', (iframeSelector) => {
  return cy
    .get(iframeSelector)
    .its('0.contentDocument.body').should('not.be.empty')
    .then(cy.wrap);
});

declare global {
  namespace Cypress {
    interface Chainable {
      shouldBeVisibleWithin(selector, timeout?): Chainable<JQuery<HTMLElement>>;
      html5Dnd(source, target): Chainable<void>;
      getIframeBody(iframeSelector): Chainable<JQuery<HTMLElement>>;
    }
  }
}
