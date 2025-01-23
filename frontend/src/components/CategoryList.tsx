import { CirclePlus } from "lucide-react";
import { Link } from "react-router";
import ButtonsActionForList from "./dashboard/ButtonsActionForList";
import { CategoryType } from "../types/CategoryType";

interface CategoryListProps{
    loading?: boolean;
    data: CategoryType[] | null;
    editAction?: (item:CategoryType) => void;
    trashAction?: () => void;
}

export default function CategoryList({loading = false, data, editAction, trashAction}:CategoryListProps){

    if (loading) return <p>Loading...</p>;
    
    return (
    <>
        {
            data?.map((item)=>(
                <div key={item.id} className="bg-white p-2 rounded-md flex justify-between items-center">
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
                                editAction={() => editAction?.(item)}
                                trashAction={trashAction}
                            />
                        }
                    </div>
                </div>
            ))
        }
    </>
    )
}