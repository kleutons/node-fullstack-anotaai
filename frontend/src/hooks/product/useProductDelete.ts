import { useState } from "react";
import { useProductService } from "./useProductService ";

// Hook para deletar Produtos
export const useProductDelete = (deleteIdList: (id:string) => void) => {

    const [idItem, setIdItem] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setILoading]  = useState(false);

    // Chamar instância do serviço
    const productService = useProductService();

    // Função para alternar a visibilidade do modal
    const openConfirm = (id:string) => {
        setIdItem(id);
        setShowModal(true);
    };

    // Função para alternar a visibilidade do modal
    const toggleModal = () => {
        setShowModal(prevState => !prevState);
    };

    // Função para Enviar Exclução
    const deleteItem = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        setILoading(true); //Carregando

            if(showModal && idItem){
                const response = await productService.delete(idItem);
                if(response)
                    deleteIdList(idItem);
            }
        
        setILoading(false); //Finalizado
        setIdItem(null);
        setShowModal(false);
    };

    return {
        modalDelete:{
            showModal,
            toggleModal,
            isLoading
        },
        actionDelete: {
            openConfirm,
            deleteItem,
        }
    };
};
