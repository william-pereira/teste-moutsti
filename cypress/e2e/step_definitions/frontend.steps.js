import { LoginPage, CredenciaisUser } from "../pages/loginPage.js";
import { ProdutoPage } from "../pages/produtoPage.js";
import { UsuarioPage } from "../pages/usuarioPage.js";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que sou um usuário cliente logado no e-commerce", () => {
  const email = Cypress.expose("UserEmailCriado");

  LoginPage.visit();

  return cy
    .env(["senhaPadrao"])
    .then(({ senhaPadrao }) => {
      return CredenciaisUser.preencherLogin({ email, senha: senhaPadrao });
    })
    .then(() => {
      return CredenciaisUser.clickBotaoLogin();
    });
});

When("adiciono um produto a lista de compras", () => {
  ProdutoPage.pesquisarProduto();
});

Then("devo ver o produto listado na tela de lista de compras", () => {
  ProdutoPage.listaCompras();
});

Given("que sou um usuário administrador logado no e-commerce", () => {
  const email = Cypress.expose("AdminEmailCriado");

  LoginPage.visit();

  return cy
    .env(["senhaPadrao"])
    .then(({ senhaPadrao }) => {
      return CredenciaisUser.preencherLogin({ email, senha: senhaPadrao });
    })
    .then(() => {
      return CredenciaisUser.clickBotaoLogin();
    });
});

When("cadastro um novo produto na tela de Cadastrar produto", () => {
  // criando um produto e montando um objeto para ser utilizado na validação
  const produtoLista = {
    nome: `Produto teste ${Math.floor(Math.random() * 10000)}`,
    preco: "99",
    descricao: "Descrição fake do produto",
    quantidade: "10",
    imagem: "cypress/fixtures/imagens/produto.png",
  };

  Cypress.expose("produtoLista", produtoLista);

  ProdutoPage.BotaoCadastrarProduto();
  ProdutoPage.preencherFormularioProduto(produtoLista);
});

Then("devo ver o produto listado na tela de Listar Produtos", () => {
  const produtoLista = Cypress.expose("produtoLista");

  ProdutoPage.validacaoProduto(produtoLista);
});

When("cadastro um novo usuario administrador na tela de Cadastrar Usuario", () => {
  const dadosUsuario = {
    nome: `usuario ${Math.floor(Math.random() * 10000)}`,
    email: `user${Math.floor(Math.random() * 10000)}@email.com`,
    senha: "123",
  };

  Cypress.expose("dadosUsuario", dadosUsuario);
  UsuarioPage.botaoCadastrarUsuarioHome();
  UsuarioPage.preencherFormularioCadastroUsuario(dadosUsuario);
});

Then("devo visualizar o usuário criado na lista de usuários", () => {
  const dadosUsuario = Cypress.expose("dadosUsuario");

  UsuarioPage.validacaoCriacaoUsuario(dadosUsuario);
  UsuarioPage.botaoLogout();
});

Then("devo ser apto a logar com este novo usuario na plataforma", () => {
  const dadosUsuario = Cypress.expose("dadosUsuario");

  CredenciaisUser.preencherLogin({ email: dadosUsuario.email, senha: dadosUsuario.senha });
  CredenciaisUser.clickBotaoLogin();
  CredenciaisUser.validacaoHomeAdmin();
});
