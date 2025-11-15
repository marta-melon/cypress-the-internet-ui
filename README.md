# the-internet — Cypress UI tests

Key points:
- Robust waiting (no fixed sleeps).
- Accessibility smoke via `cypress-axe` on core pages.
- Console error checks on key flows.
- Matrix CI (Electron + Chrome), JUnit reports uploaded as artifacts.

## Run locally
```bash
npm run open   # interactive runner
npm test       # headless
```

## CI (GitHub Actions)
- Workflow: `.github/workflows/cypress-matrix.yml`
- Reporter: JUnit → `results/junit-*.xml`
- Artifacts: `results/`, `cypress/screenshots`, `cypress/videos`

## Project structure
```
cypress/
  e2e/
  support/
    e2e.js
    commands.js
```
