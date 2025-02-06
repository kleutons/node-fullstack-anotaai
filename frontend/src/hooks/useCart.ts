import { useContext } from "react";
import { CartContext } from "../context/cart/CartContext";

export default function useCart(){
    const context = useContext(CartContext);
    
    if(!context)
        throw new Error('useCart deve ser usado dentrod de um CartProvider');
    
    return context;
}