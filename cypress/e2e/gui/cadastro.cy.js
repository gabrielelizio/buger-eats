import { en, fakerPT_BR } from "@faker-js/faker";
//import { faker } from "@faker-js/faker/locale/pt_BR";
const faker = require("faker-br");

describe("Testes funcionais de Cadastros de entregador", function () {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Usuario deve setornar um entregador com sucesso", () => {
    const entregador = {
      nome: faker.name.lastName(),
      cpf: faker.br.cpf(),
      email: faker.internet.email(),
      whatsapp: faker.phone.phoneNumber(),
      endereco: {
        cep: faker.address.zipCodeValidByState(),
      },
      metodo_entrega: "Moto",
      cnh: "cnh-digital.png",
    };

    cy.Cadastro(entregador);
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/`);
  });

  it("Usuario não pode se cadastrar sem informar campos obrigatorios", () => {
    const entregador = {
      whatsapp: faker.phone.phoneNumber(),
      metodo_entrega: "Moto",
      cnh: "cnh-digital.png",
    };

    cy.CadastroSemInformarObrigatorios(entregador);
    cy.get(
      ":nth-child(2) > :nth-child(2) > :nth-child(1) > .alert-error"
    ).should("contain", "É necessário informar o nome");
    cy.get(
      "#page-deliver > form > fieldset:nth-child(2) > div:nth-child(2) > div:nth-child(2) > span"
    ).should("contain", "É necessário informar o CPF");
    cy.get(":nth-child(3) > :nth-child(1) > .alert-error").should(
      "contain",
      "É necessário informar o email"
    );
    cy.get(
      ":nth-child(3) > :nth-child(2) > :nth-child(1) > .alert-error"
    ).should("contain", "É necessário informar o CEP");
    cy.get(":nth-child(4) > :nth-child(1) > .alert-error").should(
      "contain",
      "É necessário informar o número do endereço"
    );
  });

  it("Verificar se o número do whatsapp é no formato valido", () => {
    const entregador = {
      whatsappFormatado: faker.phone.phoneNumberFormat(),
      whatsapp: faker.phone.phoneNumber(),
      metodo_entrega: "Moto",
      cnh: "cnh-digital.png",
    };
    cy.WhatsCorreto(entregador);
    cy.get(":nth-child(3) > :nth-child(2) > .alert-error").should("not.exist");
    cy.get('input[name="whatsapp"]').clear().type(entregador.whatsapp);
    cy.get(".button-success").click();
    cy.get(":nth-child(3) > :nth-child(2) > .alert-error").should("exist");
  });
});
