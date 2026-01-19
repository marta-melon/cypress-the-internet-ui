import 'cypress-axe';

/**
 * Dispatch a DragEvent with a safe fallback when constructor is not available.
 */
const dispatchDragEvent = (el, type, dataTransfer) => {
  let evt = new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer });
  el.dispatchEvent(evt);
}

/**
 * HTML5 Drag & Drop
 */
Cypress.Commands.add('html5DnD', (sourceSelector, targetSelector) => {
  const dataTransfer = new DataTransfer();

  cy.get(sourceSelector).then(($src) => {
    cy.get(targetSelector).then(($tgt) => {
      const source = $src[0];
      const target = $tgt[0];

      dispatchDragEvent(source, 'dragstart', dataTransfer);
      dispatchDragEvent(target, 'dragenter', dataTransfer);
      dispatchDragEvent(target, 'dragover', dataTransfer);
      dispatchDragEvent(target, 'drop', dataTransfer);
      dispatchDragEvent(source, 'dragend', dataTransfer);
    });
  });
});

/**
 * Returns the iframe's <body> wrapped by Cypress.
 */
Cypress.Commands.add('getIframeBody', (iframeSelector) => {
  return cy
    .get(iframeSelector)
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap);
});
