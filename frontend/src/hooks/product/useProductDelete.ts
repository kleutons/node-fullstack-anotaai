import ProductService from "../../services/ProductService";

// Hook para deletar categorias
export const useProductDelete = (deleteIdList: (id:string) => void) => {

    const actionDelete = async (idItem: string) => {
        if(confirm("Tem certeza de que deseja excluir esta categoria?")){
            const response = await ProductService.delete(idItem);
            if(response)
                deleteIdList(idItem);
        }
    };

    return {
        actionDelete
    };
};
