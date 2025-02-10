import { useProductService } from "./useProductService ";

// Hook para deletar Produtos
export const useProductDelete = (deleteIdList: (id:string) => void) => {

    // Chamar instância do serviço
    const productService = useProductService();

    const actionDelete = async (idItem: string) => {
        if(confirm("Tem certeza que deseja excluir o produto?")){
            const response = await productService.delete(idItem);
            if(response)
                deleteIdList(idItem);
        }
    };

    return {
        actionDelete
    };
};
