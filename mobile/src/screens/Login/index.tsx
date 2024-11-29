import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../routes/routes";
import { useState } from "react";
import { colors } from "../../styles/colors";
import Input from "../../componentes/Input";
import api from '../../services/api';
import { Usuario } from "../../models/usuario";
import { useUser } from "../../context/UserContext";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Login() {
    const navigation = useNavigation<Props['navigation']>();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { login } = useUser();

    const handleLogin = () => {
        try {
            if (!email) {
                alert("Informe o e-mail")
                return;
            }

            if (!senha) {
                alert("Informe a senha")
                return;
            }

            const usuarioLogado = { email: email, senha: senha }

            api.post<Usuario>('/login', usuarioLogado)
                .then((response) => {
                    login(response.data);
                    //navigation.navigate("Vagas");
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        alert("Login ou senha inválidos");
                        return;
                    }
                    console.log(error)
                })
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Input label="E-mail" placeholder="digite seu e-mail" senha={false} value={email} onChangeText={setEmail} />
                <Input label="Senha" placeholder="digite sua senha" senha={true} value={senha} onChangeText={setSenha} />
                <TouchableOpacity style={styles.botao} onPress={handleLogin}>
                    <Text style={{ color: colors.white }}>Entrar</Text>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <TouchableOpacity style={{width: "auto"}} onPress={() => navigation.navigate("Registro")}>
                        <Text style={styles.textLink}>Registrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        //width: "100%",
        padding: 16,
        //gap: 16,
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
    textContainer: {
        flexDirection: "row",
        gap: 8        
    },
    textBlack: {
        fontWeight: 700,        
        color: colors.gray[800]
    },
    textBlock: {
        fontWeight: 700,
        textAlign: "center",
        color: colors.gray[800]
    },
    textLink: {
        fontSize: 23,
        textAlign: "center",
        fontWeight: 700,
        color: colors.gray[400]
    }
});