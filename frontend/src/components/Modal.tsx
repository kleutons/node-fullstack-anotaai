import { ReactNode, useEffect } from "react"
import BgTranspatent from "./BgTranspatent"
import ButtonSecondary from "./dashboard/ButtonSecondary"
import ButtonPrimay from "./dashboard/ButtonPrimay"
import Spinner from "./dashboard/Spinner"


interface iProps{
    title?: string,
    isShow: boolean,
    isLoading?: boolean,
    toggleModal: () => void,
    children : ReactNode
    submitAction?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function Modal({title, isShow, isLoading, toggleModal, children, submitAction}:iProps){

    const newTitle = title ? title : "Cadastrar";

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
            <form 
                data-show={isShow} 
                onSubmit={submitAction}                
                className="bg-white z-50 rounded-md min-w-[92%] md:min-w-[87%] lg:min-w-[65%] max-h-[85vh] data-[show=false]:hidden data-[show=true]:absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col"
            > 
                <div className="ml-4 mr-4 pt-4 pb-4 border-b font-semibold text-2xl">{newTitle}</div>
                <div className="p-4 md:p-6 flex-1 overflow-auto">                    
                    {children}
                </div>
                <div className="flex flex-row items-center justify-around gap-3 ml-4 mr-4 pt-4 pb-4 border-t">
                    <div className="w-full md:w-2/3 max-w-80 md:max-w-40">
                        <ButtonSecondary text="Sair" onClick={toggleModal} />
                    </div>
                    <div className="w-full max-w-80">
                        <ButtonPrimay type='submit'disabled={isLoading} >
                            {isLoading && <Spinner />}
                            Salvar
                        </ButtonPrimay>
                    </div>
                </div>
            </form>
        </>
    )
}