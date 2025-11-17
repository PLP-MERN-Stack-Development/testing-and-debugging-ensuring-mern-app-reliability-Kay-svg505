describe('Posts Flow', () => {
  it('Visits homepage', () => {
    cy.visit('/');
    cy.contains('Welcome');
  });

  it('Navigates to posts page', () => {
    cy.visit('/posts');
    cy.contains('Posts');
  });
});
