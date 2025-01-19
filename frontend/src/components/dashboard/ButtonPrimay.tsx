import React from "react"
import { useNavigate } from "react-router"

interface ButtonPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    text: string,
    link?: string
}

export default function ButtonPrimay({text, link, ...props}:ButtonPrimaryProps){
    if (!props.type)
        props.type = 'button';

    const navigate = useNavigate();
    const handleClick = () => {
        if(link)
        navigate(link);
    }

    return (    
        <button 
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
            onClick={handleClick}
            {...props}
        >
            {text}
        </button>
    )
}