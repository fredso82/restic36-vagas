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
    console.log(email);
    const index = usuarios.findIndex(u => u.email === email && u.senha === senha);
    if (index === -1) {
        return null;
    }

    const usuario = usuarios[index];
    
    return {id: usuario.id, nome: usuario.nome, email: usuario.email};
}

module.exports = {
    create,
    login
}