import React, { ReactNode } from "react"

interface ButtonSecondaryProps extends  React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode
}

export default function ButtonSecondary({children, ...props}:ButtonSecondaryProps){
    if (!props.type)
        props.type = 'button'; 
    
    return (    
        <button 
            className="w-full py-2 px-4 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-transform transform hover:scale-105"
            {...props}
        >
            {children}
        </button>
    )
}