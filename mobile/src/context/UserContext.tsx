import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Usuario } from "../models/usuario";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserContextProps {
    children: ReactNode;
}

type UserContextType = {
    user: Usuario;
    login: (userData: Usuario) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType>({
    user: {} as Usuario,
    login: () => {},
    logout: () => {}
});

export const UserProvider = ({children}: UserContextProps) => {
    const [user, setUser] = useState<Usuario>({} as Usuario);

    useEffect(() => {
        const loadUser = async () => {
            const usuarioLogado = await AsyncStorage.getItem("@user");
            if (usuarioLogado) {
                setUser(JSON.parse(usuarioLogado));
            }
        }
        loadUser();
    }, []);

    const login = async (userData: Usuario) => {
        setUser(userData);
        await AsyncStorage.setItem("@user", JSON.stringify(userData));
    };

    const logout = async () => {
        setUser({} as Usuario);
        await AsyncStorage.removeItem("@user");
    };

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
