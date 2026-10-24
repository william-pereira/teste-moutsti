class AutenticacaoService {
  // Gerando um email aleatório para ser utilizado nos métodos de criação de usuário
  gerarEmailAleatorio(emailBase) {
    const [nome, dominio] = emailBase.split("@");

    const numeroAleatorio = Math.floor(10000 + Math.random() * 90000);

    return `${nome}${numeroAleatorio}@${dominio}`;
  }

  obterToken(email) {
    return cy
      .env(["apiUrl", "senhaPadrao"])
      .then(({ apiUrl, senhaPadrao }) => {
        return cy.request({
          method: "POST",
          url: `${apiUrl}/login`,
          body: {
            email: email,
            password: senhaPadrao,
          },
        });
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.authorization).to.exist;

        return response.body.authorization;
      });
  }

  // criação de usuário com email e administrador como parâmetros (para criar usuário normal e admin)
  criarUsuario(emailBase, administrador) {
    const emailCriado = this.gerarEmailAleatorio(emailBase);

    return cy.env(["apiUrl", "senhaPadrao", "nomeUser"]).then(({ apiUrl, senhaPadrao, nomeUser }) => {
      return cy
        .request({
          method: "POST",
          url: `${apiUrl}/usuarios`,
          body: {
            nome: nomeUser,
            email: emailCriado,
            password: senhaPadrao,
            administrador: administrador,
          },
        })
        .then((response) => {
          expect(response.status).to.eq(201);
          expect(Boolean(response.body._id)).to.eq(true);

          return cy.log(`O email criado foi: ${emailCriado}`).then(() => {
            return {
              id: response.body._id,
              email: emailCriado,
            };
          });
        });
    });
  }

  deletarUsuario(usuarioId) {
    return cy.env(["apiUrl"]).then(({ apiUrl }) => {
      return cy
        .request({
          method: "DELETE",
          url: `${apiUrl}/usuarios/${usuarioId}`,
        })
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq("Registro excluído com sucesso");
        });
    });
  }
}

module.exports = new AutenticacaoService();
