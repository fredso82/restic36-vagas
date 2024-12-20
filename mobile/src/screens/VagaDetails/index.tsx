import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Input from '../../componentes/Input';
import { useAppContext } from '../../context/AppContext';
import { RootStackParamList } from '../../routes/routes';
import api from '../../services/api';
import { colors } from '../../styles/colors';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function VagaDetails() {
    const { vaga } = useAppContext();
    const navigation = useNavigation<Props['navigation']>();

    const [titulo, setTitulo] = useState(vaga.titulo);
    const [vldTitulo, setVldTitulo] = useState('');

    const [descricao, setDescricao] = useState(vaga.descricao);
    const [vldDescricao, setVldDescricao] = useState('');

    const [telefone, setTelefone] = useState(vaga.telefone);
    const [vldTelefone, setVldTelefone] = useState('');

    const [empresa, setEmpresa] = useState(vaga.empresa);
    const [vldEmpresa, setVldEmpresa] = useState('');

    const [status, setStatus] = useState(vaga.status);

    const handleCadastrar = () => {
        try {
            let valido = true;
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

            const vagaAlterar = {
                titulo: titulo,
                descricao: descricao,
                telefone: telefone,
                empresa: empresa,
                status: status
            };
            api.put(`/vagas/${vaga.id}`, vagaAlterar)
                .then(response => {
                    alert("Vaga alterada com sucesso!");
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

                <Text style={styles.label}>Status</Text>
                <View style={styles.viewPicker}>
                    <Picker
                        mode='dialog'
                        style={styles.picker}
                        selectedValue={status}
                        onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}>
                        <Picker.Item label="Disponível" value="Disponível" />
                        <Picker.Item label="Encerrada" value="Encerrada" />
                    </Picker>
                </View>

                <TouchableOpacity style={styles.botao} onPress={handleCadastrar}>
                    <Text style={{ color: colors.white }}>Gravar</Text>
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
    },
    viewPicker: {
        width: "100%",
        borderColor: colors.gray[800],
        borderWidth: 1,
        borderRadius: 20,
        marginTop: -13
    },
    picker: {
        height: 53
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        lineHeight: 16,
        textAlign: "left",
        alignSelf: "flex-start",
        margin: 0,
        color: colors.blue
    }
});