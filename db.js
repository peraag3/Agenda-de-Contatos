const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '3306',
  user: 'root', 
  password: 'root', 
  database: 'agenda_contatos'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conexão bem-sucedida ao MySQL!');
  }
});

module.exports = connection;

// backend/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // seu usuário do MySQL
    password: '', // sua senha do MySQL
    database: 'agenda_de_contatos' // nome do banco de dados
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

module.exports = db;
