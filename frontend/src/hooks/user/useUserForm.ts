import { useEffect, useState } from "react";
import { useUserService } from "./useUserService";
import isUserFullType from "../../utils/isUserFullType";
import { UserInputType, UserReturnType } from "../../types/UserType";
import { updateLocalStorageUser } from "../../utils/updateLocalStorageUser";

// Hook para editar usuário
export const useUserForm = (addOrUpdateItemList: (usuer: UserReturnType, index?:number) => void) => {
    const emptyData:UserInputType = {name: '', storeId: '', email: '', password: ''};

    const [dataForm, setDataForm]   = useState<UserInputType | UserReturnType>(emptyData);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setILoading]  = useState(false);

    // Chamar instância do serviço
    const userService = useUserService();

    // Função para iniciar a edição de um usuário específica
    const editItem = (item: UserReturnType) => {
        setDataForm(item);
        setShowModal(true);
    };

    // Função para alternar a visibilidade do modal
    const toggleModal = () => {
        setShowModal(prevState => !prevState);
    };

    // Função para atualizar os valores de entrada do formulário
    const setInputValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type} = e.target;
        // Para evniar numero corretamente
        const newValue = type === "number" ? Number(value) : value;

        setDataForm(prevData => {
            if(prevData){
                const newData = {
                    ...prevData,
                    [name]:newValue
                }
                return newData;
            }else{
                return emptyData;
            }
        });
    };

    //Função para alterar limpar Password
    const clearPassword = () => {
        setDataForm(prevData => ( {...prevData, password: undefined}));
    }

    // Função para Eviar as alterações da usuário
    const submitItem = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setILoading(true); //Carregando

        if (dataForm && !isUserFullType(dataForm)) {
            const newUser = await userService.create(dataForm);
            if(newUser){
                addOrUpdateItemList(newUser);
                toggleModal(); 
            }
        }else
        if(dataForm && isUserFullType(dataForm)){
            const  newUser = await userService.update(dataForm);
            if(newUser){
                updateLocalStorageUser(newUser);
                addOrUpdateItemList(newUser);
                toggleModal(); 
            }
        }
        setILoading(false); //Finalizado
    };

    // Efeito para limpar os dados de edição quando o modal é fechado
    useEffect(()=>{
        if(!showModal){
            setDataForm(emptyData);
        }
    },[showModal])
    
    return {
        modal:{
            showModal,
            toggleModal,
            isLoading
        },
        item: {
            dataForm,
            setInputValue,
            clearPassword
        },
        action: {
            editItem,
            submitItem
        }
    };
};