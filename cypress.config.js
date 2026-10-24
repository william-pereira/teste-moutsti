const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { allureCypress } = require("allure-cypress/reporter");
const cypressOnFix = require("cypress-on-fix");

module.exports = defineConfig({
  expose: {
    requestMode: true, // ajuda a ler melhor as requisições dos enpoints
    hideCredentials: true, // esconde senhas e header auth
    hideCredentialsOptions: {
      headers: ["authorization"],
      body: ["password"],
      qs: ["password"],
      auth: ["password"],
    },
  },
  env: {
    apiUrl: "https://serverest.dev",
  },
  e2e: {
    specPattern: "cypress/e2e/features/**/*.feature", // adicionado o caminho para os arquivos feature
    baseUrl: "https://front.serverest.dev/", //adicionado a url base para utilizar nos métodos

    async setupNodeEvents(on, config) {
      on = cypressOnFix(on);

      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );

      allureCypress(on, config, {
        resultsDir: "allure-results",
      });

      return config;
    },
  },
});
