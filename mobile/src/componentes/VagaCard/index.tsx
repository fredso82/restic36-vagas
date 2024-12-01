import { Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Vaga } from '../../models/vaga';
import { colors } from '../../styles/colors';
import { useAppContext } from '../../context/AppContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/routes';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList>;

export interface VagaProps {
    vaga: Vaga
}

export function VagaCard({ vaga }: VagaProps) {
    const { setVaga } = useAppContext();
    const navigation = useNavigation<Props['navigation']>();

    function handleContato() {
        const mensagem = `Olá, gostaria de entrar em contato para falar a respeito da vaga ${vaga.titulo}.`;
        Linking.openURL(`whatsapp://send?text=${mensagem}&phone=${vaga.telefone}`)
            .catch(e => alert("WhatsApp não instalado!"));
    }
    
    return (
        <TouchableOpacity onPress={() => {
            setVaga(vaga);
            navigation.navigate("VagaDetails");
        }}
            style={styles.container}>
            <Text style={styles.titulo}>{vaga.titulo}</Text>
            <Text style={styles.descricao}>{vaga.descricao}</Text>
            <Text style={styles.data}>{new Date(vaga.dataCadastro).toLocaleDateString()}</Text>
            <Text style={{ color: vaga.status == "Disponível" ? colors.blue : colors.red }}>{vaga.status}</Text>
            {vaga.status == "Disponível" && (
                <TouchableOpacity onPress={handleContato} style={styles.containerContato}>
                    <Feather name='message-circle' size={25} color='white' style={styles.iconContato}></Feather>
                    <Text style={styles.textContato}>Entrar em contato</Text>
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: colors.gray[800],
        borderWidth: 1,
        borderRadius: 20,
        gap: 10,
        marginBottom: 8,
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
    },
    descricao: {
        fontSize: 18,
        textAlign: "left",
    },
    data: {
        fontSize: 16,
        fontWeight: "normal",
        lineHeight: 16,
        textAlign: "left",
        color: colors.gray[800]
    },
    containerContato: {
        backgroundColor: colors.gray[300],
        padding: 5,
        //height: 40,
        //width: 30,
        borderRadius: 13,
        display: "flex",
        flexDirection: "row",
        //alignItems: "center",
        justifyContent: "center",
    },
    iconContato: {
        width: 40
    },
    textContato: {
        width: 150,
        padding: 0,
        margin: 0,
        alignSelf: "center",
        color: colors.white
    }
});