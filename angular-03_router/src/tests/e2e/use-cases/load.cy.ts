describe('Load datas', () => {
  it('display produc list when feched', () => {
    cy.visit('/products');
    // Simule le clic sur "Charger les produits"
    cy.get('button.load').click();
    // Attend que 5 cartes apparaissent
    cy.get('.product-card').should('have.length', 5);

    cy.get('.loader').should('be.visible');
    cy.get('.loader').should('not.exist');


  });
});



