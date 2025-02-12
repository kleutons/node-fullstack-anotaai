import { ImageOff } from "lucide-react";
import { CatalogItemType } from "../../types/CatalogyType";
import { FormatPriceToBRL } from "../../utils/FormatPriceToBRL";

interface CatalogProductItemProps{
    item: CatalogItemType
}

export default function CatalogProductItem({item}:CatalogProductItemProps){

    
    return (
        <>
            <div className="flex flex-col flex-1 gap-1 justify-between min-h-full">
                <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                <p className="text-sm">
                {item.description}
                </p>
                <div className="text-rose-600 font-bold text-xl flex gap-2 items-center">
                    {FormatPriceToBRL(item.price)}
                </div>
            </div>
            <div className="min-w-24 max-w-24 h-24">
                {item.imgUrl ? (
                    <img src={item.imgUrl}  className="w-full h-full rounded-3xl object-cover object-center"/>
                
                ) : (
                    <div className="bg-slate-100 w-full h-full rounded-3xl flex items-center justify-center  text-sky-900">
                        <ImageOff size={28} />
                    </div>
                )}
            </div>
        </>
    )
}