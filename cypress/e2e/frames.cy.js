// E2E test – the-internet
import { Sel } from '../support/selectors.js';

describe('Frames & Nested Frames', { tags: ['@regression', '@frames'] }, () => {
  it('validates nested frames content', () => {
    cy.visit('/nested_frames');

    cy.get(Sel.frames.top).then(($top) => {
      const topDoc = $top[0].contentDocument!;
      const left = topDoc.querySelector('frame[name="frame-left"]') as HTMLFrameElement;
      const middle = topDoc.querySelector('frame[name="frame-middle"]') as HTMLFrameElement;
      const right = topDoc.querySelector('frame[name="frame-right"]') as HTMLFrameElement;

      cy.wrap(left).its('contentDocument.body').should('contain.text', 'LEFT');
      cy.wrap(middle).its('contentDocument.body').find('#content').should('contain.text', 'MIDDLE');
      cy.wrap(right).its('contentDocument.body').should('contain.text', 'RIGHT');
    });

    cy.get(Sel.frames.bottom).its('0.contentDocument.body').should('contain.text', 'BOTTOM');
  });
});
