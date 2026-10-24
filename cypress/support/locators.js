import { cadastrarProduto } from "../e2e/services/produto-service";

const locators = {
  LoginPage: {
    emailInput: '[data-testid="email"]',
    senhaInput: '[data-testid="senha"]',
    entrarButton: '[data-testid="entrar"]',
  },
  homeElements: {
    menuHome: '[data-testid="home"]',
    CadastrarProdutoButton: '[data-testid="cadastrarProdutos"]',
    CadastrarUsuarioButton: '[data-testid="cadastrarUsuarios"]',
    logoutButton: '[data-testid="logout"]',
  },
  produtoElements: {
    pesquisarInput: '[data-testid="pesquisar"]',
    pesquisarButton: '[data-testid="botaoPesquisar"]',
    adicionarListaButton: '[data-testid="adicionarNaLista"]',
    tituloProdutoName: '[data-testid="shopping-cart-product-name"]',
    listaComprasTitle: "Lista de Compras",
  },
  formularioCadastrarProduto: {
    nomeProduto: '[data-testid="nome"]',
    precoProduto: '[data-testid="preco"]',
    descricaoProduto: '[data-testid="descricao"]',
    quantidadeProduto: '[data-testid="quantity"]',
    imagemInput: '[data-testid="imagem"]',
    cadastrarProdutoButton: '[data-testid="cadastarProdutos"]',
  },
  formularioCadastrarUsuario: {
    nomeUser: '[data-testid="nome"]',
    emailUser: '[data-testid="email"]',
    senhaUser: '[data-testid="password"]',
    cadastrarUsuarioButton: '[data-testid="cadastrarUsuario"]',
    cadastrarUsuarioButtonHome: '[data-testid="cadastrarUsuarios"]',
    checkBoxUser: '[data-testid="checkbox"]',
  },
  listaProdutoPage: {
    botaoExcluir: '[type="button"]',
  },
};

export default locators;
