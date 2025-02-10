import { useCategoryService } from "./useCategoryService ";

// Hook para deletar categorias
export const useCategoryDelete = (deleteIdList: (id:string) => void) => {

    // Chamar instância do serviço
    const categoryService = useCategoryService();

    const actionDelete = async (idItem: string) => {
        if(confirm("Tem certeza que deseja excluir a categoria?")){
            const response = await categoryService.deleteCategory(idItem);
            if(response)
                deleteIdList(idItem);
        }
    };

    return {
        actionDelete
    };
};
