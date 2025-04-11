-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS agenda_contatos;
USE agenda_contatos;

-- Criação da tabela de contatos
CREATE TABLE IF NOT EXISTS contatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL
);

