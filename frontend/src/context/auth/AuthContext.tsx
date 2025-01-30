import { createContext } from "react";
import { LoginInputType, UserReturnType } from "../../types/UserType";

export interface AuthContextType{
    isAuthenticated: boolean;
    user: UserReturnType | null;
    token: string | null;
    login: (inputData:LoginInputType) => void; 
    logout: () => void;
    isLoading: boolean;    
    getLoginDuration: () => string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);