import { ProductCartType } from "../../types/ProdutctType"
import { FormatPriceToBRL } from "../../utils/FormatPriceToBRL"
import QuantityControls from "./QuantityControls"

interface CartItemListProps {
    data: ProductCartType[],
    updateQuantity: (id: string, quantity: number, isIncrement: boolean) => void
}

export default function CartItemList({data, updateQuantity}:CartItemListProps){

    return( 
        <div className="flex-1 flex flex-col gap-5 py-3 px-6 overflow-y-auto">

            {
                data.map((item, index) => (
                    <div key={`cartItem-${index}`} className="flex items-center justify-between gap-3 sm:justify-normal">
                        <div className="overflow-hidden max-w-24 ">
                            {item.imgUrl && (
                                <img src={item.imgUrl} alt="Nigiri" className="w-full h-auto rounded-lg object-cover" />
                            )}
                        </div>
                        <div className="flex flex-col justify-center items-end gap-2  sm:flex-1">
                            <div className="flex flex-col items-end gap-1 sm:flex-1">
                                <p className="font-semibold text-end">{item.title}</p>
                                <p className="text-sm font-medium opacity-50">
                                    {FormatPriceToBRL(item.price)}
                                </p>
                            </div>
                            
                           <QuantityControls id={item.id} quantity={item.quantity} updateQuantity={updateQuantity}  />

                        </div>
                    </div>
                ))
            }
        </div>
    )
}