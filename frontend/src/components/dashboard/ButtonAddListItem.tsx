import ButtonPrimay from "./ButtonPrimay"


interface iProps{
    text: string,
    actionBtn?: () => void
}

export default function ButtonAddListItem({text, actionBtn}:iProps){
    return (
        <div className="w-full md:max-w-40">
            <ButtonPrimay onClick={actionBtn} >
                {text}
            </ButtonPrimay>
        </div>
    )
}