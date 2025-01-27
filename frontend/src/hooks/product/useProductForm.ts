import { useEffect, useState } from "react";
import { ProductFullType, ProductInputType } from "../../types/ProdutctType";
import isProductFullType from "../../utils/isProductFullType";
import { useProductService } from "./useProductService ";


// Hook para editar categorias
export const useProductForm = (addOrUpdateItemList: (category: ProductFullType, index?:number) => void) => {
    const emptyData:ProductInputType = {title: '', categoryId: '', description: ''};

    const [dataForm, setDataForm]   = useState<ProductInputType | ProductFullType>(emptyData);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setILoading]  = useState(false);

    // Chamar instância do serviço
    const productService = useProductService();

    // Função para iniciar a edição de uma categoria específica
    const editItem = (item: ProductFullType) => {
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

    // Função para Eviar as alterações da categoria
    const submitItem = async () => {
        setILoading(true); //Carregando

        if (dataForm && !isProductFullType(dataForm)) {
            const newCategory = await productService.create(dataForm);
            if(newCategory){
                addOrUpdateItemList(newCategory);
                toggleModal(); 
            }
        }else
        if(dataForm && isProductFullType(dataForm)){
            const  newCategory = await productService.update(dataForm);
            if(newCategory){
                addOrUpdateItemList(newCategory);
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
        },
        action: {
            editItem,
            submitItem
        }
    };
};