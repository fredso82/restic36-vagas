const express = require('express');
const router = express.Router();
const vagaRepository = require('../repositories/vagasRepository');

router.get('/', async (req, res) => {
    try {
        const vagas = await vagaRepository.findAll();
        res.json({ vagas });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const vaga = await vagaRepository.findById(req.params.id);
        if (vaga) {
            res.json({ vaga });
        } else {
            res.status(404).json({ error: 'Vaga não encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const vaga = await vagaRepository.create(req.body);
        res.status(201).json({ vaga });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const vaga = await vagaRepository.update(req.params.id, req.body);
        if (vaga) {
            res.json({ vaga });
        } else {
            res.status(404).json({ error: 'Vaga não encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const vaga = await vagaRepository.remove(req.params.id);
        if (vaga) {
            res.json({ vaga });
        } else {
            res.status(404).json({ error: 'Vaga não encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
