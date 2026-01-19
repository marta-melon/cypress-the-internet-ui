# cypress-the-internet-ui — Cypress UI E2E tests

## Project structure (high-level)

```
cypress/
  e2e/                  # UI specs (auth, dynamic elements, iframe, dnd, quality)
  support/              # custom commands & helpers
    e2e.js
    commands.js
cypress.config.js
package.json
```

> Note: the repository also contains standard dotfiles (editor settings, linters) and GitHub Actions workflows.

## Running locally

### 1) Prerequisites

- Node.js 20.x
- npm

Install dependencies:

```bash
npm ci
```

### 2) Interactive run (Cypress UI)

```bash
npm run open
```

Use this mode for debugging selectors, iframe interactions, and dynamic UI behavior.

### 3) Headless run

```bash
npm test
# or
npx cypress run --headless --browser electron --spec "cypress/e2e/**/*.cy.js"
```

## Application under test

- Name: The Internet
- URL: https://the-internet.herokuapp.com
- Type: Public demo web application focused on UI interaction patterns

All tests rely on `baseUrl` configured in `cypress.config.js` and use relative paths in `cy.visit()`.

## CI — GitHub Actions

UI tests are executed in GitHub Actions using a browser matrix.

- Workflow: `.github/workflows/cypress-matrix.yml`
- Browsers: Electron, Chrome
- Reports: JUnit XML → `results/junit-*.xml`
- Artifacts:
  - `results/`
  - `cypress/screenshots`
  - `cypress/videos`

For pull requests from forks, workflows run a reduced subset of specs that do not require privileged configuration.

## Scripts

- `npm test` — headless run (Electron)
- `npm run open` — open Cypress interactive runner
- `npm run format` — format code (if configured)

## Test coverage & focus

The test suite focuses on UI behaviors and edge cases commonly problematic in E2E automation:

- dynamic elements and disappearing navigation
- iframe interactions (TinyMCE editor)
- drag-and-drop behavior
- infinite scroll and async content loading
- JavaScript console error detection on key pages
- basic accessibility smoke checks using `cypress-axe`

Tests avoid fixed waits and rely on Cypress retry-ability and DOM state assertions.

## Notes

- Tests are intentionally written against a public demo application with unstable UI behavior.
- Some failures may reflect real flakiness of the demo site rather than test issues.
- No application state or data is persisted between tests.
- The goal of this repo is to demonstrate Cypress UI testing techniques, not full functional coverage.
