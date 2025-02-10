import { ReactNode } from "react"

interface ButtonPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode
}

export default function ButtonPrimay({children, ...props}:ButtonPrimaryProps){
    if (!props.type)
        props.type = 'button'; 

    // const navigate = useNavigate();
    // const handleClick = () => {
    //     if(link)
    //     navigate(link);
    // }

    return (    
        <button 
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 flex gap-2 items-center justify-center disabled:bg-blue-500/70"
            {...props}
        >
            {children}
        </button>
    )
}