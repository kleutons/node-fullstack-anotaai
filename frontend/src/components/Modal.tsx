import { ReactNode, useEffect } from "react"
import BgTranspatent from "./BgTranspatent"
import ButtonSecondary from "./dashboard/ButtonSecondary"
import ButtonPrimay from "./dashboard/ButtonPrimay"
import Spinner from "./dashboard/Spinner"
import { X } from "lucide-react"


interface iProps{
    title?: string,
    isShow: boolean,
    isLoading?: boolean,
    textBtnSubmit?: string,
    toggleModal: () => void,
    children : ReactNode
    submitAction?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function Modal({title, isShow, isLoading, textBtnSubmit, toggleModal, children, submitAction}:iProps){

    const newTextBtnSubmit = textBtnSubmit ? textBtnSubmit : 'Salvar';

    useEffect(() => {
        if (isShow) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
    
        return () => {
          document.body.style.overflow = "auto";
        };
      }, [isShow]);
    
    return (
        <> 
            <BgTranspatent isShow={isShow} actionClick={toggleModal} />
            <div className="z-50 fixed top-0 bottom-0 left-0 right-0 pointer-events-none">
                <form 
                    data-show={isShow} 
                    onSubmit={submitAction}                
                    className="bg-white z-50 rounded-md min-w-[92%] md:min-w-[87%] lg:min-w-[50%] max-h-[85vh] data-[show=false]:hidden data-[show=true]:absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col pointer-events-auto"
                > 
                    {title && (
                        <div className="ml-4 mr-4 pt-4 pb-4 border-b flex justify-between">
                            <h2 className="font-semibold text-2xl">
                                {title}
                            </h2>  
                            <button type="button" className="text-slate-400 hover:text-slate-800" onClick={toggleModal}>
                                <X />
                            </button>
                        </div>
                    )}
                    <div className="p-4 md:p-6 flex-1 overflow-auto">                    
                        {children}
                    </div>
                    <div className="flex flex-row items-center justify-around gap-3 ml-4 mr-4 pt-4 pb-4 border-t">
                        <div className="w-full md:w-2/3 max-w-80 md:max-w-40">
                            <ButtonSecondary onClick={toggleModal}> Fechar </ButtonSecondary>
                        </div>
                        <div className="w-full max-w-80">
                            <ButtonPrimay type='submit'disabled={isLoading} >
                                {isLoading && <Spinner />}
                                {newTextBtnSubmit}
                            </ButtonPrimay>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}