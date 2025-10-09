// Custom commands registration. Pure JS (no TS namespaces).
// Keep this file minimal — utilities live in support/e2e.js.

import "cypress-axe";

Cypress.Commands.add("shouldBeVisibleWithin", (selector, timeout = 4000) => {
  cy.get(selector, { timeout }).should("be.visible");
});

// Re-export helpers if someone imports commands only
// (They are actually attached in support/e2e.js)
