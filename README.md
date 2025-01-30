Projeto POrtalSBCredito Front

Sobre o Projeto

Este projeto é um frontend desenvolvido em Angular que consome a API .NET 8 implementada no repositório backend correspondente. Ele fornece uma interface amigável e responsiva para os usuários interagirem com os dados e funcionalidades expostos pela API.

Tecnologias Utilizadas

Angular 16+

TypeScript

RxJS

Bootstrap

CSS

HttpClient para chamadas à API

Configuração e Execução

Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

Node.js (versão 16+)

Angular CLI

Banco de dados e API rodando

Instalação das Dependências

Execute o comando abaixo para instalar todas as dependências do projeto:

npm install

Configuração da API

No arquivo src/environments/environment.ts, configure a URL da API:

export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};

Executando o Projeto

Para rodar a aplicação em modo de desenvolvimento, utilize:

ng serve

A aplicação estará disponível em http://localhost:4200.
