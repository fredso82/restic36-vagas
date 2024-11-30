import { Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

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
    }
});