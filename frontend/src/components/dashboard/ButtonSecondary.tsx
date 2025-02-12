import React, { ReactNode } from "react"

interface ButtonSecondaryProps extends  React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode
}

export default function ButtonSecondary({children, ...props}:ButtonSecondaryProps){
    if (!props.type)
        props.type = 'button'; 
    
    return (    
        <button 
            className="w-full py-2 px-4 border-2 border-slate-400 hover:border-slate-500 bg-white text-slate-600 hover:text-slate-700 rounded-lg transition-transform transform hover:scale-105"
            {...props}
        >
            {children}
        </button>
    )
}