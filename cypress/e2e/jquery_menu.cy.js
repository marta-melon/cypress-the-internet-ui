// E2E test – the-internet
import { Sel } from '../support/selectors.js';

describe('jQuery UI Menu', { tags: ['@regression', '@menu'] }, () => {
  it('navigates to Downloads → PDF and opens in same tab', () => {
    cy.visit('/jqueryui/menu');
    cy.get(Sel.menu.enabled).trigger('mouseover');
    cy.get(Sel.menu.downloads).should('be.visible').trigger('mouseover');
    cy.get(Sel.menu.pdf).should('be.visible').invoke('removeAttr', 'target').click();
    cy.url().should('include', '/download/jqueryui/menu/menu.pdf');
  });
});
