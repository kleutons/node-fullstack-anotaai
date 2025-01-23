import { ReactNode } from "react"
import BgTranspatent from "./BgTranspatent"
import ButtonSecondary from "./dashboard/ButtonSecondary"
import ButtonPrimay from "./dashboard/ButtonPrimay"


interface iProps{
    title?: string,
    isShow: boolean,
    toggleModal: () => void,
    children : ReactNode
    submitAction?: () => void;
}

export default function Modal({title, isShow, toggleModal, children, submitAction}:iProps){

    const newTitle = title ? title : "Cadastrar";

    return (
        <> 
            <BgTranspatent isShow={isShow} actionClick={toggleModal} />
            <div data-show={isShow} 
            className="bg-white z-50 rounded-md p-4  min-w-[87%] md:min-w-[70%] data-[show=false]:hidden data-[show=true]:absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"> 
                <div className="pb-4 border-b font-semibold text-2xl">{newTitle}</div>
                <div className="py-6">                    
                    {children}
                </div>
                <div className="flex flex-col md:flex-row items-center justify-around gap-3 pt-4 border-t">
                    <div className="w-full md:w-2/3 max-w-80 md:max-w-40">
                        <ButtonSecondary text="Sair" onClick={toggleModal} />
                    </div>
                    <div className="w-full max-w-80">
                        <ButtonPrimay text="Salvar" onClick={submitAction} />
                    </div>
                </div>
            </div>
        </>
    )
}