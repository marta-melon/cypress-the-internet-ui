# Cypress The-Internet UI Tests

This project tests **the-internet.herokuapp.com** with Cypress 13 and JavaScript.

## Tests
- `disappearing_elements.cy.js` – nav items visibility
- `drag_and_drop.cy.js` – drag’n’drop behavior
- `dynamic_loading.cy.js` – loading spinners and content
- `file_upload_download.cy.js` – upload & download flow
- `frames.cy.js` – iframes and nested frames
- `infinite_scroll.cy.js` – virtual scroll
- `jquery_menu.cy.js` – hierarchical menu
- `quality-a11y.cy.js` – basic WCAG checks

## Install
```bash
npm ci
npx cypress verify
```
...
Headless:
```bash
npm test
```

## CI
GitHub Actions runs tests on Ubuntu. It uses matrix (Electron + Chrome) and shards.

Flow:
```
push -> matrix -> shard -> run -> artifacts
```

JUnit XML is saved to `results/`.
