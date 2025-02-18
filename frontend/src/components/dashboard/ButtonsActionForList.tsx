import { PenLine, Trash } from "lucide-react";


interface iProps{
    trashAction?: () => void;
    editAction?: () => void;
}

export default function ButtonsActionForList({ trashAction, editAction }:iProps){
    return (
        <>
            {editAction &&(
                <button className="p-2 bg-sky-50 hover:bg-sky-100 rounded-sm text-sky-600 transition-colors transform "
                    onClick={editAction}
                >
                    <PenLine size={20} />
                </button>
            )}
            {trashAction && (
                <button className="p-2 bg-red-50 rounded-sm text-red-600 transition-transform hover:bg-red-100"
                    onClick={trashAction}
                >
                    <Trash size={20} />
                </button>
            )}
        </>
    );
}