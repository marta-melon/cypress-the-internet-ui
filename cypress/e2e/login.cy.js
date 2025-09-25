describe('Login form', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('h2').should('contain.text', 'Login Page');
  });

  it('logs in with valid credentials', () => {
    cy.get('#username').type('tomsmith');
    cy.get('#password').type('SuperSecretPassword!');
    cy.get('button[type=submit]').click();
    cy.get('#flash').should('contain.text', 'You logged into a secure area!');
    cy.url().should('include', '/secure');
  });

  it('shows error on invalid credentials', () => {
    cy.get('#username').type('wrong');
    cy.get('#password').type('bad');
    cy.get('button[type=submit]').click();
    cy.get('#flash').should('contain.text', 'Your username is invalid!');
    cy.url().should('include', '/login');
  });
});
