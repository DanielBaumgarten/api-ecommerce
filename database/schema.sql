-- ==========================
-- USUARIOS
-- ==========================
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- ==========================
-- CLIENTES
-- ==========================
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT
);

-- ==========================
-- CATEGORIAS
-- ==========================
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

-- ==========================
-- MARCAS
-- ==========================
CREATE TABLE marcas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    url_logo TEXT
);

-- ==========================
-- FORNECEDORES
-- ==========================
CREATE TABLE fornecedores (
    id SERIAL PRIMARY KEY,
    empresa VARCHAR(150) NOT NULL,
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(150) UNIQUE NOT NULL
);

-- ==========================
-- PRODUTOS
-- ==========================
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    preco NUMERIC(10,2) NOT NULL,
    descricao TEXT,
    estoque INTEGER NOT NULL DEFAULT 0,

    categoria_id INTEGER NOT NULL,
    marca_id INTEGER NOT NULL,

    CONSTRAINT fk_produto_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id),

    CONSTRAINT fk_produto_marca
        FOREIGN KEY (marca_id)
        REFERENCES marcas(id)
);

-- ==========================
-- PEDIDOS
-- ==========================
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,

    cliente_id INTEGER NOT NULL,

    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    status VARCHAR(20) NOT NULL DEFAULT 'PENDENTE',

    forma_pagamento VARCHAR(50),

    valor_total NUMERIC(10,2) DEFAULT 0,

    CONSTRAINT fk_pedido_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES clientes(id)
);

-- ==========================
-- ITENS PEDIDO
-- ==========================
CREATE TABLE itens_pedido (
    id SERIAL PRIMARY KEY,

    pedido_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,

    quantidade INTEGER NOT NULL,
    valor_unitario NUMERIC(10,2) NOT NULL,

    CONSTRAINT fk_item_pedido
        FOREIGN KEY (pedido_id)
        REFERENCES pedidos(id),

    CONSTRAINT fk_item_produto
        FOREIGN KEY (produto_id)
        REFERENCES produtos(id)
);

-- ==========================
-- COMPRAS
-- ==========================
CREATE TABLE compras (
    id SERIAL PRIMARY KEY,

    fornecedor_id INTEGER NOT NULL,

    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    produtos_diferentes INTEGER DEFAULT 0,

    CONSTRAINT fk_compra_fornecedor
        FOREIGN KEY (fornecedor_id)
        REFERENCES fornecedores(id)
);

-- ==========================
-- ITENS COMPRA
-- ==========================
CREATE TABLE itens_compra (
    id SERIAL PRIMARY KEY,

    compra_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,

    quantidade INTEGER NOT NULL,

    CONSTRAINT fk_item_compra
        FOREIGN KEY (compra_id)
        REFERENCES compras(id),

    CONSTRAINT fk_item_compra_produto
        FOREIGN KEY (produto_id)
        REFERENCES produtos(id)
);