// E2E test – the-internet
import { Sel } from '../support/selectors.js';

describe('Infinite Scroll', { tags: ['@regression', '@scroll'] }, () => {
  it('loads more content when scrolled to bottom', () => {
    cy.visit('/infinite_scroll');
    const count = () => cy.get(Sel.infinite.content).its('length');
    count().then((before) => {
      cy.scrollTo('bottom');
      cy.wait(500);
      count().should('be.greaterThan', before);
    });
  });
});
