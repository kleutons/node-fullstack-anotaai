import { createContext } from "react";
import UserType from "../../types/UserType";

export interface AuthContextType{
    isAuthenticated: boolean;
    user: UserType | null;
    token: string | null;
    login: (email: string, password: string) => void; 
    logout: () => void;
    loading: boolean;
    error: string | null;
    getLoginDuration: () => string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);