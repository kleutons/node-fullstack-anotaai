interface QuantityControlsProps {
    id: string;
    quantity: number;
    updateQuantity: (id: string, quantity: number, isIncrement: boolean) => void;
}

export default function QuantityControls({ id, quantity, updateQuantity }: QuantityControlsProps){
    return(
        <div className="flex items-center gap-2 h-8 border-2 rounded-md overflow-hidden w-[100px]">

            <button 
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-200 hover:bg-slate-200/80 px-4 py-2 w-1 h-full rounded-none"
                onClick={() => updateQuantity(id, quantity, false)}
            >
                <p className="text-xl">-</p>
            </button>
            <div className="w-3 text-center mr-1">{quantity}</div>
            
            <button 
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-200 hover:bg-slate-200/80 px-4 py-2 w-1 h-full rounded-none"
                onClick={() => updateQuantity(id, quantity, true)}
            >
                <p className="text-xl">+</p>
            </button>
        </div>
    )
}