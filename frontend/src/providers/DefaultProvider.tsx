import { ReactNode } from "react";
import { AuthProvider } from "../context/auth/AuthProvider";

interface DefaultProviderProps{
    children:ReactNode
}

export default function DefaultProvider({children}:DefaultProviderProps){
    return(
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}