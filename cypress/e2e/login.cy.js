describe('Login form', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('h2').should('contain.text', 'Login Page');
  });

  it('logs in with valid credentials', () => {
    cy.fixture('users').then(({ valid }) => {
      cy.get('#username').type(valid.username);
      cy.get('#password').type(valid.password);
      cy.get('button[type=submit]').click();
      cy.get('#flash').should('contain.text', 'You logged into a secure area!');
      cy.url().should('include', '/secure');
    });
  });

  it('shows error on invalid credentials', () => {
    cy.fixture('users').then(({ invalid }) => {
      cy.get('#username').type(invalid.username);
      cy.get('#password').type(invalid.password);
      cy.get('button[type=submit]').click();
      cy.get('#flash').should('contain.text', 'Your username is invalid!');
      cy.url().should('include', '/login');
    });
  });
});
