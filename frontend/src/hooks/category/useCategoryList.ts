import { useCallback, useEffect, useState } from "react";
import { CategoryFullType } from "../../types/CategoryType";
import { useCategoryService } from "./useCategoryService ";

// Hook para listar categorias
export const useCategoryList = () => {
    // Armazena a lista de exibição 
    const [categories, setCategories]       = useState<CategoryFullType[]>([]); 
    // Armazena a lista original da Base de dados   
    const [dbCategories, setDbCategories]   = useState<CategoryFullType[]>([]); 
    const [isLoading, setILoading]  = useState(false);
    const [isLoadingCache, setIsLoadingCache] = useState(false);
    
    // Chamae instância do serviço
    const categoryService = useCategoryService();
    
    // Função para buscar categorias da API
    const getCategories = useCallback(async () => {
        setILoading(true);
            const data = await categoryService.getCategories();
            setCategories(data);
            setDbCategories(data);
        setILoading(false)
    }, [categoryService]);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    //Função para Buscar uma categoria
    const searchCategory = (findText: string) => {
        if (findText === "") {
            // Restaura a lista original do banco de dados
            setCategories(dbCategories); 
        } else {
            // Lista com filtro
            setCategories(dbCategories.filter(item =>
                item.title.toLowerCase().includes(findText.toLowerCase()) ||
                item.description.toLowerCase().includes(findText.toLowerCase())
            ));
        }
    };

    // Função para adicionar ou atualizar uma categoria específica na lista
    const addOrUpdateItemList = (item: CategoryFullType) => {
        const exists = categories.some(category => category.id === item.id);
        // Atualiza Base de Dados
        setDbCategories(prevData => {
            const updatedCategories = exists
                ? prevData.map(category => category.id === item.id ? item : category)
                : [item, ...prevData];
            return updatedCategories;
        })

        //Atualiza item exibido
        setCategories(prevData => {
            const updatedCategories = exists
                ? prevData.map(category => category.id === item.id ? item : category)
                : [item, ...prevData];
            return updatedCategories;
        })
    
    };

    const deleteIdList = (id:string) =>{
        
        // Remove da Base de Dados
        setDbCategories(prevData => { 
            const updatedListCategories = prevData.filter(category => category.id !== id); 
            return updatedListCategories
        })

        // Remove da Exibição
        setCategories(prevData => { 
            const updatedListCategories = prevData.filter(category => category.id !== id); 
            return updatedListCategories
        });
    }

    const updateCache = async () => {
        setIsLoadingCache(true);
        await categoryService.updateCache();
        setIsLoadingCache(false);
    }

    return {
        data: {
            categories,
            searchCategory
        },
        actionList:{
            addOrUpdateItemList,
            deleteIdList,
            isLoading,
            updateCache,
            isLoadingCache
        }
    };
};