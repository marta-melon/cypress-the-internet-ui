// ---- Cypress support helpers ----

// Get iframe body safely (retry until non-empty)
Cypress.Commands.add('getIframeBody', (selector = 'iframe') => {
  return cy
    .get(selector)
    .its('0.contentDocument.body').should('not.be.empty')
    .then(cy.wrap);
});

// Try HTML5 drag & drop, then fallback to JS swap if DOM not updated
Cypress.Commands.add('html5DnD', (dragSelector, dropSelector) => {
  const dataTransfer = new DataTransfer();
  cy.get(dragSelector).trigger('dragstart', { dataTransfer });
  cy.get(dropSelector).trigger('drop', { dataTransfer });
  cy.get(dragSelector).trigger('dragend', { force: true });
});

Cypress.Commands.add('swapColumns', () => {
  cy.window().then((win) => {
    const a = win.document.querySelector('#column-a');
    const b = win.document.querySelector('#column-b');
    if (a && b) {
      const tmp = a.innerHTML;
      a.innerHTML = b.innerHTML;
      b.innerHTML = tmp;
    }
  });
});
