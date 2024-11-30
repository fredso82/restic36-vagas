import { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Input from '../../componentes/Input';
import { useAppContext } from '../../context/AppContext';
import { Usuario } from '../../models/usuario';
import api from '../../services/api';
import { colors } from '../../styles/colors';


export default function Perfil() {
    const { user, logout } = useAppContext();
    const [nome, setNome] = useState(user.nome);
    const [vldNome, setVldNome] = useState('');
    const [email, setEmail] = useState(user.email);
    const [vldEmail, setVldEmail] = useState('');    
    const [senha, setSenha] = useState('');
    const [vldSenha, setVldSenha] = useState('');
    const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
    const [vldConfirmacao, setConfirmacao] = useState('');

    const handleRegistrar = () => {
        let valido = true;
        try {
            setVldNome("");
            setVldEmail("");
            setVldSenha("");
            setConfirmacao("");

            if (!nome) {
                setVldNome("Informe o nome");
                valido = false;
            }

            if (!email) {
                setVldEmail("Informe o email");
                valido = false;
            }                        

            if (!valido) {
                return;
            }

            if (senha !== confirmacaoSenha) {
                setConfirmacao("As senhas não conferem");
                return;
            }

            const alterar = {nome: nome, email: email, senha: senha};
            api.put<Usuario>(`/usuarios/${user.id}`, alterar)
                .then(response => {
                    alert("Dados alterados com sucesso!");
                })
                .catch((error) => {
                    alert(error.response.data);
                });                    
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.form}>
                <Input label="Nome" placeholder="digite seu nome" senha={false} value={nome} onChangeText={setNome} />
                {vldNome && (<Text style={styles.labelValidacao}>{vldNome}</Text>)}
                <Input label="E-mail" placeholder="digite seu e-mail" senha={false} value={email} onChangeText={setEmail} />
                {vldEmail && (<Text style={styles.labelValidacao}>{vldEmail}</Text>)}
                <Input label="Senha" placeholder="digite sua senha" senha={true} value={senha} onChangeText={setSenha} />
                {vldSenha && (<Text style={styles.labelValidacao}>{vldSenha}</Text>)}
                <Input label="Confirmação" placeholder="repita sua senha" senha={true} value={confirmacaoSenha} onChangeText={setConfirmacaoSenha} />
                {vldConfirmacao && (<Text style={styles.labelValidacao}>{vldConfirmacao}</Text>)}
                <TouchableOpacity style={styles.botao} onPress={handleRegistrar}>
                    <Text style={{ color: colors.white }}>Alterar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoSair} onPress={logout}>
                    <Text style={{ color: colors.white }}>Sair</Text>
                </TouchableOpacity>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",        
        paddingTop: 60,
        padding: 16,
        backgroundColor: colors.white
    },
    form: {
        flex: 1,
        gap: 16,
        width: "100%",
        alignItems: "center"
    },
    botao: {
        backgroundColor: colors.orange,
        paddingVertical: 13,
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        textAlign: "center",
        alignContent: "center",
        borderRadius: 20
    },
    botaoSair: {
        backgroundColor: colors.red,
        paddingVertical: 13,
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        textAlign: "center",
        alignContent: "center",
        borderRadius: 20
    },
    labelValidacao: {
        fontSize: 14,
        alignSelf: "flex-start",
        color: colors.red,
        margin: 0
    }
});