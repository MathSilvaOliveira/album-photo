# Projeto Fullstack com React, Node.js e MongoDB

Este é um projeto fullstack que utiliza React para o frontend, Node.js para o backend e MongoDB como banco de dados.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado os seguintes softwares em sua máquina:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [Yarn](https://yarnpkg.com/) (ou npm, se preferir)
- [MongoDB](https://www.mongodb.com/try/download/community) (instalado e rodando)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) (opcional, mas útil para visualizar o banco de dados)

## Configuração do Projeto

### Backend

1. Navegue até a pasta `backend`:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor backend:
   ```bash
   node src/server.js
   ```
   O servidor backend estará rodando em `http://localhost:5000` (ou na porta configurada no seu arquivo `.env`).

### Frontend

1. Em um novo terminal, navegue até a pasta `frontend`:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   yarn install
   ```

3. Inicie o servidor de desenvolvimento do React:
   ```bash
   yarn start
   ```
   O frontend estará rodando em `http://localhost:3000`.

---

### Configuração do Banco de Dados

Certifique-se de que o MongoDB está instalado e rodando em sua máquina. Se você estiver usando o MongoDB Compass, pode se conectar ao banco de dados localmente usando a URI padrão:

```
mongodb://localhost:27017
```

---

### Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend` para configurar as variáveis de ambiente necessárias, como a URI do MongoDB e a porta do servidor:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nome_do_banco
```

---

### Observações Finais

- Substitua `nome_do_banco` pelo nome do banco de dados que você está utilizando.

---
