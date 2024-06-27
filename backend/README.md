# Helpinho

Este é um projeto de api wed desenvolvido com **[Serveless framework](https://www.serverless.com/framework)** e **[NestJS](https://nestjs.com/)**, utilizando recusos da **[AWS](https://aws.amazon.com/)** como: o seviço de serverless **[Lambda](https://aws.amazon.com/pt/lambda/)**, o banco de dados **[DynamoDB](https://aws.amazon.com/pt/dynamodb/)** e o serviço de storage de objetos **[S3](https://aws.amazon.com/pt/pm/serv-s3)**.

## :memo: Descrição

O objetivo desta api é permitir que pessoas possam se cadastrar, cadastrar helpinhos e da um help em outras pessoas.

## :books: Funcionalidades

### Crud de usuário

- **Descrição:** a api permite criar, buscar, atualizar e deletar usuários.
  <br/><br/>

### Crud de helpinho

- **Descrição:** a api permite criar, buscar, atualizar e deletar helpinhos.
  <br/><br/>

### Cdastro de help realizao

- **Descrição:** a api permite criar, buscar helps realizado.
  <br/><br/>

## :wrench: Tecnologias utilizadas

✔ **[Serveless framework](https://www.serverless.com/framework)**

✔ **[NestJS](https://nestjs.com/)**

✔ **[Lambda](https://aws.amazon.com/pt/lambda/)**

✔ **[DynamoDB](https://aws.amazon.com/pt/dynamodb/)**

✔ **[S3](https://aws.amazon.com/pt/pm/serv-s3)**

## Arquitetura

O sistema monolítico é estruturado com base na Clean Architecture, promovendo uma separação clara de responsabilidades entre diferentes camadas da aplicação. Este design modulariza o código em quatro camadas principais:

**Camada de Casos de Uso:** Abriga a lógica de aplicação, definindo como as entidades são manipuladas para atender aos requisitos do negócio. Aplicamos o Open/Closed Principle (OCP) e o Interface Segregation Principle (ISP) para assegurar que os casos de uso sejam extensíveis sem modificar código existente e que interfaces específicas sejam definidas para diferentes necessidades.

**Camada de Interface (Interface Adapters):** Responsável por adaptar os dados entre a camada de casos de uso e as interfaces externas, como bancos de dados, APIs e interfaces de usuário. Aqui, padrões como Repository Pattern e Adapter Pattern são usados para isolar a lógica de negócios das tecnologias específicas.

**Camada de Frameworks e Drivers:** Contém detalhes de implementação específica, como frameworks web, ORMs, e outras bibliotecas de terceiros. Esta camada é mantida independente das regras de negócio, permitindo substituições fáceis e testes mais eficientes.

### Principais Design Patterns Utilizados:

**Repository Pattern:** Facilita a abstração e a separação das operações de persistência de dados, permitindo troca fácil de tecnologias de banco de dados sem impactar a lógica de negócios.

**Factory Pattern:** Usado para a criação de objetos complexos, centralizando a lógica de instância em um único ponto, melhorando a manutenção e legibilidade do código.

**Decorator Pattern:** Facilita a adição de funcionalidades a objetos de forma dinâmica, promovendo reutilização e extensão de comportamento sem alterar a estrutura original.

#### Benefícios:

**Manutenção:** A aplicação de princípios SOLID e design patterns garante um código mais modular, fácil de entender, testar e evoluir.
**Testabilidade:** Com a lógica de negócio separada das dependências de implementação, testes unitários podem ser realizados de forma mais eficiente.
**Flexibilidade:** A estrutura modular e o uso de design patterns permitem fácil adaptação e extensão do sistema para novos requisitos sem grandes reestruturações.

## Ambiente de Desenvolvimento

O projeto foi desenvolvido no seguinte ambiente:

- **Node.js 20**
- **NestJS 10.0.0**

## Como Executar o Projeto Localmente

> Para isso você precisa ter [Node, NPM](https://nodejs.org/en) e [Git](https://git-scm.com/) instalados.

1. Clone este repositório.

```sh
git clone https://github.com/Lucas-Lopes-II/LBCA-TI-Helpinho.git
```

2. Navegue até o diretório do projeto na pasta backend.
3. Execute `npm install` para instalar as dependências.

```sh
npm install
```

4. Execute `npm run start:dev` para iniciar o servidor de desenvolvimento.

```sh
npm run start:dev
```

> OBS: certifique-se que haja instânciais do DynamanoDB e S3 e o endereço destes estejam no arqivo serverless.yml.

## Contato

[Linked-in](https://www.linkedin.com/in/lucas-lopes-840965190/)

[Email](mailto:lucas.santos.pessoal@outlook.com)
