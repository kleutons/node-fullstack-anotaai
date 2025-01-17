# 🟢 Projeto Desafio Backend com Node.js e Express ANOTAI
<img src="../docs/arquiteturaBackend.png" alt="Logo" weight="85%">

## 📗 Descrição
Bem-vindo a um projeto desafiador e inovador! Este é um backend robusto, construído com Node.js e Express, projetado para transformar a maneira como você gerencia categorias e produtos. Com funcionalidades completas de CRUD (Create, Read, Update, Delete), ele vai além do básico ao gerar um catálogo JSON otimizado, servindo como um eficiente cache de dados para reduzir o impacto sobre o banco de dados MongoDB.

Mas isso não é tudo! O sistema conta com autenticação avançada de usuários, implementada com JWT (JSON Web Token), garantindo acesso seguro e permitindo a definição de diferentes níveis de permissões. Este é mais do que um backend comum – é um desafio emocionante para criar uma solução poderosa, escalável e segura. 🚀

# 🔥 Desafio Técnico
Este projeto faz parte do desafio [GitHub Anotai - New Test Backend Node.js](https://github.com/githubanotaai/new-test-backend-nodejs).

O desafio consiste em desenvolver uma API para um sistema de gerenciamento de catálogo de produtos em uma aplicação de marketplace, com base nas seguintes histórias de usuário:
- [x] Como usuário, quero cadastrar um produto com seu proprietário, para que eu possa acessar seus dados no futuro (título, descrição, preço, categoria, ID do proprietário).
- [x] Como usuário, quero cadastrar uma categoria com seu proprietário, para que eu possa acessar seus dados no futuro (título, descrição, ID do proprietário)
- [x] Como usuário, quero associar um produto a uma categoria.
- [x] Como usuário, quero atualizar os dados de um produto ou categoria.
- [x] Como usuário, quero deletar um produto ou categoria do meu catálogo.
- [x] Um produto pode estar associado apenas a uma categoria por vez.
- [x] Produtos e categorias pertencem apenas a um proprietário.
- [x] Gere o JSON do catálogo e publique-o para chache.

Diagrama representando a estrutura final do projeto:

![imagem]( https://github.com/githubanotaai/new-test-backend-nodejs/assets/52219768/504ba448-f128-41db-ae86-18dc19c0dc9d )

# 🧩 Arquitetura em Camadas 
 - `routes`
 - `controllers`
 - `services`
 - `repositories` (Prisma ORM)
 - `data` (cache)
 - `models` 

# 🚀 Tecnologias Utilizadas
- Node.js
- Express
- MongoDB
- Prisma (ORM)
- JWT (json web token)

# 🛠️ Instalação
Clone este repositório
```
    git clone https://github.com/kleutons/node-fullstack-anotaai
```
Navegue até a pasta backend
```
    cd ./backend
```
Instale as dependências
```
    npm install
```
Configure as variáveis de ambiente
- Crie um arquivo .env na raiz do projeto backend
- Adicione as variáveis de ambiente necessárias: (ex: PORT definir a porta do server, DATABASE_URL para a conexão com o banco de dados MongoDB, SECRET: Variavel de segurança para o JWT )
  ```env
    PORT=3333
    DATABASE_URL="mongodb+srv://xxx"
    SECRET="XXX"
  ```

Configure o Prisma
```
npx prisma init
```
Inicie o servidor
```
    npm run dev
```

# 🌐 Endpoints / Funcionalidades
## 🔐 Login
| Method | Path | Action |
| ------ | ---- | ------ |
| GET    | /api/login | Realizar Login (JWT) |

### Exemplo Method GET de Login Retornar o Token:
```json
    { 
        "email": "user@email.com",
        "password": "xxx"
    }
 ```


## 👤 Usuários
| Method | Path | Action |
| ------ | ---- | ------ |
| GET       | /api/user     | Lista todas os usuários (Somente Admin) |
| POST      | /api/user     | Cria um novo usuário (Somente Admin) |
| PUT       | /api/user/:id | Atualiza um usuário pelo ID |
| DELETE    | /api/user/:id | Remove um usuário pelo ID (Somente Admin) |

### Exemplo Method Post para criar Usuários:
```json
    { 
        "name": "User / Store Name",
        "storeId": "store-name",
        "email": "user@email.com",
        "password": "xxx", 
        "role": "ADMIM / STORE"
    }
 ```

## 🗂️ Categorias
| Method | Path | Action |
| ------ | ---- | ------ |
| GET       | /api/category/:ownerId     | Lista todas as categorias de um usuário id |
| POST      | /api/category     | Cria uma nova categoria |
| PUT       | /api/category/:id | Atualiza uma categoria pelo ID |
| DELETE    | /api/category/:id | Remove uma categoria pelo ID |

### Exemplo Method Post para criar Categoria:
```json
    { 
        "title": "Category title", 
        "ownerId": "xxxx", 
        "description": "product description"
    }
```

## 📦 Produtos

| Method | Path | Action |
| ------ | ---- | ------ |
| GET       | /api/product/:ownerId     | Lista todos os produtos de um usuário id |
| POST      | /api/product     | Cria um novo produto |
| PUT       | /api/product/:id | Atualiza um produto pelo ID |
| DELETE    | /api/product/:id | Remove um produto pelo ID |

### Exemplo Method Post Para criar Produto:
```json
    { 
        "title": "Product title", 
        "ownerId": "xxxx", 
        "categoryId": "xxxx", 
        "price": "10.99", 
        "description": "product description",  
        "imgUrl": "https://exemple.com/img.jpg"  
    }
```

## 📲 Catálogo

| Method | Path | Action |
| ------ | ---- | ------ |
| GET       | /api/catalog/:ownerId     | Lista catálogo .json de um usuário id |

### Exemplo Method Get Para Mostrar Catálogo em Cache:
```json
    { 
        ownerId,
        catalog: [{
            category_title,
            category_description,
            items: [{
                title, 
                description,
                price,
                imgUrl?
            }]
    }
```

# 👤 Author

| [<img src="https://avatars3.githubusercontent.com/u/106082564?s=96&v=4"><br><sub>Kleuton Novais</sub>](https://github.com/kleutons) |
| :---------------------------------------------------------------------------------------------------------------------------------------: |
|                                            [Linkedin](https://www.linkedin.com/in/kleuton-novais/)                                             |