const express = require('express');
const router = express.Router();
const usuarioRepository = require('../repositories/usuariosRepository.js');

router.get('/', async (req, res) => {
    const usuarios = await usuarioRepository.findAll();
    res.json({ usuarios });
});

router.get('/:id', async (req, res) => {
    const user = await usuarioRepository.findById(req.params.id);
    if (user) {
        res.json({ user });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

router.post('/', async (req, res) => {
    const user = await usuarioRepository.create(req.body);
    res.json({ user });
});

router.put('/:id', async (req, res) => {
    const user = await usuarioRepository.update(req.params.id, req.body);
    if (user) {
        res.json({ user });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const user = await  usuarioRepository.remove(req.params.id);
    if (user) {
        res.json({ user });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

module.exports = router;
