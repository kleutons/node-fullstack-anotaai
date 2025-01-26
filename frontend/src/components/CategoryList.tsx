import { CirclePlus } from "lucide-react";
import { Link } from "react-router";
import ButtonsActionForList from "./dashboard/ButtonsActionForList";
import { CategoryFullType } from "../types/CategoryType";
import Spinner from "./dashboard/Spinner";

interface CategoryListProps{
    isLoading?: boolean;
    data: CategoryFullType[] | null;
    editAction?: (item:CategoryFullType, index:number) => void;
    deleteAction?: (idItem:string, index:number) => void;
}

export default function CategoryList({isLoading = false, data, editAction, deleteAction}:CategoryListProps){

    if (isLoading) 
        return <div className="flex gap-2 justify-center items-center"> <Spinner theme="dark" /> Carregando...</div>;

    if(data == undefined || data.length == 0 )
        return <p>Nehuma Categoria Encontrada.</p>;
    
    return (
    <>
        {
            data.map((item, index)=>(
                <div key={item.id} data-index={index} className="bg-white p-2 rounded-md flex justify-between items-center">
                    <div className="flex-1 pt-4 pl-4 flex flex-col gap-2">

                        <h3 className="text-2xl">{item.title}</h3>

                        <Link to={'/product'} className="flex items-center justify-center gap-1" >
                            <CirclePlus size={18} />  
                            <span>Adicionar Produto</span>
                        </Link>

                    </div>
                    <div className="flex p-2 flex-col gap-2">
                        {
                            <ButtonsActionForList
                                editAction={() => editAction?.(item, index)}
                                trashAction={()=> deleteAction?.(item.id, index)}
                            />
                        }
                    </div>
                </div>
            ))
        }
    </>
    )
}