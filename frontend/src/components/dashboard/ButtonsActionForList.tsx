import { PenLine, Trash } from "lucide-react";


interface iProps{
    trashAction?: () => void;
    editAction?: () => void;
}

export default function ButtonsActionForList({ trashAction, editAction }:iProps){
    return (
        <>
            {trashAction && (
                <button className="p-2  bg-red-50 rounded-sm text-red-600 transition-transform transform hover:scale-105"
                    onClick={trashAction}
                >
                    <Trash size={20} />
                </button>
            )}
            {editAction &&(
                <button className="p-2 bg-sky-50 rounded-sm text-sky-600 transition-transform transform hover:scale-105"
                    onClick={editAction}
                >
                    <PenLine size={20} />
                </button>
            )}
        </>
    );
}