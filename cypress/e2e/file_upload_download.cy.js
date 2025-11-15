const selectors = {
  fileInput: 'input[type="file"], #file-upload',
  submitButton: '#file-submit',
  uploadedFiles: '#uploaded-files'
};

describe('File upload & download', () => {
  it('uploads a file via /upload', () => {
    cy.visit('/upload');
    cy.get(selectors.fileInput).first()
      .should('exist')
      .selectFile('cypress/fixtures/upload/sample.txt');
    cy.get(selectors.submitButton).click();
    cy.contains('h3', 'File Uploaded!').should('be.visible');
    cy.get(selectors.uploadedFiles).should('contain.text', 'sample.txt');
  });

  it('verifies at least one download link responds 200', () => {
    cy.visit('/download');
    cy.get('.example a').should('have.length.greaterThan', 0).first().invoke('attr', 'href').then((href) => {
      expect(href, 'href exists').to.match(/^\/?download\//);
      cy.request(href).its('status').should('eq', 200);
    });
  });
});
