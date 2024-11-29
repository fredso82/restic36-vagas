import { createContext, ReactNode, useContext, useState } from "react";
import { Usuario } from "../models/usuario";

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

    function login(userData: Usuario){
        setUser(userData);
    };

    function logout(){
        setUser({} as Usuario);
    };

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
