import locators from "../../support/locators";

class usuarioPage {
  preencherFormularioCadastroUsuario(dadosUsuario) {
    cy.get(locators.formularioCadastrarUsuario.nomeUser).type(dadosUsuario.nome);
    cy.get(locators.formularioCadastrarUsuario.emailUser).type(dadosUsuario.email);
    cy.get(locators.formularioCadastrarUsuario.senhaUser).type(dadosUsuario.senha);
    cy.get(locators.formularioCadastrarUsuario.checkBoxUser).check().should("be.checked");
    cy.get(locators.formularioCadastrarUsuario.cadastrarUsuarioButton).click();
  }

  botaoCadastrarUsuarioHome() {
    cy.get(locators.formularioCadastrarUsuario.cadastrarUsuarioButtonHome).click();
  }
  botaoLogout() {
    cy.get(locators.homeElements.logoutButton).click();
  }

  validacaoCriacaoUsuario(dadosUsuario) {
    cy.contains("table.table-striped tbody tr", dadosUsuario.nome).within(() => {
      cy.get("td").eq(0).should("contain.text", dadosUsuario.nome);
      cy.get("td").eq(1).should("contain.text", dadosUsuario.email);
      cy.get("td").eq(2).should("contain.text", dadosUsuario.senha);
      cy.get("td").eq(3).should("contain.text", "true");
    });
  }
}

export const UsuarioPage = new usuarioPage();
