class ProdutoService {
  // Gera um nome aleatório para ser utilizado na criação do produto
  gerarNomeProdutoAleatorio(nomeProdutoBase) {
    const numeroAleatorio = Math.floor(10000 + Math.random() * 90000);

    return `${nomeProdutoBase} ${numeroAleatorio}`;
  }

  cadastrarProduto(token) {
    return cy.env(["apiUrl", "nomeProduto"]).then(({ apiUrl, nomeProduto }) => {
      const nomeProdutoCriado = this.gerarNomeProdutoAleatorio(nomeProduto);

      return cy
        .fixture("api/requestBodies/BodyCadastrarProduto.json")
        .then((bodyCadastrarProduto) => {
          const body = { ...bodyCadastrarProduto, nome: nomeProdutoCriado };
          return cy.request({
            method: "POST",
            url: `${apiUrl}/produtos`,
            log: false,
            headers: {
              authorization: token,
              "Content-Type": "application/json",
            },
            body: body,
          });
        })
        .then((response) => {
          expect(response.status).to.eq(201);
          expect(Boolean(response.body._id)).to.eq(true);

          return {
            id: response.body._id,
            nome: nomeProdutoCriado,
          };
        });
    });
  }

  deletarProduto(token, produtoId) {
    return cy.env(["apiUrl"]).then(({ apiUrl }) => {
      return cy.request({
        method: "DELETE",
        url: `${apiUrl}/produtos/${produtoId}`,
        log: false,
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      });
    });
  }

  // endpoint utilizado exclusivamente para testes no backend.feature
  buscarProdutoPorId(produtoId) {
    return cy.env(["apiUrl"]).then(({ apiUrl }) => {
      return cy.request({
        method: "GET",
        url: `${apiUrl}/produtos/${produtoId}`,
        failOnStatusCode: false,
      });
    });
  }

  // endpoint utilizado exclusivamente para testes no backend.feature
  editarProduto(token, produtoId, novosDadosProduto) {
    return cy.env(["apiUrl"]).then(({ apiUrl }) => {
      return cy.request({
        method: "PUT",
        url: `${apiUrl}/produtos/${produtoId}`,
        log: false,
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: novosDadosProduto,
        failOnStatusCode: false,
      });
    });
  }
}

module.exports = new ProdutoService();
