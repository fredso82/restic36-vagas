import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../routes/routes";
import { useState } from "react";
import { colors } from "../../styles/colors";
import Input from "../../componentes/Input";
import api from '../../services/api';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function VagaAdd() {
    const navigation = useNavigation<Props['navigation']>();    
    const [titulo, setTitulo] = useState('');
    const [vldTitulo, setVldTitulo] = useState('');

    const [descricao, setDescricao] = useState('');
    const [vldDescricao, setVldDescricao] = useState('');

    const [telefone, setTelefone] = useState('');
    const [vldTelefone, setVldTelefone] = useState('');

    const [empresa, setEmpresa] = useState('');
    const [vldEmpresa, setVldEmpresa] = useState('');

    const handleCadastrar = () => {
        let valido = true;
        try {
            setVldTitulo("");
            setVldDescricao("");
            setVldTelefone("");
            setVldEmpresa("");

            if (!titulo) {
                setVldTitulo("Informe o título");
                valido = false;
            }

            if (!descricao) {
                setVldDescricao("Informe a descrição");
                valido = false;
            }

            if (!telefone) {
                setVldTelefone("Informe o telefone");
                valido = false;
            }

            if (!empresa) {
                setVldEmpresa("Informe a empresa");
                valido = false;
            }

            if (!valido) {
                return;
            }

            const vaga = {titulo: titulo, descricao: descricao, telefone: telefone, empresa: empresa};
            api.post('/vagas', vaga)
                .then(response => {
                    alert("Vaga cadastrada com sucesso!");
                    navigation.goBack();
                })
                .catch((error) => {
                    alert(error);
                });                    
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.form}>
                <Input label="Título" placeholder="informe o título" senha={false} value={titulo} onChangeText={setTitulo} />
                {vldTitulo && (<Text style={styles.labelValidacao}>{vldTitulo}</Text>)}

                <Input label="Descrição" placeholder="informe a descrição" senha={false} value={descricao} onChangeText={setDescricao} />
                {vldDescricao && (<Text style={styles.labelValidacao}>{vldDescricao}</Text>)}

                <Input label="Telefone" placeholder="informe o telefone" senha={false} value={telefone} onChangeText={setTelefone} />
                {vldTelefone && (<Text style={styles.labelValidacao}>{vldTelefone}</Text>)}

                <Input label="Empresa" placeholder="informe a empresa" senha={false} value={empresa} onChangeText={setEmpresa} />
                {vldEmpresa && (<Text style={styles.labelValidacao}>{vldEmpresa}</Text>)}

                <TouchableOpacity style={styles.botao} onPress={handleCadastrar}>
                    <Text style={{ color: colors.white }}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",                
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
        margin: 0,
        marginTop: -12
    }
});