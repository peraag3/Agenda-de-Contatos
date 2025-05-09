const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'agenda_de_contatos'
});

// Conexão com o banco
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  } else {
    console.log('Banco de dados conectado com sucesso');
  }
});

// Rota GET para buscar todos os contatos
router.get('/', (req, res) => {
  db.query('SELECT * FROM contatos', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar contatos', error: err });
    }
    res.json(results);
  });
});

// Rota GET para buscar um contato pelo ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM contatos WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar contato', error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    }
    res.json(results[0]);
  });
});

// Rota POST para adicionar um novo contato
router.post('/', (req, res) => {
  const { nome, telefone, email } = req.body;

  // Validação básica
  if (!nome || !telefone || !email) {
    return res.status(400).json({ message: 'Nome, telefone e email são obrigatórios' });
  }

  db.query(
    'INSERT INTO contatos (nome, telefone, email) VALUES (?, ?, ?)',
    [nome, telefone, email],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao adicionar contato', error: err });
      }
      res.status(201).json({ message: 'Contato criado com sucesso', id: results.insertId });
    }
  );
});

// Rota PUT para atualizar um contato
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, telefone, email } = req.body;

  // Validação básica
  if (!nome || !telefone || !email) {
    return res.status(400).json({ message: 'Nome, telefone e email são obrigatórios' });
  }

  db.query(
    'UPDATE contatos SET nome = ?, telefone = ?, email = ? WHERE id = ?',
    [nome, telefone, email, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao atualizar contato', error: err });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Contato não encontrado' });
      }
      res.json({ message: 'Contato atualizado com sucesso' });
    }
  );
});

// Rota DELETE para remover um contato
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM contatos WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao deletar contato', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    }
    res.json({ message: 'Contato deletado com sucesso' });
  });
});

module.exports = router;

// backend/routes/contatos.js

// Cadastro de contato (POST)
router.post('/', (req, res) => {
    const { nome, email, telefone } = req.body;
    const query = 'INSERT INTO contatos (nome, email, telefone) VALUES (?, ?, ?)';
    db.query(query, [nome, email, telefone], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao cadastrar contato');
        }
        res.status(201).json({ id: results.insertId, nome, email, telefone });
    });
});

// Listar todos os contatos (GET)
router.get('/', (req, res) => {
    const query = 'SELECT * FROM contatos ORDER BY nome ASC';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao listar contatos');
        }
        res.json(results);
    });
});

// Buscar contatos por nome ou email (GET)
router.get('/search', (req, res) => {
    const search = req.query.q || '';  // O parâmetro de busca é 'q'
    const query = 'SELECT * FROM contatos WHERE nome LIKE ? OR email LIKE ? ORDER BY nome ASC';
    db.query(query, [`%${search}%`, `%${search}%`], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar contatos');
        }
        res.json(results);
    });
});

// Editar contato (PUT)
router.put('/:id', (req, res) => {
    const { nome, email, telefone } = req.body;
    const { id } = req.params;
    const query = 'UPDATE contatos SET nome = ?, email = ?, telefone = ? WHERE id = ?';
    db.query(query, [nome, email, telefone, id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao editar contato');
        }
        res.status(200).json({ id, nome, email, telefone });
    });
});

// Excluir contato (DELETE)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM contatos WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao excluir contato');
        }
        res.status(200).send('Contato excluído');
    });
});
