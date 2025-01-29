import { useUserService } from "./useUserService";

// Hook para deletar categorias
export const useUserDelete = (deleteIdList: (id:string) => void) => {

    // Chamar instância do serviço
    const userService = useUserService();

    const actionDelete = async (idItem: string) => {
        if(confirm("Tem certeza de que deseja excluir esta categoria?")){
            const response = await userService.delete(idItem);
            if(response)
                deleteIdList(idItem);
        }
    };

    return {
        actionDelete
    };
};
