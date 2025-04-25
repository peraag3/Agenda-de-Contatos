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
