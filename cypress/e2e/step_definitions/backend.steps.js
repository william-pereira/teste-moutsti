import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import AutenticacaoService from "../services/autenticacao-service";
import produtoService from "../services/produto-service";

let adminId;
let tokenAdmin;
let produtoCriado;
let resposta;
let novosDadosProduto;
let produtoIdExcluido;

Given("que possuo um token de administrador válido", () => {
  return cy
    .env(["AdminEmail"])
    .then(({ AdminEmail }) => {
      return AutenticacaoService.criarUsuario(AdminEmail, "true");
    })
    .then((adminCriado) => {
      adminId = adminCriado.id;

      return AutenticacaoService.obterToken(adminCriado.email);
    })
    .then((tokenCriado) => {
      tokenAdmin = tokenCriado;
    });
});

Given("que existe um produto cadastrado na API", () => {
  return produtoService.cadastrarProduto(tokenAdmin).then((produto) => {
    produtoCriado = produto;
  });
});

When("envio uma requisição GET para buscar o produto pelo ID", () => {
  return produtoService.buscarProdutoPorId(produtoCriado.id).then((response) => {
    resposta = response;
  });
});

// Validações após requisição

Then("a API deve retornar o status 200", () => {
  expect(resposta.status).to.equal(200);
});

Then("deve retornar os dados do produto cadastrado", () => {
  expect(resposta.body.nome).to.equal(produtoCriado.nome);

  expect(resposta.body.preco).to.be.a("number");

  expect(resposta.body.descricao).to.be.a("string");

  expect(resposta.body.quantidade).to.be.a("number");
});

Then("o ID retornado deve ser igual ao ID utilizado na busca", () => {
  expect(resposta.body._id).to.equal(produtoCriado.id);
});

Given("que possuo novos dados válidos para o produto", () => {
  novosDadosProduto = {
    nome: `Produto alterado ${Math.floor(Math.random() * 10000)}`,
    preco: 470,
    descricao: "Mouse",
    quantidade: 1,
  };
});

When("envio uma requisição PUT para alterar o produto pelo ID", () => {
  return produtoService.editarProduto(tokenAdmin, produtoCriado.id, novosDadosProduto).then((response) => {
    resposta = response;
  });
});

Then("deve informar que o produto foi alterado com sucesso", () => {
  return produtoService.buscarProdutoPorId(produtoCriado.id).then((response) => {
    expect(response.status).to.equal(200);
    expect(resposta.body.message).to.equal("Registro alterado com sucesso");
  });
});

Then("os dados do produto devem estar atualizados", () => {
  return produtoService.buscarProdutoPorId(produtoCriado.id).then((response) => {
    expect(response.body.nome).to.equal(novosDadosProduto.nome);

    expect(response.body.preco).to.equal(novosDadosProduto.preco);

    expect(response.body.descricao).to.equal(novosDadosProduto.descricao);

    expect(response.body.quantidade).to.equal(novosDadosProduto.quantidade);
  });
});

When("envio uma requisição DELETE para excluir o produto pelo ID", () => {
  produtoIdExcluido = produtoCriado.id;

  return produtoService.deletarProduto(tokenAdmin, produtoIdExcluido).then((response) => {
    resposta = response;
    produtoCriado = undefined;
  });
});

Then("deve retornar a mensagem {string}", (mensagemEsperada) => {
  expect(resposta.body.message).to.equal(mensagemEsperada);
});

Then("o produto não deve mais existir", () => {
  return produtoService.buscarProdutoPorId(produtoIdExcluido).then((response) => {
    expect(response.status).to.equal(400);

    expect(response.body.message).to.equal("Produto não encontrado");
  });
});
