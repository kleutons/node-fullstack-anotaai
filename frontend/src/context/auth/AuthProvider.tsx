import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axiosInstance from "../../utils/AxiosInstance";
import { AxiosResponse } from "axios";
import { LoginInputType, UserReturnType } from "../../types/UserType";
import ApiResponse from "../../utils/ApiResponse";

interface AuthProviderProps{
    children: ReactNode
}

interface LocalDataUser{
    token: string,
    user: UserReturnType
}

export function AuthProvider( {children}:AuthProviderProps ){
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const [user, setUser] = useState<UserReturnType | null>(userString ? JSON.parse(userString) : null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(token && userString ? true : false);
    const [isLoading, setIsLoading] = useState<boolean>(false);    

    useEffect(() => {
        const handleStorageChange = () => {
            const storedUser = localStorage.getItem('user');
            setUser(storedUser ? JSON.parse(storedUser) : null);
        };

        // Adiciona listener para evento de alteração no storage
        window.addEventListener('localStorageUpdate', handleStorageChange);

        // Atualiza user no início, caso haja alguma mudança externa
        handleStorageChange();

        return () => {
            window.removeEventListener('localStorageUpdate', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        setIsAuthenticated(token && user ? true : false);
    }, [user, token]);

    const saveLocalStorage = (data: LocalDataUser) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('loginTime', new Date().toISOString());
    }

    const removeLocalStorage = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('loginTime');
    };


    const login = async (inputData:LoginInputType) => {
        setIsLoading(true);
        try{
            const response: AxiosResponse<LocalDataUser> = await axiosInstance.post('/login', inputData);

            ApiResponse.success("Login Efetuado com Sucesso!");
            setIsAuthenticated(true);
            saveLocalStorage(response.data);
            window.dispatchEvent(new Event('localStorageUpdate'));
        }catch(err){
            ApiResponse.error(err);
        }finally{
            setIsLoading(false);
        }

    }
    
    const logout = () => { 
        setIsAuthenticated(false);
        removeLocalStorage();
    }
    
    const getLoginDuration = () => {
        const loginTimeString = localStorage.getItem('loginTime');
        if(!loginTimeString) return null;
    
        const loginTimeDate = new Date(loginTimeString);
        const now = new Date();
    
        const diffMs = now.getTime() - loginTimeDate.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        
        if (diffHours > 0) {
            return `há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
        }
        if (diffMins === 0) {
            return "agora";
        }
        return `há ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
    }
    

    return(
        <AuthContext.Provider 
            value={{
                isAuthenticated,
                user,
                token,
                login,
                logout,
                isLoading,
                getLoginDuration
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}