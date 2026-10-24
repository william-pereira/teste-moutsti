import locators from "../../support/locators.js";

class loginPage {
  visit() {
    cy.visit("/login");
  }
}

class credenciasUser {
  preencherLogin({ email, senha }) {
    cy.get(locators.LoginPage.emailInput).clear().type(email);

    return cy.get(locators.LoginPage.senhaInput).clear().type(senha, { log: false });
  }

  clickBotaoLogin() {
    cy.get(locators.LoginPage.entrarButton).click();
  }

  validacaoHomeUser() {
    cy.get(locators.homeElements.menuHome).should("be.visible").should("contain.text", "Home");
    cy.contains("p", "Serverest Store");
  }

  validacaoHomeAdmin() {
    cy.get(locators.homeElements.menuHome).should("be.visible").should("contain.text", "Home");
    cy.contains("p", "Este é seu sistema para administrar seu ecommerce.");
  }
}

export const CredenciaisUser = new credenciasUser();
export const LoginPage = new loginPage();
