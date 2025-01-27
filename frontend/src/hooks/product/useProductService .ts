import { useEffect, useMemo, useState } from "react";
import ProductService from "../../services/ProductService";

export const useProductService  = () => {
    const [token, setToken] = useState<string>(localStorage.getItem('token') || '');

    // Atualiza o token sempre que ele mudar no localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem('token') || '');
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Memoriza a instância ProductService
    const productService = useMemo(() => new ProductService(token), [token]);

    return productService;
};
