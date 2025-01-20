import { createContext } from "react";
import UserType from "../../types/UserType";

export interface AuthContextType{
    isAuthenticated: boolean;
    user?: UserType;
    token?: string;
    login: (username: string, password: string) => void; 
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);