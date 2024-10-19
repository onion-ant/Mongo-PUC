## Descrição

Este projeto é uma API construída usando o framework NestJS que interage com um banco de dados MongoDB para criar e gerenciar registros.

## Configuração do Projeto
Instale as dependecias com este comando:
```bash
$ npm install
```
Crie um arquivo **`.env`** na pasta raiz do projeto e adicione a seguinte linha
```
DB_CONNECTION_STRING = "Connection string do seu banco mongo"
```
## Rodando o Projeto
Para rodar o projeto é preciso apenas inserir o seguinte comando no terminal:
```bash
$ npm run start
```
Apos isso o projeto deve estar disponivel acessando o http://localhost:3000/api
