# User (Proprietário)
- Id *Unique
- name
- storeId *Unique
- email *Unique
- password
- role admim | store
- status Boolean
- imgUrl

# Category (Categoria)
- id *Unique
- ownerId
- title
- description

# Product (Produtos)
- id *Unique
- ownerId
- categoryId
- title
- price
- description
- imgUrl