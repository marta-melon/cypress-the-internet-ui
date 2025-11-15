const selectors = {
  header: `h2`,
  username: '#username',
  password: '#password',
  submitButton: 'button[type=submit]',
  flash: '#flash',
};

describe('Login form', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get(selectors.header).should('contain.text', 'Login Page');
  });

  it('logs in with valid credentials', () => {
    cy.fixture("users").then((credentials) => {
      cy.get(selectors.username).type(credentials.valid.username);
      cy.get(selectors.password).type(credentials.valid.password);
      cy.get(selectors.submitButton).click();
      cy.get(selectors.flash).should('contain.text', 'You logged into a secure area!');
      cy.url().should('include', '/secure');
    });
  });

  it('shows error on invalid credentials', () => {
    cy.fixture("users").then((credentials) => {
      cy.get(selectors.username).type(credentials.invalid.username);
      cy.get(selectors.password).type(credentials.invalid.password);
      cy.get(selectors.submitButton).click();
      cy.get(selectors.flash).should('contain.text', 'Your username is invalid!');
      cy.url().should('include', '/login');
    });
  });
});
