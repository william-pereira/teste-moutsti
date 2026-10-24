import locators from "../../support/locators.js";

class produtoPage {
  pesquisarProduto() {
    const nomeProdutoCriado = Cypress.expose("nomeProdutoCriado");

    cy.get(locators.produtoElements.pesquisarInput).type(nomeProdutoCriado);
    cy.get(locators.produtoElements.pesquisarButton).click();
    cy.get(locators.produtoElements.adicionarListaButton).click();

    return cy
      .get(locators.produtoElements.tituloProdutoName, { timeout: 10000 })
      .should("be.visible")
      .should("contain.text", nomeProdutoCriado);
  }
  listaCompras() {
    cy.contains("h1", "Lista de Compras").should("be.visible");
  }

  BotaoCadastrarProduto() {
    cy.get(locators.homeElements.CadastrarProdutoButton).click();
  }

  preencherFormularioProduto(produtoLista) {
    cy.get(locators.formularioCadastrarProduto.nomeProduto).type(produtoLista.nome);
    cy.get(locators.formularioCadastrarProduto.precoProduto).type(produtoLista.preco);
    cy.get(locators.formularioCadastrarProduto.descricaoProduto).type(produtoLista.descricao);
    cy.get(locators.formularioCadastrarProduto.quantidadeProduto).type(produtoLista.quantidade);
    cy.get(locators.formularioCadastrarProduto.imagemInput).selectFile(produtoLista.imagem);
    cy.get(locators.formularioCadastrarProduto.cadastrarProdutoButton).click();
    cy.contains("h1", "Lista dos Produtos").should("be.visible");
  }

  validacaoProduto(produtoLista) {
    const arquivoImagem = produtoLista.imagem.split(/[\\/]/).pop();

    cy.contains("table.table-striped tbody tr", produtoLista.nome).within(() => {
      cy.get("td").eq(0).should("contain.text", produtoLista.nome);

      cy.get("td").eq(1).should("have.text", produtoLista.preco);

      cy.get("td").eq(2).should("contain.text", produtoLista.descricao);

      cy.get("td").eq(3).should("have.text", produtoLista.quantidade);

      cy.get("td").eq(4).should("contain.text", arquivoImagem);

      cy.contains("button", "Excluir").click();
    });
  }
}

export const ProdutoPage = new produtoPage();
