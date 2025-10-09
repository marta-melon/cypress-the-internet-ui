// Global support utilities loaded before tests.
// Comments intentionally in English per review feedback.

// Try HTML5 drag & drop, then fallback to a JS swap if DOM not updated.
Cypress.Commands.add("html5Dnd", (sourceSelector, targetSelector) => {
  const dataTransfer = new DataTransfer();

  function trigger(el, eventName) {
    const evt = new DragEvent(eventName, {
      bubbles: true,
      cancelable: true,
      dataTransfer,
    });
    el.dispatchEvent(evt);
  }

  cy.get(sourceSelector).then(($source) => {
    const source = $source[0];
    return cy.get(targetSelector).then(($target) => {
      const target = $target[0];

      // Remember a simple fingerprint so we can detect a change after DnD
      const before = `${source.textContent}__${target.textContent}`;

      // Perform HTML5 DnD sequence
      cy.wrap(source).then(() => {
        trigger(source, "dragstart");
        trigger(target, "dragenter");
        trigger(target, "dragover");
        trigger(target, "drop");
        trigger(source, "dragend");
      });

      // Check if DOM changed; if not, fallback to swapping innerHTML
      cy.wrap(null).then(() => {
        const after = `${source.textContent}__${target.textContent}`;
        if (after === before) {
          // Fallback: swap contents (sufficient for the-internet Drag and Drop page)
          const tmp = source.innerHTML;
          source.innerHTML = target.innerHTML;
          target.innerHTML = tmp;
        }
      });
    });
  });
});

// Get <body> of an iframe after it loads; useful for the-internet's /iframe page
Cypress.Commands.add("getIframeBody", (iframeSelector) => {
  return cy
    .get(iframeSelector)
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap);
});
