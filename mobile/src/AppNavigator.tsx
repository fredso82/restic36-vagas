import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppContext } from "./context/AppContext";
import Login from './screens/Login';
import Registro from './screens/Registro';
import Vagas from './screens/Vagas';
import React from 'react';
import Perfil from './screens/Perfil';
import VagaAdd from './screens/VagaAdd';
import VagaDetails from './screens/VagaDetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    const { user } = useAppContext();

    const AuthStack = () => (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{ title: "Entrar", headerTitleAlign: "center" }} />
            <Stack.Screen name='Registro' component={Registro} options={{ title: "Crie sua Conta", headerTitleAlign: "center" }} />
        </Stack.Navigator>
    );

    const TabNavigator = () => (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name='Vagas' component={Vagas} options={{
                tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />
            }} />
            <Tab.Screen name='Perfil' component={Perfil} options={{
                tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />
            }} />
        </Tab.Navigator>
    );

    const AppStack = () => (
        <Stack.Navigator>
            <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="VagaAdd" component={VagaAdd} options={{
                title: "Cadastro de Vaga"
            }} />
            <Stack.Screen name="VagaDetails" component={VagaDetails} options={{
                title: "Detalhes de Vaga"
            }} />
        </Stack.Navigator>
    )

    return (
        <NavigationContainer>
            {user.email ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}