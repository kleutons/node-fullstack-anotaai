import { ReactNode } from "react";

interface CardHomeProps{
    type?: "primary" | "secondary"
    children: ReactNode
}
export default function CardHome({type, children}:CardHomeProps){
    
    const bgClass = !type ? "bg-white" : type === "primary" ? "text-white bg-gradient-to-r from-blue-600 to-blue-500" : "bg-gradient-to-r from-blue-100/50 to-blue-100";

    return (

        <div data-type="" className={`p-4 flex-1 rounded-md shadow-md transition-transform transform ${bgClass}`}>
            <div className="flex items-center justify-between">
               {children}
            </div>
        </div>
    )
}