import { CircleDollarSign } from "lucide-react"
import { FormatPriceToBRL } from "../../utils/FormatPriceToBRL"

interface HeaderOwnerProps{
    name: string,
    imgUrl?: string,
    minPrice: number
}
export default function HeaderOwner({imgUrl, name, minPrice}:HeaderOwnerProps){
    return(
        <div className="flex gap-3 items-center text-white">
            <div className="w-20 h-20">
                {imgUrl && (
                <img src={imgUrl} className="w-full h-full rounded-3xl object-cover object-cente" />
                )}
            </div>
            <div className="flex flex-col gap-2 md:gap-1">
                <h3 className="text-3xl">{name}</h3>
                <p className="text-slate-500 md:text-white flex gap-2 items-center text-sm">
                    <CircleDollarSign size={16} />
                    Pedido mínimo: {FormatPriceToBRL(minPrice)}
                </p>
            </div>
        </div>
    )
}