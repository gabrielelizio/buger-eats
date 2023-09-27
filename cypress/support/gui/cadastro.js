Cypress.Commands.add("AcessarCadastro", () => {
  cy.get('a[href="/deliver"]').click();
  cy.get("#page-deliver > form > h1").should(
    "have.text",
    "Cadastre-se para  fazer entregas"
  );
});

Cypress.Commands.add("Cadastro", (entregador) => {
  cy.AcessarCadastro();

  cy.get('input[name="name"]').type(entregador.nome);
  cy.get('input[name="cpf"]').type(entregador.cpf);
  cy.get('input[name="email"]').type(entregador.email);
  cy.get('input[name="whatsapp"]').type(entregador.whatsapp);
  cy.get('input[name="postalcode"]').type(entregador.endereco.cep);
  cy.get('input[type=button][value="Buscar CEP"').click();

  cy.contains(".delivery-method li", entregador.metodo_entrega).click();

  cy.get('input[accept^="image"]').attachFile(entregador.cnh);
  cy.get(".button-success").click();
  cy.get(".swal2-confirm").should("contain", "Fechar").click();
});

Cypress.Commands.add("CadastroSemInformarObrigatorios", (entregador) => {
  cy.AcessarCadastro();

  cy.contains(".delivery-method li", entregador.metodo_entrega).click();

  cy.get('input[accept^="image"]').attachFile(entregador.cnh);
  cy.get(".button-success").click();
});

Cypress.Commands.add("WhatsCorreto", (entregador) => {
  cy.AcessarCadastro();
  cy.get('input[name="whatsapp"]').type(entregador.whatsappFormatado);

  cy.contains(".delivery-method li", entregador.metodo_entrega).click();

  cy.get('input[accept^="image"]').attachFile(entregador.cnh);
  cy.get(".button-success").click();
});
