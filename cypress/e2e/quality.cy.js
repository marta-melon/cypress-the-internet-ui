describe('Quality — JS errors are not thrown on key pages', () => {
  const pages = [
    ['/', 'Home page'],
    ['/disappearing_elements', "Disappearing elements"],
    ['/drag_and_drop', 'Drag and Drop page'],
    ['/iframe', 'iframe Page'],
  ];

  const ignorePatterns = [
    /All created TinyMCE editors are configured to be read-only/i, // known message on /iframe
  ];

  it('homepage has visible H1 and non-empty links', () => {
    cy.visit('/');
    cy.get('h1').should('be.visible');
    cy.get('a').each(($a) => {
      const href = $a.attr('href') || '';
      expect(href.trim(), 'href not empty').to.not.equal('');
    });
  });

  pages.forEach(([path, name]) => {
    it(`No console errors on ${name}`, () => {
      let errors = [];

      cy.on('window:before:load', (win) => {
        const orig = win.console.error;
        win.console.error = function(...args) {
          errors.push(args.join(' '));
          return orig.apply(this, args);
        };
      });

      cy.visit(path);

      cy.wrap(null).then(() => {
        const filtered = errors.filter((msg) => !ignorePatterns.some((re) => re.test(msg)));
        expect(filtered.join('\n')).to.not.match(/TypeError|ReferenceError/);
        expect(filtered.join('\n'), 'No console.error logs (filtered)').to.eq('');
      });
    });
  });

  pages.forEach(([path, name]) => {
    it(`No critical accesibility violations on ${name}`, () => {
      cy.visit(path);
      cy.injectAxe();
      // Check only 'critical' impact to keep this a fast, stable smoke
      cy.checkA11y(null, { includedImpacts: ['critical'] }, (violations) => {
        // Build a human-friendly summary for assertion message
        const summary = violations
          .map((v) => `${v.id} – ${v.help} (${v.impact}) → nodes: ${v.nodes?.length ?? 0}`)
          .join('\n');
        expect(violations, `No critical a11y violations on ${path}\n${summary}`).to.have.length(0);
      });
    });
  });

});
