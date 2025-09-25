// E2E test – the-internet
import { Sel } from '../support/selectors.js';

describe('Drag & Drop', { tags: ['@regression', '@dnd'] }, () => {
  it('swaps columns A and B via HTML5 DnD helper', () => {
    cy.visit('/drag_and_drop');
    cy.get(Sel.dnd.columnA).should('contain.text', 'A');
    cy.get(Sel.dnd.columnB).should('contain.text', 'B');

    cy.html5Dnd(Sel.dnd.columnA, Sel.dnd.columnB);

    cy.get(Sel.dnd.columnA).should('contain.text', 'B');
    cy.get(Sel.dnd.columnB).should('contain.text', 'A');
  });
});
