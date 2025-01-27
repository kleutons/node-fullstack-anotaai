import React from "react"

interface ButtonSecondaryProps extends  React.ButtonHTMLAttributes<HTMLButtonElement>{
    text: string
}

export default function ButtonSecondary({text, ...props}:ButtonSecondaryProps){
    if (!props.type)
        props.type = 'button'; 
    
    return (    
        <button 
            className="w-full py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
            {...props}
        >
            {text}
        </button>
    )
}