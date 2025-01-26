import { CategoryFullType } from "../types/CategoryType";
import { ProductFullType } from "../types/ProdutctType";
import ButtonsActionForList from "./dashboard/ButtonsActionForList";

import Spinner from "./dashboard/Spinner";

interface ProductListProps{
    isLoading?: boolean;
    data: ProductFullType[] | null;
    dataCategory: CategoryFullType[];
    editAction?: (item:ProductFullType) => void;
    deleteAction?: (idItem:string) => void;
}

export default function ProductList({isLoading = false, data, dataCategory, editAction, deleteAction}:ProductListProps){

    if (isLoading) 
            return <div className="flex gap-2 justify-center items-center"> <Spinner theme="dark" /> Carregando...</div>;
    
    if(data == undefined || data.length == 0 )
        return <p>Nehum Produto Encontrado.</p>;
    
    const getCategoryName = (categoryId: string) => {
        const category = dataCategory.find(cat => cat.id === categoryId);
        return category ? category.title : "Categoria Desconhecida";
    };

    return (
    <>
        <div className="grid grid-cols-4 py-3 px-2 border-b font-semibold uppercase text-sm">
            <div className="col-span-3 grid grid-cols-2">
                <div>Produtos</div>
                <div className="hidden md:block">Categoria</div>
            </div>
            <div className="text-center">Ações</div>
        </div>
        {
            data.map((item) => ( 
                <div className="grid grid-cols-4 py-3 px-2 items-center border-b hover:bg-slate-100 hover:text-black ">
                    <div className="col-span-3 flex flex-col md:grid md:grid-cols-2">
                        <div>{item.title}</div>
                        <div>{getCategoryName(item.categoryId)}</div>
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