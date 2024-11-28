const express = require('express');
const { create, update, remove, findAll } = require('./repositories/vagasRepository');
const usuarioRepository = require('./repositories/usuariosRepository');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/vagas', (req, res) => {
    const { descricao, titulo, dataCadastro, telefone, empresa } = req.body;
    const vaga = create({ descricao, titulo, dataCadastro, telefone, empresa });
    res.status(201).json(vaga);
});

app.get('/vagas', (req, res) => {
    const vagas = findAll();
    res.json(vagas);
});

app.put('/vagas/:id', (req, res) => {
    const { id } = req.params;
    const { descricao, titulo, dataCadastro, telefone, empresa } = req.body;
    const vaga = update(id, { descricao, titulo, dataCadastro, telefone, empresa });
    res.json(vaga);
});

app.delete('/vagas/:id', (req, res) => {
    const { id } = req.params;
    remove(id);
    res.status(204).send();
});

app.post('/login', (req, res) => {
    const body = req.body;
    const usuario = usuarioRepository.login(body);
    if (!usuario) {
        return res.status(401).send("Login ou senha inválidos");
    }
    return res.json(usuario);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});