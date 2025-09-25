// E2E test – the-internet
import { Sel } from '../support/selectors.js';

describe('Dynamic Loading', { tags: ['@smoke', '@dynamic'] }, () => {
  [1, 2].forEach((ex) => {
    it(`Example ${ex}: renders Hello World deterministically`, () => {
      cy.visit(`/dynamic_loading/${ex}`);
      cy.get(Sel.dynamic.startBtn).click();
      cy.get(Sel.dynamic.loading).should('be.visible');
      cy.get(Sel.dynamic.finish).should('contain.text', 'Hello World!');
    });
  });
});
