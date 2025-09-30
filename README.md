# Cypress UI – The Internet

Automated UI checks for the classic **The Internet** test site. Focus on stable interaction patterns (dynamic elements, frames, uploads) and accessibility.

## Highlights
- Coverage of tricky UI behaviors: dynamic loading, disappearing elements, drag&drop, infinite scroll, frames.
- **Login** and common widgets (checkboxes, jQuery menu).
- **Accessibility smoke** on key pages.
- Clean selectors and robust waiting strategy (no fixed sleeps).

## Structure
```
cypress/
  e2e/                  # specs per feature (login, frames, uploads, dnd, a11y, etc.)
  support/              # commands & hooks
  fixtures/             # sample files for upload/download
cypress.config.js
package.json
```

## Usage
```bash
npm ci
npm test
npm run open
```

### Test selection
Tag important specs (e.g. `@smoke`) and run a subset using cypress-grep if configured: `--env grepTags=@smoke`.

## What this suite validates
- Common web UI pitfalls continue to work across builds.
- Accessibility issues on core pages are caught early.
