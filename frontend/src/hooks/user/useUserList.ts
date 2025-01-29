import { useCallback, useEffect, useState } from "react";
import { useUserService } from "./useUserService";
import { UserReturnType } from "../../types/UserType";


// Hook para listar Produtos
export const useUserList = () => {
    // Armazena a lista de exibição 
    const [users, setUsers]       = useState<UserReturnType[]>([]); 
    // Armazena a lista original da Base de dados   
    const [dbUsers, setDbUsers]   = useState<UserReturnType[]>([]); 
    const [isLoading, setILoading]  = useState(false);

    // Chamar instância do serviço
    const userService = useUserService();
    
    // Função para buscar usuários da API
    const getProducts = useCallback(async () => {
        setILoading(true);
            const data = await userService.get();
            setUsers(data);
            setDbUsers(data);
        setILoading(false)
    }, [userService]);


    useEffect(() => {
        getProducts();
    }, [getProducts]);

    //Função para Buscar um usuário
    const searchUsers = (findText: string) => {
        if (findText === "") {
            // Restaura a lista original do banco de dados
            setUsers(dbUsers); 
        } else {
            // Lista com filtro
            setUsers(dbUsers.filter(item =>
                item.name.toLowerCase().includes(findText.toLowerCase()) ||
                item.email.toLowerCase().includes(findText.toLowerCase())
            ));
        }
    };


    // Função para adicionar ou atualizar um usuário específico na lista
    const addOrUpdateItemList = (item: UserReturnType) => {
        const exists = users.some(user => user.id === item.id);
        // Atualiza Base de Dados
        setDbUsers(prevData => {
            const updatedProducts = exists
                ? prevData.map(user => user.id === item.id ? item : user)
                : [item, ...prevData];
            return updatedProducts;
        })

        //Atualiza item exibido
        setUsers(prevData => {
            const updatedProducts = exists
                ? prevData.map(user => user.id === item.id ? item : user)
                : [item, ...prevData];
            return updatedProducts;
        })
    
    };

    const deleteIdList = (id:string) =>{
        
        // Remove da Base de Dados
        setDbUsers(prevData => { 
            const updatedListProducts = prevData.filter(item => item.id !== id); 
            return updatedListProducts
        })

        // Remove da Exibição
        setUsers(prevData => { 
            const updatedListProducts = prevData.filter(item => item.id !== id); 
            return updatedListProducts
        });
    }

    return {
        data: {
            users,
            searchUsers
        },
        actionList:{
            addOrUpdateItemList,
            deleteIdList,
            isLoading
        }
    };
};