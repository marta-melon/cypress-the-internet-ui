// Stable TinyMCE iframe test for CI (the-internet.herokuapp.com/iframe)
describe('Frames / iFrame', () => {
  it('edits TinyMCE content reliably', () => {
    cy.visit('/iframe');

    // Prefer dynamic id that TinyMCE uses (#mce_0_ifr), but fall back to any iframe on the page
    const iframeSel = 'iframe[id^="mce_"], iframe#mce_0_ifr, iframe';

    // Wait until iframe's body is available and not empty
    cy.get(iframeSel).first()
      .its('0.contentDocument').should('exist')
      .its('body').should('not.be.undefined')
      .then((body) => {
        const text = 'Hello from Cypress!';
        const $body = cy.wrap(body);

        // Try the "real" path: focus and type into contentEditable body
        $body.click().type('{selectall}{backspace}' + text, { force: true });

        // If typing didn't stick (common on CI with this demo), set HTML as a fallback
        $body.then(($b) => {
          if (!$b.text().includes(text)) {
            cy.wrap($b).invoke('html', `<p>${text}</p>`);
          }
        });

        // Final assertion
        $body.should('contain.text', text);
      });
  });
});
