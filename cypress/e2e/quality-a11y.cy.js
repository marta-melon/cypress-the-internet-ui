// E2E test – the-internet
// Lightweight a11y sanity on two pages

describe('A11y sanity', { tags: ['@a11y', '@quality'] }, () => {
  it('homepage has no critical violations', () => {
    cy.visit('/');
    cy.injectAxe();
    cy.checkA11y(undefined, { includedImpacts: ['critical'] });
  });

  it('dynamic loading example 1 has no critical violations', () => {
    cy.visit('/dynamic_loading/1');
    cy.injectAxe();
    cy.checkA11y(undefined, { includedImpacts: ['critical'] });
  });
});
