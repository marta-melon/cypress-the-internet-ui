# Test Plan – Cypress E2E (The Internet)

## Purpose
This test plan describes automated end-to-end tests implemented in the repository.
The goal of the tests is to validate selected UI behaviors of the *The Internet* demo application using Cypress.

The focus is on interaction patterns, dynamic UI behavior, and browser-related edge cases rather than business logic.

## Application Under Test
- Name: The Internet
- URL: https://the-internet.herokuapp.com
- Type: Public demo web application
- Scope: UI components and interaction scenarios

## Test Approach
Tests are implemented as Cypress E2E specifications.
Each test targets a specific UI feature or behavior exposed by the application.
Scenarios are independent and do not rely on shared state between test files.

Custom Cypress commands are used where applicable to keep test logic readable and consistent.

## Test Scope

### Covered Areas
The following application features are covered by automated tests:

- Authentication
  - Successful login with valid credentials
  - Error handling for invalid login attempts

- UI Components and Interactions
  - Adding and removing dynamic elements
  - Checkbox state handling
  - Drag and drop interactions
  - Interaction with elements inside iframes
  - jQuery-based menu navigation

- Dynamic Content
  - Handling of dynamically loaded content
  - Waiting for asynchronous UI updates
  - Infinite scroll behavior
  - Elements that appear or disappear based on timing or interaction

- File Operations
  - File upload handling
  - File download verification

- Navigation and Stability
  - Handling of disappearing navigation elements
  - Basic page-level quality checks

### Out of Scope
- Backend or API testing
- Performance or load testing
- Visual regression testing
- Mobile or responsive layout validation
- Cross-browser testing beyond Electron and Chrome

## Test Structure
Test specifications are located under:
```
cypress/e2e/
```

Each file focuses on a single feature or UI pattern, for example:
- login
- dynamic loading
- drag and drop
- infinite scroll

Shared logic and configuration are located under:
```
cypress/support/
```

## Test Data
- Test data is minimal and defined directly in test specifications
- Login credentials are stored as environment variables
- No persistent data assumptions are made between test runs

## Execution

### Local Execution
- Install dependencies: `npm ci`
- Run headless tests: `npm test`
- Run tests interactively: `npm run open`

### CI Execution
- Tests are executed in GitHub Actions workflows
- Browser matrix includes Electron and Chrome
- JUnit reports are generated for CI visibility

## Entry Criteria
- Application is accessible
- Dependencies installed
- Environment variables configured (if required)

## Exit Criteria
- All test specifications executed
- No unexpected test runner failures
- Test results available in CI artifacts

## Risks and Limitations
- Dependency on availability and stability of a public demo application
- UI changes may require selector or timing adjustments
- Some interactions depend on browser-specific behavior

## Maintenance Guidelines
- Keep selectors stable and avoid brittle DOM dependencies
- Update tests when application behavior changes
- Remove or refactor tests if covered functionality is removed
