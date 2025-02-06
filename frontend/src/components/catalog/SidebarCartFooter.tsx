import { FormatPriceToBRL } from "../../utils/FormatPriceToBRL";
import ButtonPrimay from "../dashboard/ButtonPrimay";

interface SidebarCartFooter{
    subtotal: number
}

export default function SidebarCartFooter({subtotal}:SidebarCartFooter){

    return(
        <div className="border-t border-t-slate-200  pt-3 mx-6 mb-4">
            <div className="flex justify-between items-center mb-2">
                <div className="">Subtotal:</div>
                <div className="">{FormatPriceToBRL(subtotal)}</div>
            </div>
            <ButtonPrimay disabled={subtotal? false : true} >
                Finalizar Pedido
            </ButtonPrimay>
        </div>
    )
}