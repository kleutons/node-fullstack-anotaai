import { Search } from "lucide-react";

export default function FilterSearch(){
    return(
        <div className="flex w-full md:w-auto items-center px-2 border bg-white">
            <button className="P-3">
                <Search />
            </button>
            <input type="text" placeholder="Pesquisar" className="p-3" />
        </div>
    )
}