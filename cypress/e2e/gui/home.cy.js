describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/')
});
  it('App deve estar online', () => {
   
    cy.get('#page-home > div > main > h1').should('have.text','Seja um parceiro entregador pela Buger Eats') 
  })
})