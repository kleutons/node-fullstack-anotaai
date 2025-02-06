import { CircleCheckBig } from "lucide-react";
import ContentLayout from "../../components/catalog/ContentLayout";
import ButtonPrimay from "../../components/dashboard/ButtonPrimay";
import { FormatPriceToBRL } from "../../utils/FormatPriceToBRL";
import useCart from "../../hooks/useCart";
import Footer from "../../components/dashboard/Footer";
  

export default function OrderFinishedPage(){

    const {dataCart, actionCart} = useCart();

    const handleBackClick = () => {
        actionCart.clearCart();
        window.history.back();
    }

    return( 
    <> 
        <div className="bg-blue-500 text-white flex flex-col gap-6 p-4 py-10 min-h-36 justify-center items-center">
            <CircleCheckBig size={44}/>
            <h1 className="text-2xl text-center">Pronto! Pedido Realizado Com Sucesso.</h1>
        </div>
        <div className="flex flex-col items-center">
            <ContentLayout addClass="pt-6 px-4">
                <div className="border-b mb-3 pb-2 font-bold text-center"> Detalhes do Pedido: </div>
                <div className="flex justify-between gap-5 font-bold">
                    <div className="col-span-4 flex-1 pl-1">Item</div>
                    <div className="w-7 text-center">Qnt</div>
                    <div className="w-24 text-center">Valor</div>
                </div>
                {
                    dataCart.cartItems.map((item) => (
                        <div key={`orderProduct-${item.id}`} className="flex justify-between gap-5">
                            <div className="col-span-4 flex-1 pl-1">{item.title}</div>
                            <div className="w-7  text-sm text-center">{item.quantity}</div>
                            <div className="w-24 text-sm text-center">{FormatPriceToBRL(item.price)}</div>
                        </div>
                    ))
                }

                <div className="border-b border-t my-3 py-2 font-bold text-end pr-3"> Total: {FormatPriceToBRL(dataCart.subtotal)}</div>
            </ContentLayout>
        </div>

        <div className="flex flex-col items-center justify-center pt-5 mt-5">
            <div className="min-w-80">
                <ButtonPrimay onClick={handleBackClick}>
                    Realizar Novo Pedido
                </ButtonPrimay>
            </div>
        </div>
        <div className="flex flex-col items-center">
            <ContentLayout >
                <Footer />
            </ContentLayout>
        </div>
    </>
    )
}