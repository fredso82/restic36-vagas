import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Vaga } from '../../models/vaga';
import { colors } from '../../styles/colors';


export interface VagaProps {
    vaga: Vaga
}

export function VagaCard({ vaga }: VagaProps) {
    return (
        <TouchableOpacity onPress={() => console.log(vaga.titulo)} style={styles.container}>
            <Text style={styles.titulo}>{vaga.titulo}</Text>
            <Text style={styles.data}>{vaga.dataCadastro}</Text>

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
    data: {
        fontSize: 16,
        fontWeight: "normal",
        lineHeight: 16,
        textAlign: "left",
        color: colors.gray[800]
    }
});