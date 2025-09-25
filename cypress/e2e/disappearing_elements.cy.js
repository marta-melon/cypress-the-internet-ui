// E2E test – the-internet
import { Sel } from '../support/selectors.js';

describe('Disappearing Elements', { tags: ['@regression'] }, () => {
  it('Finds the elusive Gallery link within bounded retries', () => {
    const tryFind = (attempt = 1) => {
      cy.visit('/disappearing_elements');
      cy.get(Sel.disappearing.menu).then(($links) => {
        const hasGallery = [...$links].some((a) => a.textContent?.trim() === 'Gallery');
        if (!hasGallery && attempt < 8) {
          cy.log(`Reload attempt #${attempt}`);
          tryFind(attempt + 1);
        } else {
          expect(hasGallery, 'Gallery should appear within 7 reloads').to.be.true;
        }
      });
    };
    tryFind();
  });
});
