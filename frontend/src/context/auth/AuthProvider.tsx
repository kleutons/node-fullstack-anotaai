import { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";
import UserType from "../../types/UserType";

interface AuthProviderProps{
    children: ReactNode
}

export function AuthProvider( {children}:AuthProviderProps ){
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser]   = useState<UserType>();
    const [token, setToken] = useState<string>();

    const login = (username: string, password: string) => {
        const fakeToken = '1234567890abcdef'; 
        const fakeUser:UserType = { id: '1', name: username, email: 'usuario@exemplo.com', store: '' }; 
        if(password){
            setIsAuthenticated(true); 
            setUser(fakeUser); 
            setToken(fakeToken);
        }
    }

    const logout = () => { 
        setIsAuthenticated(false); 
        setUser(undefined); 
        setToken(undefined);
    }

    return(
        <AuthContext.Provider 
            value={{
                isAuthenticated,
                user,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}