// E2E test – the-internet
import { Sel } from '../support/selectors.js';
import path from 'node:path';

describe('File Upload & Download', { tags: ['@regression', '@files'] }, () => {
  it('uploads a file using built-in selectFile', () => {
    cy.visit('/upload');
    cy.get(Sel.upload.input).selectFile('cypress/fixtures/files/sample.txt');
    cy.get(Sel.upload.submit).click();
    cy.get(Sel.upload.uploaded).should('contain.text', 'sample.txt');
  });

  it('downloads a file and verifies it exists', () => {
    cy.visit('/download');
    cy.get(Sel.download.items).first().then(($a) => {
      const fileName = $a.text().trim();
      cy.wrap($a).click();
      const downloadsFolder = Cypress.config('downloadsFolder');
      cy.readFile(path.join(downloadsFolder, fileName), { timeout: 10000 }).should('exist');
    });
  });
});
