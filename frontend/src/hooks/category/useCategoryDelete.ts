import CategoryService from "../../services/CategoryService";

// Hook para deletar categorias
export const useCategoryDelete = (deleteIdList: (id:string) => void) => {

    const actionDelete = async (idItem: string) => {
        if(confirm("Tem certeza de que deseja excluir esta categoria?")){
            const response = await CategoryService.deleteCategory(idItem);
            if(response)
                deleteIdList(idItem);
        }
    };

    return {
        actionDelete
    };
};
