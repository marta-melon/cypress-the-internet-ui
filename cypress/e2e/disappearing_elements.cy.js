const menuElement = '#content ul li a';

describe('Disappearing Elements', () => {
  it("The 'Gallery' link appears at least once across reloads", () => {
    let seen = false;
    const attempts = 8;

    function check(i) {
      cy.visit('/disappearing_elements');
      cy.get(menuElement).then(($links) => {
        const texts = $links.toArray().map((el) => el.textContent.trim());
        if (texts.includes('Gallery')) {
          seen = true;
        }
      });

      cy.wrap(null).then(() => {
        if (!seen && i < attempts - 1) {
          check(i + 1);
        }
      });
    }

    check(0);

    cy.wrap(null).then(() => {
      expect(seen, 'Gallery was present in at least one reload').to.be.true;
    });
  });

  it('has 4-5 menu items and always Home', () => {
    cy.visit('/disappearing_elements');
    cy.get(menuElement).should('contain.text', 'Home');
    cy.get(menuElement).its('length').should('be.within', 4, 5);
  });

});
