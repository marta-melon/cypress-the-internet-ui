import { Sel } from "../support/selectors";

describe("Accessibility smoke", () => {
  it("Home page has no critical violations", () => {
    cy.visit("/");
    cy.injectAxe();
    cy.checkA11y(null, {
      includedImpacts: ["critical"],
    });
    cy.get(Sel.home.header).contains("Welcome");
  });

  it("Drag and Drop page has no critical violations", () => {
    cy.visit("/drag_and_drop");
    cy.injectAxe();
    cy.checkA11y(null, { includedImpacts: ["critical"] });
    cy.get(Sel.dragAndDrop.header).should("be.visible");
  });
});
