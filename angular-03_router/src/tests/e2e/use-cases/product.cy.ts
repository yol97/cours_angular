describe('Product list', () => {
  it('display products from a mock', () => {
    cy.fixture('products').then((data) => {
      cy.intercept('GET', '/api/products', data); // 👈 on INTERCEPTE bam 💥
    });

    cy.visit('/products');
    cy.get('.product-card').should('have.length', 5);
  });
});
