# Test Plan – The Internet (Cypress UI)

## Objective
Ensure core interactions on the The Internet site behave consistently and remain accessible.

## Scope
- Add/Remove Elements, Checkboxes, Disappearing Elements.
- Drag & Drop, Dynamic Loading, Infinite Scroll.
- Frames (iFrame) interactions.
- File upload/download.
- Login flow (positive/negative).
- Accessibility smoke on representative pages.

**Out of scope**: exhaustive cross‑browser/perf testing; visual diffs.

## Test design
- Deterministic selectors; retries enabled.
- Upload/download uses fixture files; cleans up artifacts after run.
- Each spec isolates its own setup/teardown.

## Acceptance gates
- All smoke specs pass on main.
- No serious/critical a11y violations.

## Reporting
- Standard Cypress artifacts; optional JUnit export for CI.

## Risks & mitigations
- Flaky drag&drop → use helper commands and stable target coordinates.
- Dynamic content → assert eventual state with sensible timeouts, avoid `cy.wait` with magic numbers.
