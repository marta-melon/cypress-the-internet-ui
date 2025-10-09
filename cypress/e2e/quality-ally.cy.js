describe("Quality — JS errors are not thrown on key pages", () => {
  const pages = ["/", "/drag_and_drop", "/disappearing_elements", "/iframe"];

  pages.forEach((path) => {
    it(`No console errors on ${path}`, () => {
      const errors = [];

      cy.on("window:before:load", (win) => {
        const orig = win.console.error;
        win.console.error = function (...args) {
          errors.push(args.join(" "));
          return orig.apply(this, args);
        };
      });

      cy.visit(path);

      // Assert broadly — any console error is a smell.
      cy.wrap(null).then(() => {
        expect(errors.join("\n"), "No console.error logs").to.eq("");
      });
    });
  });
});
