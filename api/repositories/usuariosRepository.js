const { v4: uuidv4 } = require('uuid');

let usuarios = [{
    id: uuidv4(),
    nome: "admin",
    email: "admin@email.com",
    senha: "admin"
}];

function create({ nome, email, senha }) {    
    const usuario = {
        id: uuidv4(),
        nome,
        email,
        senha
    };
    usuarios.push(usuario);
    return usuario;
}

function login({email, senha}) {
    const index = usuarios.findIndex(u => u.email === email && u.senha === senha);
    if (index === -1) {
        return null;
    }

    const usuario = usuarios[index];
    
    return {id: usuario.id, nome: usuario.nome, email: usuario.email};
}

function findAll() {
    return usuarios;
}

function findByEmail(email){
    const index = usuarios.findIndex(u => u.email.trimEnd() === email.trimEnd());
    if (index === -1) {
        return null;
    }

    return usuarios[index];
}

module.exports = {
    create,
    login,
    findAll,
    findByEmail
}