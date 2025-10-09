import { Sel } from '../support/selectors';

describe('Disappearing Elements', () => {
  it("The 'Gallery' link appears at least once across reloads", () => {
    let seen = false;
    const attempts = 8;

    function check(i) {
      cy.visit('/disappearing_elements');
      cy.get(Sel.disappearing.menu).then(($links) => {
        const texts = $links.toArray().map((el) => el.textContent.trim());
        if (texts.includes('Gallery')) {
          seen = true;
        }
      });
      if (i < attempts - 1) {
        check(i + 1);
      }
    }

    check(0);

    cy.wrap(null).then(() => {
      expect(seen, 'Gallery was present in at least one reload').to.be.true;
    });
  });
});
