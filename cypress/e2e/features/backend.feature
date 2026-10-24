@backend
Feature: API de produtos

Background:
    Given que possuo um token de administrador válido
    And que existe um produto cadastrado na API

  Scenario: Buscar um produto existente pelo ID
    When envio uma requisição GET para buscar o produto pelo ID
    Then a API deve retornar o status 200
    And deve retornar os dados do produto cadastrado
    And o ID retornado deve ser igual ao ID utilizado na busca

  Scenario: Alterar um produto existente com sucesso
    And que possuo novos dados válidos para o produto
    When envio uma requisição PUT para alterar o produto pelo ID
    Then a API deve retornar o status 200
    And deve informar que o produto foi alterado com sucesso
    And os dados do produto devem estar atualizados 

  Scenario: Excluir um produto existente com sucesso
    When envio uma requisição DELETE para excluir o produto pelo ID
    Then a API deve retornar o status 200
    And deve retornar a mensagem "Registro excluído com sucesso"
    And o produto não deve mais existir    