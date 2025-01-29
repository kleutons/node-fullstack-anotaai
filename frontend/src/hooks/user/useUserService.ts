import { useEffect, useMemo, useState } from "react";
import UserService from "../../services/UserService";

export const useUserService  = () => {
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

    // Memoriza a instância UserService
    const userService = useMemo(() => new UserService(token), [token]);

    return userService;
};
