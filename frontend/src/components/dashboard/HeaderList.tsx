import { ReactNode } from "react";


interface iProps{
    children: ReactNode
}

export default function HeaderList({children}:iProps){
    return (
        <div className="flex flex-col md:flex-row gap-3 justify-between items-center py-4">
           {children}
        </div>
    )
}