describe('File upload & download', () => {
  it('uploads a file via /upload', () => {
    cy.visit('/upload');
    cy.get('input[type="file"], #file-upload').first()
      .should('exist')
      .selectFile('cypress/fixtures/upload/sample.txt');
    cy.get('#file-submit').click();
    cy.contains('h3', 'File Uploaded!').should('be.visible');
    cy.get('#uploaded-files').should('contain.text', 'sample.txt');
  });

  it('verifies at least one download link responds 200', () => {
    cy.visit('/download');
    cy.get('.example a').should('have.length.greaterThan', 0).first().invoke('attr', 'href').then((href) => {
      expect(href, 'href exists').to.match(/^\/?download\//);
      cy.request(href).its('status').should('eq', 200);
    });
  });
});
