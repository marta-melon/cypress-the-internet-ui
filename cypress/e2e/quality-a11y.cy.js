// Lightweight checks to avoid flakiness or extra deps
describe('Quality & basic a11y smoke', () => {
  it('homepage has visible H1 and non-empty links', () => {
    cy.visit('/');
    cy.get('h1').should('be.visible');
    cy.get('a').each(($a) => {
      const href = $a.attr('href') || '';
      expect(href.trim(), 'href not empty').to.not.equal('');
    });
  });

  it('no JS errors on critical pages', () => {
    const pages = ['/', '/login'];
    pages.forEach((p) => {
      const errors = [];
      cy.on('window:before:load', (win) => {
        const orig = win.console.error;
        win.console.error = function(...args) {
          errors.push(args.join(' '));
          return orig.apply(this, args);
        };
      });
      cy.visit(p);
      cy.wrap(null).then(() => {
        expect(errors.join('\n')).to.not.match(/TypeError|ReferenceError/);
      });
    });
  });
});
