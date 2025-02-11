import { ImageOff } from "lucide-react";
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
        <div className="grid grid-cols-5 py-3 px-2 border-b font-semibold uppercase text-sm">
            <div></div>
            <div className="col-span-3 grid grid-cols-2">
                <div>Produtos</div>
                <div className="hidden md:block">Categoria</div>
            </div>
            <div className="text-center">Ações</div>
        </div>
        {
            data.map((item, index) => ( 
                <div key={`product-${index}`} className="grid grid-cols-5 py-3 px-2 items-center border-b hover:bg-slate-100 hover:text-black ">
                    <div className="w-[45px] h-[45px] md:w-[70px] md:h-[70px] flex items-center justify-center">
                        {item.imgUrl ? (
                            <img src={item.imgUrl}  className="w-full h-full rounded-2xl object-cover object-cente"/>
                        
                        ) : (
                            <div className="bg-slate-200 rounded-full p-2 md:p-3 text-sky-900">
                                <ImageOff size={28} />
                            </div>
                        )}
                    </div>
                    <div className="col-span-3 flex flex-col md:grid md:grid-cols-2">
                        <div>{item.title}</div>
                        <div className="text-sm md:text-base" >{getCategoryName(item.categoryId)}</div>
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