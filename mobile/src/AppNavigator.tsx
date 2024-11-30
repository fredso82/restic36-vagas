import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useUser } from "./context/UserContext";
import Login from './screens/Login';
import Registro from './screens/Registro';
import Vagas from './screens/Vagas';
import { TouchableOpacity } from 'react-native';
import React from 'react';
import Perfil from './screens/Perfil';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    const { user, logout } = useUser();

    const AuthStack = () => (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{ title: "Login", headerTitleAlign: "center" }} />
            <Stack.Screen name='Registro' component={Registro} options={{ title: "Registrar", headerTitleAlign: "center" }} />
        </Stack.Navigator>
    );

    const AppStack = () => (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name='Vagas' component={Vagas} options={{
                tabBarIcon: ({color, size}) => <Feather name="home" color={color} size={size} />
            }} />
            <Tab.Screen name='Perfil' component={Perfil} options={{
                tabBarIcon: ({color, size}) => <Feather name="user" color={color} size={size} />
            }} />
        </Tab.Navigator>
        // <Stack.Navigator>
        //     <Stack.Screen name='Vagas' component={Vagas} options={
        //         {
        //             title: "Vagas",
        //             headerTitleAlign: "center",
        //             headerRight: () => (
        //                 <TouchableOpacity onPress={ logout }>
        //                     <Feather name='log-out' size={25}></Feather>
        //                 </TouchableOpacity>
        //             )
        //         }} />
        // </Stack.Navigator>
    );

    return (
        <NavigationContainer>
            {user.email ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}