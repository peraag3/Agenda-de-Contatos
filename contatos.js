// backend/routes/contatos.js
const express = require('express');
const router = express.Router();
const contatoController = require('../controllers/contatoController');

router.get('/', contatoController.getAllContatos);
router.get('/:id', contatoController.getContatoById);
router.post('/', contatoController.createContato);
router.put('/:id', contatoController.updateContato);
router.delete('/:id', contatoController.deleteContato);

module.exports = router;
