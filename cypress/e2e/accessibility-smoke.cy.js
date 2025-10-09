describe('Accessibility smoke', () => {
  const pages = ['/', '/drag_and_drop'];

  pages.forEach((path) => {
    it(`${path === '/' ? 'Home page' : 'Drag and Drop page'} has no critical violations`, () => {
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
