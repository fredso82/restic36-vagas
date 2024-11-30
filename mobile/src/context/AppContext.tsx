import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Usuario } from "../models/usuario";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vaga } from "../models/vaga";

interface AppContextProps {
    children: ReactNode;
}

type AppContextType = {
    user: Usuario;
    vaga: Vaga;
    setVaga: (vaga: Vaga) => void;
    login: (userData: Usuario) => void;
    logout: () => void;
}

const AppContext = createContext<AppContextType>({
    user: {} as Usuario,
    vaga: {} as Vaga,
    setVaga: () => {},
    login: () => {},
    logout: () => {}
});

export const AppProvider = ({children}: AppContextProps) => {
    const [user, setUser] = useState<Usuario>({} as Usuario);
    const [vaga, setVaga] = useState<Vaga>({} as Vaga);

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
        <AppContext.Provider value={{user, vaga, setVaga, login, logout}}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
