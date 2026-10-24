# Automação de testes ServeRest com Cypress

Projeto de automação de testes frontend e backend para a aplicação [ServeRest](https://serverest.dev), desenvolvido com Cypress e Cucumber.

O projeto cobre fluxos executados pela interface web e testes diretos da API. A organização separa a descrição dos cenários, as ações de tela, as requisições HTTP e os dados utilizados nos testes.

## Tecnologias utilizadas

- **Cypress 16**: execução dos testes de interface e API.
- **Cucumber/Gherkin**: escrita dos cenários em linguagem de negócio nos arquivos `.feature`.
- **@badeball/cypress-cucumber-preprocessor**: integração entre Cypress e Cucumber.
- **esbuild**: processamento e compilação dos arquivos de teste.
- **@bahmutov/cypress-esbuild-preprocessor**: integração do esbuild com o Cypress.
- **cypress-plugin-api**: melhora a visualização das requisições e respostas de API no Cypress.
- **Allure Report**: gera relatórios HTML com resultados, duração, falhas e evidências da execução.
- **allure-cypress**: integração entre o Cypress e o Allure Report.
- **cypress-on-fix**: permite que Allure e Cucumber compartilhem os eventos do Cypress sem sobrescrever um ao outro.

Todas essas dependências já estão declaradas no `package.json` e são instaladas juntas pelo npm.

## Pré-requisitos

Antes de instalar o projeto, é necessário ter:

- [Git](https://git-scm.com/) para clonar o repositório.
- [Node.js](https://nodejs.org/) **22.x ou superior**, dentro de uma versão suportada pelo Cypress 16.
- npm, instalado juntamente com o Node.js.
- Acesso à internet para instalar as dependências e acessar os ambientes do ServeRest.

Recomenda-se utilizar o Node.js 22 LTS.

## Instalação do projeto

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd teste-ambev
```

Caso o projeto já esteja disponível na máquina, basta abrir um terminal na pasta raiz dele.

### 2. Instalar as dependências

Como o projeto possui um `package-lock.json`, utilize preferencialmente:

```bash
npm ci
```

Esse comando instala as versões exatas registradas no arquivo de lock.

Para uma instalação comum, também é possível utilizar:

```bash
npm install
```

### 3. Criar o arquivo de variáveis de ambiente

Na raiz do projeto, crie o arquivo `cypress.env.json`:

```json
{
  "nomeUser": "Usuario Teste",
  "AdminEmail": "admin@teste.com",
  "senhaPadrao": "123",
  "UserEmail": "cliente@teste.com",
  "nomeProduto": "Produto teste"
}
```

Esses valores funcionam como dados-base. Durante os testes, o projeto acrescenta números aleatórios aos e-mails e nomes de produtos para evitar cadastros duplicados.

O arquivo `cypress.env.json` está no `.gitignore` e não deve ser enviado ao repositório, pois pode conter dados específicos de cada ambiente.

### Modo headless

```bash
npm run cy:run
```

Esse comando executa todas as features pelo terminal.

## Relatórios com Allure

Durante a execução em modo headless, o `allure-cypress` grava os resultados na pasta `allure-results`.

Primeiro, execute os testes:

```bash
npm run cy:run
```

Depois, gere e abra o relatório temporariamente no navegador:

```bash
npm run allure:serve
```

Também é possível gerar um relatório HTML permanente:

```bash
npm run allure:generate
npm run allure:open
```

O comando `allure:generate` cria o relatório na pasta `allure-report`, enquanto `allure:open` abre esse relatório no navegador.

As pastas `allure-results` e `allure-report` estão no `.gitignore`, pois são artefatos gerados durante a execução e não precisam ser versionados.

## Ambientes utilizados

Os testes utilizam os ambientes públicos do ServeRest:

- Frontend: `https://front.serverest.dev/`
- API: `https://serverest.dev`

A `baseUrl` do frontend e a variável `apiUrl` estão configuradas no arquivo `cypress.config.js`. Não é necessário iniciar a aplicação ServeRest localmente.

## Estrutura do projeto

```text
teste-ambev/
├── cypress/
│   ├── e2e/
│   │   ├── features/
│   │   │   ├── frontend.feature
│   │   │   └── backend.feature
│   │   ├── pages/
│   │   │   ├── loginPage.js
│   │   │   ├── produtoPage.js
│   │   │   └── usuarioPage.js
│   │   ├── services/
│   │   │   ├── autenticacao-service.js
│   │   │   └── produto-service.js
│   │   └── step_definitions/
│   │       ├── common/
│   │       │   └── hooks.js
│   │       ├── frontend.steps.js
│   │       └── backend.steps.js
│   ├── fixtures/
│   │   ├── api/requestBodies/BodyCadastrarProduto.json
│   │   └── imagens/produto.png
│   └── support/
│       ├── commands.js
│       ├── e2e.js
│       └── locators.js
├── cypress.config.js
├── cypress.env.json
├── package.json
└── package-lock.json
```

## Responsabilidade de cada pasta

### `cypress/e2e/features`

Contém os cenários escritos em Gherkin. Esses arquivos descrevem **o que** deve ser testado, sem concentrar detalhes técnicos da implementação.

- `frontend.feature`: cenários executados pela interface web.
- `backend.feature`: cenários que chamam diretamente os endpoints da API.

As tags `@frontend` e `@backend` identificam cada tipo de teste. A tag `@frontend` também é utilizada pelos hooks para preparar e remover a massa necessária aos cenários de interface.

### `cypress/e2e/step_definitions`

Contém a implementação dos passos `Given`, `When` e `Then` descritos nas features.

- `frontend.steps.js`: conecta os passos da feature frontend aos Page Objects.
- `backend.steps.js`: conecta os passos da feature backend aos services e realiza as validações das respostas.
- `common/hooks.js`: executa a preparação e a limpeza dos dados dos cenários identificados com `@frontend`.

Os steps atuam como uma camada de orquestração: recebem a frase do Gherkin e chamam a página ou o service responsável pela ação.

### `cypress/e2e/pages`

Contém os **Page Objects**, responsáveis pelas interações com a interface.

- `loginPage.js`: acesso à tela de login, preenchimento das credenciais e validação das páginas iniciais.
- `produtoPage.js`: pesquisa, cadastro, listagem e validação de produtos.
- `usuarioPage.js`: cadastro, validação e ações relacionadas aos usuários.

### `cypress/e2e/services`

Contém os serviços responsáveis pelas chamadas diretas à API.

- `autenticacao-service.js`: cria usuários, gera e-mails aleatórios, realiza login para obter token e exclui usuários.
- `produto-service.js`: cria, consulta, altera e exclui produtos, incluindo a geração de nomes aleatórios.

Os services são reutilizados tanto para testar endpoints quanto para preparar os dados necessários aos testes frontend.

### `cypress/fixtures`

Armazena dados e arquivos utilizados durante os testes.

- `api/requestBodies`: corpos JSON usados nas requisições.
- `imagens`: arquivos enviados pelos campos de upload da interface.

O arquivo `BodyCadastrarProduto.json`, por exemplo, fornece a estrutura-base de um produto. O service substitui seu nome por um valor aleatório antes do cadastro.

### `cypress/support`

Contém configurações e recursos compartilhados pela automação.

- `locators.js`: centraliza os seletores utilizados pelos Page Objects.
- `e2e.js`: arquivo carregado automaticamente antes dos testes E2E.
- `commands.js`: carrega extensões e comandos compartilhados, incluindo o `cypress-plugin-api`.

### Arquivos da raiz

- `cypress.config.js`: define URLs, padrão das features, Cucumber, esbuild e opções do plugin de API.
- `cypress.env.json`: guarda os dados-base locais utilizados nos testes.
- `package.json`: registra dependências e scripts de execução.
- `package-lock.json`: fixa as versões instaladas das dependências.

## Page Object Model

O Page Object Model separa a lógica da interface da descrição dos cenários.

O fluxo utilizado no projeto é:

```text
Feature → Step Definition → Page Object → Interface ServeRest
```

Exemplo conceitual:

```gherkin
When cadastro um novo produto na tela de Cadastrar produto
```

O step correspondente prepara os dados e chama métodos do `produtoPage.js`. O Page Object localiza os campos, preenche o formulário e envia o cadastro.

Essa separação oferece algumas vantagens:

- reduz a repetição de seletores e comandos;
- mantém os steps mais próximos da linguagem de negócio;
- concentra alterações da interface nas páginas;
- facilita a reutilização das mesmas ações em cenários diferentes.

## Organização dos testes frontend

Antes de cada cenário com a tag `@frontend`, o hook:

1. cria um administrador por API;
2. cria um cliente por API;
3. obtém o token do administrador;
4. cria um produto por API;
5. disponibiliza os dados gerados para os steps e Page Objects.

Os dados são compartilhados durante a execução por meio de `Cypress.expose()`. Isso permite que o login utilize o e-mail realmente criado e que a busca utilize o nome real do produto.

Depois do cenário, o hook limpa cookies e armazenamento local, exclui o produto e remove os usuários preparados por API.

Os testes frontend atuais validam:

- inclusão de produto na lista de compras por um cliente;
- cadastro e listagem de produto por um administrador;
- cadastro de um novo administrador pela interface e login com esse usuário.

## Organização dos testes backend

O fluxo dos testes de API é:

```text
Feature → Step Definition → Service → API ServeRest
```

O `Background` da feature backend prepara os dados comuns a cada cenário:

1. cria um administrador;
2. realiza login e obtém um token válido;
3. cria um produto que será utilizado pelo cenário.

O token é enviado no header `authorization` das operações protegidas.

Os testes backend atuais validam:

- `GET /produtos/{id}`: busca de produto pelo ID;
- `PUT /produtos/{id}`: alteração de produto com token de administrador;
- `DELETE /produtos/{id}`: exclusão de produto com token de administrador.

As respostas são guardadas no step em execução e posteriormente validadas quanto ao status, mensagem e conteúdo retornado.

## Dados aleatórios

Usuários e produtos recebem valores aleatórios no momento do cadastro:

- o e-mail recebe um número de cinco dígitos antes do `@`;
- o produto recebe um número aleatório depois do nome-base.

Exemplos:

```text
admin48291@teste.com
Produto teste 48291
```

Isso reduz conflitos com registros de execuções anteriores e permite repetir os testes sem depender de um único dado fixo.

## Observações sobre limpeza de dados

Os cenários frontend possuem preparação e limpeza por hooks com a tag `@frontend`.

No estado atual do projeto, a feature backend cria um administrador e um produto no `Background`, mas ainda não possui um hook `After` dedicado para remover todos os registros criados pelos cenários de busca e alteração. Ao ampliar a suíte, recomenda-se criar uma limpeza específica para `@backend`, evitando massa residual no ambiente.

## Adicionando novos testes

### Novo cenário frontend

1. Adicione o cenário ao arquivo `frontend.feature`.
2. Implemente seus passos em `frontend.steps.js`.
3. Adicione interações de tela no Page Object correspondente.
4. Cadastre novos seletores em `locators.js` quando necessário.
5. Inclua arquivos de upload ou massas fixas em `fixtures`.

### Novo cenário backend

1. Adicione o cenário ao arquivo `backend.feature`.
2. Implemente os passos em `backend.steps.js`.
3. Adicione a chamada HTTP ao service responsável.
4. Armazene o retorno da requisição no step.
5. Valide status, corpo e regras esperadas em passos `Then`.

## Scripts disponíveis

| Comando                   | Descrição                                                        |
| ------------------------- | ---------------------------------------------------------------- |
| `npm run cy:open`         | Abre a interface interativa do Cypress.                          |
| `npm run cy:run`          | Executa toda a suíte e gera os resultados do Allure.             |
| `npm run allure:serve`    | Gera temporariamente e abre o relatório Allure no navegador.     |
| `npm run allure:generate` | Gera o relatório HTML na pasta `allure-report`.                  |
| `npm run allure:open`     | Abre no navegador o relatório HTML gerado anteriormente.         |
