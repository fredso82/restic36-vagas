import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../routes/routes";
import { useState } from "react";
import { colors } from "../../styles/colors";
import Input from "../../componentes/Input";
import api from '../../services/api';
import { Usuario } from "../../models/usuario";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Registro() {
    const navigation = useNavigation<Props['navigation']>();
    const [nome, setNome] = useState('');
    const [vldNome, setVldNome] = useState('');
    const [email, setEmail] = useState('');
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
            
            if (!senha) {
                setVldSenha("Informe a senha");
                valido = false;
            }

            if (!confirmacaoSenha) {
                setConfirmacao("Informe a confirmação");
                valido = false;
            }

            if (!valido) {
                return;
            }

            if (senha !== confirmacaoSenha) {
                setConfirmacao("As senhas não conferem");
                return;
            }
            const registro = {nome: nome, email: email, senha: senha};
            api.post<Usuario>('/registro', registro)
                .then(response => {
                    const usuario = response.data;
                    navigation.navigate("Vagas");    
                })
                .catch((error) => {
                    alert(error.response.data);
                });                    
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
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
                    <Text style={{ color: colors.white }}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
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
    labelValidacao: {
        fontSize: 14,
        alignSelf: "flex-start",
        color: colors.red,
        margin: 0
    }
});