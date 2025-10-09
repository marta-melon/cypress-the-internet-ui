describe('Quality — JS errors are not thrown on key pages', () => {
  const pages = ['/', '/drag_and_drop', '/disappearing_elements', '/iframe'];

  const ignorePatterns = [
    /All created TinyMCE editors are configured to be read-only/i, // known message on /iframe
  ];

  pages.forEach((path) => {
    it(`No console errors on ${path}`, () => {
      let errors = [];

      cy.on('window:before:load', (win) => {
        const orig = win.console.error;
        win.console.error = function (...args) {
          errors.push(args.join(' '));
          return orig.apply(this, args);
        };
      });

      cy.visit(path);

      cy.wrap(null).then(() => {
        const filtered = errors.filter((msg) => !ignorePatterns.some((re) => re.test(msg)));
        expect(filtered.join('\n'), 'No console.error logs (filtered)').to.eq('');
      });
    });
  });
});
