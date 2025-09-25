# cypress-the-internet-ui (fixed)

Stabilne testy Cypress dla **the-internet.herokuapp.com**.

## Uruchamianie lokalnie
```bash
npm install
npm test
```

## Struktura
- `cypress/e2e/*.cy.js` – przykładowe scenariusze (login, checkboxes, add/remove, dynamic loading)
- `cypress/fixtures/users.json` – dane logowania
- `cypress.config.js` – CommonJS, `baseUrl` ustawiony na the-internet

## CI (GitHub Actions)
Workflow używa `npm install` zamiast `npm ci`, więc nie wymaga lockfile.
