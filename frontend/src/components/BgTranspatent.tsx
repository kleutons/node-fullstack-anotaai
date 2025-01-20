interface iProps{
    isShow: boolean,
    actionClick: () => void;
}

export default function BgTranspatent({isShow, actionClick}:iProps){
    return <div data-show={isShow} className="data-[show=false]:hidden data-[show=true]:fixed z-50 top-0 bottom-0 right-0 left-0 bg-[#0f172aa2] backdrop-blur-sm duration-500 transition-all cursor-false opacity-1 pointer-events-auto" onClick={actionClick}></div>
}