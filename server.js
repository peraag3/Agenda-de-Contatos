// backend/routes/contatos.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Certifique-se de que o caminho está correto

// Listar todos os contatos em ordem alfabética
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contatos ORDER BY nome ASC');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar contatos:', error);
        res.status(500).json({ error: 'Erro ao buscar contatos' });
    }
});

// Cadastrar um novo contato
router.post('/', async (req, res) => {
    const { nome, email, telefone } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO contatos (nome, email, telefone) VALUES (?, ?, ?)',
            [nome, email, telefone]
        );
        res.status(201).json({ id: result.insertId, nome, email, telefone });
    } catch (error) {
        console.error('Erro ao cadastrar contato:', error);
        res.status(500).json({ error: 'Erro ao cadastrar contato' });
    }
});

// Buscar contatos por nome ou email
router.get('/search', async (req, res) => {
    const { termo } = req.query;
    try {
        const [rows] = await pool.query(
            'SELECT * FROM contatos WHERE nome LIKE ? OR email LIKE ? ORDER BY nome ASC',
            [`%${termo}%`, `%${termo}%`]
        );
        res.json(rows);
    } catch (error) {
        console.error('Erro na busca:', error);
        res.status(500).json({ error: 'Erro na busca de contatos' });
    }
});

// Editar contato
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;
    try {
        await pool.query(
            'UPDATE contatos SET nome = ?, email = ?, telefone = ? WHERE id = ?',
            [nome, email, telefone, id]
        );
        res.json({ id, nome, email, telefone });
    } catch (error) {
        console.error('Erro ao editar contato:', error);
        res.status(500).json({ error: 'Erro ao editar contato' });
    }
});

// Excluir contato
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM contatos WHERE id = ?', [id]);
        res.json({ message: 'Contato excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir contato:', error);
        res.status(500).json({ error: 'Erro ao excluir contato' });
    }
});

module.exports = router;
