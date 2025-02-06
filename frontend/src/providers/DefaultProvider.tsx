import { ReactNode } from "react";
import { AuthProvider } from "../context/auth/AuthProvider";
import { CartProvider } from "../context/cart/CartProvider";

interface DefaultProviderProps{
    children:ReactNode
}

export default function DefaultProvider({children}:DefaultProviderProps){
    return(
        <AuthProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </AuthProvider>
    )
}