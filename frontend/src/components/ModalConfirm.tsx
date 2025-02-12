import { CircleAlert } from "lucide-react";
import Modal from "./Modal";

interface iProps{
    isShow: boolean,
    isLoading?: boolean,
    toggleModal: () => void,
    submitAction: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function ModalConfirm({isShow, isLoading, toggleModal, submitAction }:iProps){

    return (
        <>
         <Modal textBtnSubmit="Sim" isShow={isShow} isLoading={isLoading} toggleModal={toggleModal} submitAction={submitAction}>
            <div className="flex flex-col items-center gap-3">
                <CircleAlert size={70} className="text-red-400" />
                <h2 className="text-2xl lg:text-3xl">
                    Deseja Excluir?
                </h2>
                <p className="text-center">
                    Tem certeza que deseja excluir, esse processo é irreversível.
                </p>
            </div>
             
         </Modal>
        </>
    )
}