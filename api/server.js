const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const usuariosRoutes = require('./routes/usuarios');
const vagasRoutes = require('./routes/vagas');
const usuarioRepository = require('./repositories/usuariosRepository');

const app = express();
app.use(bodyParser.json());

// Sincronizar o banco de dados
sequelize.sync().then(() => {
    console.log('Database synchronized');
}).catch(err => {
    console.error('Unable to synchronize the database:', err);
});

// Usar as rotas importadas
app.use('/usuarios', usuariosRoutes);
app.use('/vagas', vagasRoutes);

app.post('/login', async (req, res) => {
    const body = req.body;
    const usuario = await usuarioRepository.login(body.email, body.senha);
    if (!usuario) {
        return res.status(401).send("Login ou senha inválidos");
    }
    return res.json(usuario);
});

app.post('/registro', async (req, res) => {
    const body = req.body;
    const usuarioExistente = await usuarioRepository.findByEmail(body.email);
    if (usuarioExistente) {
        return res.status(400).send("Já existe um usuário com este e-mail");
    }
    const usuario = await usuarioRepository.create(body);
    res.status(201).json(usuario);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
