import { Search } from "lucide-react";

interface FilterSearchProps {
    onSearch?: (findText: string) => void;
}
export default function FilterSearch({onSearch}:FilterSearchProps){
    return(
        <div className="flex w-full md:w-auto items-center px-2 border bg-white">
            <button className="P-3">
                <Search />
            </button>
            <input type="text" placeholder="Pesquisar" className="p-3" 
                onChange={(e) => onSearch && onSearch(e.target.value)}
            />
        </div>
    )
}