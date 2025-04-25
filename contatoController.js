const db = require('../db');

exports.getAllContatos = (req, res) => {
    db.query('SELECT * FROM contatos ORDER BY nome ASC', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getContatoById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM contatos WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
};

exports.createContato = (req, res) => {
    const { nome, email, telefone } = req.body;
    if (!nome || !email || !telefone) {
        return res.status(400).json({ error: 'Preencha todos os campos!' });
    }

    db.query(
        'INSERT INTO contatos (nome, email, telefone) VALUES (?, ?, ?)',
        [nome, email, telefone],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ id: result.insertId, nome, email, telefone });
        }
    );
};

exports.updateContato = (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;

    db.query(
        'UPDATE contatos SET nome = ?, email = ?, telefone = ? WHERE id = ?',
        [nome, email, telefone, id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ id, nome, email, telefone });
        }
    );
};

exports.deleteContato = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM contatos WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Contato excluído com sucesso!' });
    });
};
