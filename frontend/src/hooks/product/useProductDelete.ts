import { useProductService } from "./useProductService ";

// Hook para deletar categorias
export const useProductDelete = (deleteIdList: (id:string) => void) => {

    // Chamar instância do serviço
    const productService = useProductService();

    const actionDelete = async (idItem: string) => {
        if(confirm("Tem certeza de que deseja excluir esta categoria?")){
            const response = await productService.delete(idItem);
            if(response)
                deleteIdList(idItem);
        }
    };

    return {
        actionDelete
    };
};
