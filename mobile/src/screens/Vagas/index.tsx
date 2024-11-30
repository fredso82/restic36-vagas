import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Vaga } from '../../models/vaga';
import api from '../../services/api';
import { VagaCard } from '../../componentes/VagaCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/routes';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Vagas() {
    const navigation = useNavigation<Props['navigation']>();
    const [vagas, setVagas] = useState<Vaga[]>([]);

    const fetchVagas = async () => {
        try {
            const response = await api.get('/vagas');
            setVagas(response.data.vagas);
        } catch (error) {
            console.log(error);
        }
    } 

    useEffect(() => {
        fetchVagas();
    }, []);

    useFocusEffect(React.useCallback(() => {
        fetchVagas();
    }, []));

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>{vagas.length} vagas encontradas!</Text>
            <View style={styles.containerTasks}>
                <FlatList
                    scrollEnabled={true}
                    data={vagas}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => <VagaCard vaga={item} />
                    }
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("VagaAdd") } style={styles.addVaga}>
                <Feather name='plus' size={40} color='white'></Feather>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#FAFAFA",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 60,
        paddingHorizontal: 5,
    },
    titulo: {
        fontSize: 20,
        fontWeight: "bold"
    },
    containerTasks: {
        flex: 1,
        marginTop: 15,
        width: "100%"
    },
    addVaga: {
        backgroundColor: colors.orange,
        height: 60,
        width: 60,
        borderRadius: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: "5%",
        right: "5%",
        shadowOffset: { width: 3, height: 4 },
        elevation: 5
    }
});