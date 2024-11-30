import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../routes/routes";
import { useState } from "react";
import { colors } from "../../styles/colors";
import Input from "../../componentes/Input";
import api from '../../services/api';
import { useAppContext } from "../../context/AppContext";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function VagaDetails() {
    const { vaga } = useAppContext();
    const navigation = useNavigation<Props['navigation']>();    
    const [titulo, setTitulo] = useState(vaga.titulo);
    const [descricao, setDescricao] = useState(vaga.descricao);
    const [telefone, setTelefone] = useState(vaga.telefone);
    const [empresa, setEmpresa] = useState(vaga.empresa);

    const handleCadastrar = () => {
        try {

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
        <View style={styles.container}>
            <View style={styles.form}>
                <Input label="Título" placeholder="informe o título" senha={false} value={titulo} onChangeText={setTitulo} />
                <Input label="Descrição" placeholder="informe a descrição" senha={false} value={descricao} onChangeText={setDescricao} />
                <Input label="Telefone" placeholder="informe o telefone" senha={false} value={telefone} onChangeText={setTelefone} />
                <Input label="Empresa" placeholder="informe a empresa" senha={false} value={empresa} onChangeText={setEmpresa} />
                <TouchableOpacity style={styles.botao} onPress={handleCadastrar}>
                    <Text style={{ color: colors.white }}>Gravar</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        margin: 0
    }
});