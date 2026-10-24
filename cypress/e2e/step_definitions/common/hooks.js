const { BeforeAll, AfterAll, After } = require("@badeball/cypress-cucumber-preprocessor");

const AutenticacaoService = require("../../services/autenticacao-service");
const produtoService = require("../../services/produto-service");

let adminId;
let produtoId;
let usuarioId;
let adminEmailCriado;
let userEmailCriado;
let nomeProdutoCriado;

// Antes de todos os testes, cria um usuário e um produto

BeforeAll(() => {
  return cy
    .env(["AdminEmail", "UserEmail"])
    .then(({ AdminEmail, UserEmail }) => {
      return AutenticacaoService.criarUsuario(AdminEmail, "true")
        .then((AdminCriado) => {
          adminId = AdminCriado.id;
          adminEmailCriado = AdminCriado.email;

          Cypress.expose("AdminEmailCriado", adminEmailCriado);
          cy.log(`Administrador criado: ${adminId}`);

          return AutenticacaoService.criarUsuario(UserEmail, "false");
        })
        .then((UsuarioCriado) => {
          usuarioId = UsuarioCriado.id;
          userEmailCriado = UsuarioCriado.email;

          Cypress.expose("UserEmailCriado", userEmailCriado);

          cy.log(`Cliente criado: ${usuarioId}`);

          return AutenticacaoService.obterToken(adminEmailCriado);
        });
    })
    .then((tokenAdmin) => {
      return produtoService.cadastrarProduto(tokenAdmin);
    })
    .then((produtoCriado) => {
      expect(produtoCriado.id).to.be.a("string");

      produtoId = produtoCriado.id;
      nomeProdutoCriado = produtoCriado.nome;

      Cypress.expose("nomeProdutoCriado", nomeProdutoCriado);

      return cy.log(`Produto criado: ${nomeProdutoCriado}`);
    });
});

// Limpa cookies e localStorage após cada teste
After(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

// Depois do teste, exclui o produto e o usuário criado
AfterAll(() => {
  return AutenticacaoService.obterToken(adminEmailCriado)
    .then((tokenAdmin) => {
      return produtoService.deletarProduto(tokenAdmin, produtoId);
    })
    .then(() => {
      return AutenticacaoService.deletarUsuario(usuarioId);
    })
    .then(() => {
      return AutenticacaoService.deletarUsuario(adminId);
    });
});
