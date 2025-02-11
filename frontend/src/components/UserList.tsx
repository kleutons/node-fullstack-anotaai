import { UserReturnType } from "../types/UserType";
import ButtonsActionForList from "./dashboard/ButtonsActionForList";
import Spinner from "./dashboard/Spinner";

interface iProps{
    isLoading?: boolean;
    data: UserReturnType[] | null;
    editAction?: (item:UserReturnType) => void;
    deleteAction?: (idItem:string) => void;
}

export default function UserList({isLoading = false, data, editAction, deleteAction}:iProps){

    if (isLoading) 
            return <div className="flex gap-2 justify-center items-center"> <Spinner theme="dark" /> Carregando...</div>;
    
    if(data == undefined || data.length == 0 )
        return <p>Nehum Usuário Encontrado.</p>;


    return (
    <>
        <div className="grid grid-cols-4 py-3 px-2 border-b font-semibold uppercase text-sm">
            <div className="col-span-3 grid grid-cols-2">
                <div>Usuário</div>
                <div className="hidden md:block">Função</div>
            </div>
            <div className="text-center">Ações</div>
        </div>
        {
            data.map((item) => ( 
                <div className="grid grid-cols-4 py-3 px-2 items-center border-b hover:bg-slate-100 hover:text-black ">
                    <div className="col-span-3 flex flex-col md:grid md:grid-cols-2">
                        <div>{item.name}</div>
                        <div>{item.role}</div>
                    </div>
                    <div className="flex flex-col justify-center items-center md:flex-row gap-2">
                        <ButtonsActionForList
                            editAction={() => editAction?.(item)}
                            trashAction={()=> deleteAction?.(item.id)}
                        />
                    </div>
                </div>
            ))
        }
    </>
    )
}