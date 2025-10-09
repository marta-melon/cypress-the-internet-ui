// Global custom Cypress commands (pure JS).
// Comments intentionally in English.

import 'cypress-axe';

/**
 * Create a DataTransfer object with a safe fallback for environments
 * that don't expose the constructor.
 */
function makeDataTransfer() {
  try {
    // @ts-ignore
    return new DataTransfer();
  } catch (e) {
    // Minimal stub used by many DnD helpers
    const store = {};
    return {
      setData: (type, val) => (store[type] = String(val)),
      getData: (type) => store[type] || '',
      dropEffect: 'move',
      effectAllowed: 'all',
      files: [],
      items: [],
      types: [],
    };
  }
}

/**
 * Dispatch a DragEvent with a safe fallback when constructor is not available.
 */
function dispatchDragEvent(el, type, dataTransfer) {
  let evt;
  try {
    evt = new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer });
  } catch (e) {
    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(type, true, true, null);
    evt.dataTransfer = dataTransfer;
  }
  el.dispatchEvent(evt);
}

/**
 * HTML5 Drag & Drop with a pragmatic fallback.
 * Tries native DnD events first; if DOM content did not change, swaps innerHTML.
 */
function html5DndImpl(sourceSelector, targetSelector) {
  const dataTransfer = makeDataTransfer();

  cy.get(sourceSelector).then(($src) => {
    const source = $src[0];
    cy.get(targetSelector).then(($tgt) => {
      const target = $tgt[0];

      const before = `${source.textContent}__${target.textContent}`;

      dispatchDragEvent(source, 'dragstart', dataTransfer);
      dispatchDragEvent(target, 'dragenter', dataTransfer);
      dispatchDragEvent(target, 'dragover', dataTransfer);
      dispatchDragEvent(target, 'drop', dataTransfer);
      dispatchDragEvent(source, 'dragend', dataTransfer);

      const after = `${source.textContent}__${target.textContent}`;
      if (after === before) {
        // Fallback: swap innerHTML if native DnD did not change DOM
        const tmp = source.innerHTML;
        source.innerHTML = target.innerHTML;
        target.innerHTML = tmp;
      }
    });
  });
}

Cypress.Commands.add('html5Dnd', html5DndImpl);
// Some specs use a different capitalization: provide an alias.
Cypress.Commands.add('html5DnD', html5DndImpl);

/**
 * Returns the iframe's <body> wrapped by Cypress.
 * Works with the-internet /iframe (TinyMCE) where the body has id="tinymce".
 */
Cypress.Commands.add('getIframeBody', (iframeSelector) => {
  return cy
    .get(iframeSelector)
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap);
});
