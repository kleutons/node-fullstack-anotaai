import { createContext } from "react";
import UserType from "../../types/UserType";

export interface AuthContextType{
    isAuthenticated: boolean;
    user: UserType;
    token: string;
    login: (email: string, password: string) => void; 
    logout: () => void;
    loading: boolean;
    error: string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);