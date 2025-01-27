import { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";
import UserType from "../../types/UserType";
import axiosInstance from "../../utils/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "../../types/ErrorResponse";

interface AuthProviderProps{
    children: ReactNode
}

interface LocalDataUser{
    token: string,
    user: UserType
}

export function AuthProvider( {children}:AuthProviderProps ){
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user: UserType | null = userString ? JSON.parse(userString) : null;
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(token && user ? true : false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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


    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try{
            const response: AxiosResponse<LocalDataUser> = await axiosInstance.post('/login', {
                    email,
                    password
                });

            setIsAuthenticated(true);
            saveLocalStorage(response.data);
        }catch(err){
            const axiosError = err as AxiosError<ErrorResponse>;
            const returnErro = axiosError.response ? `Error: ${axiosError.response.data?.error}` : `Error fetching data: ${err}`;
            setError(returnErro);
        }finally{
            setLoading(false);
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
                loading,
                error,
                getLoginDuration
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}