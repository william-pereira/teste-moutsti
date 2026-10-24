Feature: Cenários com usuário padrão/cliente

  Scenario: Validar lista de compras adicionando um produto
    Given que sou um usuário cliente logado no e-commerce
    When adiciono um produto a lista de compras
    Then devo ver o produto listado na tela de lista de compras

  
  Scenario: Validar cadastro de um produto na visão de administrador
    Given que sou um usuário administrador logado no e-commerce
    When cadastro um novo produto na tela de Cadastrar produto
    Then devo ver o produto listado na tela de Listar Produtos

  Scenario: Validar cadastro de um novo usuário administrador
    Given que sou um usuário administrador logado no e-commerce
    When cadastro um novo usuario administrador na tela de Cadastrar Usuario
    Then devo visualizar o usuário criado na lista de usuários
    And devo ser apto a logar com este novo usuario na plataforma