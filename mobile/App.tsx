import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from './src/services/api';
import { Vaga } from './src/models/vaga';
import { VagaCard } from './src/componentes/VagaCard';
import { colors } from './src/styles/colors';
import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Vagas from './src/screens/Vagas';
import Registro from './src/screens/Registro';
import { UserProvider } from './src/context/UserContext';
import AppNavigator from './src/AppNavigator';

export default function App() {
    return (
        <UserProvider>
            <AppNavigator />
        </UserProvider>
    );
    //const Stack = createNativeStackNavigator();
    
    // const [vagas, setVagas] = useState<Vaga[]>([]);

    // useEffect(() => {
    //     const fetchVagas = async () => {
    //         try {
    //             const response = await api.get<Vaga[]>('/vagas');
    //             setVagas(response.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     fetchVagas();
    // }, []);

    // return (
    //     <SafeAreaView style={styles.container}>
    //         <Text style={styles.titulo}>{vagas.length} vagas encontradas!</Text>
    //         <View style={styles.containerTasks}>
    //             <FlatList
    //                 scrollEnabled={true}
    //                 data={vagas}
    //                 keyExtractor={(item, index) => item.id}
    //                 renderItem={({ item }) => <VagaCard vaga={item} />
    //                 }
    //             />
    //         </View>
    //         <TouchableOpacity onPress={() => alert("nova vaga")} style={styles.addVaga}>
    //             <Feather name='plus' size={40} color='white'></Feather>
    //         </TouchableOpacity>
    //     </SafeAreaView>
    // );

    // return (
    //     <NavigationContainer>
    //         <Stack.Navigator initialRouteName='Login'>
    //             <Stack.Screen name='Login' component={Login} options={{title: "Login", headerTitleAlign: "center"}} />
    //             <Stack.Screen name='Registro' component={Registro} options={{title: "Registrar", headerTitleAlign: "center"}} />
    //             <Stack.Screen name='Vagas' component={Vagas} options={{title: "Vagas", headerTitleAlign: "center"}} />
    //         </Stack.Navigator>
    //     </NavigationContainer>
    // )
}

// const styles = StyleSheet.create({
//     titulo: {
//         fontSize: 20,
//         fontWeight: "bold"
//     },
//     container: {
//         flex: 1,
//         flexDirection: "column",
//         backgroundColor: "#FAFAFA",
//         alignItems: "center",
//         justifyContent: "flex-start",
//         paddingTop: 60,        
//         paddingHorizontal: 5,        
//     },
//     containerTasks: {
//         flex: 1,
//         marginTop: 15,                
//         width: "100%",
//         maxHeight: "50%",
//     },
//     addVaga: {
//         backgroundColor: colors.orange,
//         height: 60,
//         width: 60,
//         borderRadius: 50,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         position: "absolute",
//         bottom: "5%",
//         right: "5%",
//         shadowOffset: {width: 3, height: 4},        
//         elevation: 5
//     }
// });
