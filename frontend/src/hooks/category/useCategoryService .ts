import { useEffect, useMemo, useState } from "react";
import CategoryService from "../../services/CategoryService";

export const useCategoryService = () => {
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

    // Memoriza a instância de CategoryService
    const categoryService = useMemo(() => new CategoryService(token), [token]);

    return categoryService;
};
