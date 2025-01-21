import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext";


export default function useAuth(){
    const context = useContext(AuthContext);
    
    if(!context)
        throw new Error('useAuth deve ser usado dentrod de um AuthProvider');
    
    return context;
}