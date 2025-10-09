import { Sel } from "../support/selectors";

describe("iFrame", () => {
  it("Can type into editor using helper", () => {
    cy.visit("/iframe");
    cy.getIframeBody(Sel.iframe.frame)
      .find(Sel.iframe.editorBody)
      .clear()
      .type("Hello from Cypress!");
  });
});
