import { useEffect, useState } from "react";
import { CategoryFullType, CategoryInputType } from "../../types/CategoryType";

import isCategoryFullType from "../../utils/isCategoryFullType";
import { useCategoryService } from "./useCategoryService ";


// Hook para editar categorias
export const useCategoryForm = (addOrUpdateItemList: (category: CategoryFullType, index?:number) => void) => {
    const emptyData:CategoryInputType = {title: '', description: ''};

    const [dataForm, setDataForm]   = useState<CategoryInputType | CategoryFullType>(emptyData);
    const [indexData, setIndexData] = useState<number>(-1); 
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setILoading]  = useState(false);
    
    // Chamar instância do serviço
    const categoryService = useCategoryService();

    // Função para iniciar a edição de uma categoria específica
    const editItem = (item: CategoryFullType, index:number) => {
        setDataForm(item);
        setIndexData(index);
        setShowModal(true);
    };

    // Função para alternar a visibilidade do modal
    const toggleModal = () => {
        setShowModal(prevState => !prevState);
    };

    // Função para atualizar os valores de entrada do formulário
    const setInputValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDataForm(prevData => {
            if(prevData){
                const newData = {
                    ...prevData,
                    [name]:value
                }
                return newData;
            }else{
                return emptyData;
            }
        });
    };

    // Função para Eviar as alterações da categoria
    const submitItem = async () => {
        setILoading(true); //Carregando

        if (dataForm && !isCategoryFullType(dataForm)) {
            const newCategory = await categoryService.createCategory(dataForm);
            if(newCategory){
                addOrUpdateItemList(newCategory);
                toggleModal(); 
            }
        }else
        if(dataForm && isCategoryFullType(dataForm)){
            const  newCategory = await categoryService.updateCategory(dataForm);
            if(newCategory){
                addOrUpdateItemList(newCategory, indexData);
                toggleModal(); 
            }
        }
        setILoading(false); //Finalizado
    };

    // Efeito para limpar os dados de edição quando o modal é fechado
    useEffect(()=>{
        if(!showModal){
            setDataForm(emptyData);
            setIndexData(-1);
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
        },
        action: {
            editItem,
            submitItem
        }
    };
};