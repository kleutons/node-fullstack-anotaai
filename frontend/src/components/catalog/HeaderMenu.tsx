import { CatalogCategoryType } from "../../types/CatalogyType"

interface HeaderMenuProps{
    data: CatalogCategoryType[],
    selectedCategory: number,
    selectCategory: (index:number) => void
}
export default function HeaderMenu({data, selectedCategory, selectCategory}:HeaderMenuProps){


    return(
        <nav className="py-4 pt-5 md:pt-8 font-bold text-xl text-slate-500 md:text-white/70 select-none">
            <ul className="flex gap-4 justify-around overflow-x-auto whitespace-nowrap custom-scrollbar">
                {data.map((item, index) => (
                    <li 
                        key={`category-${index}`} 
                        className={`hover:text-black md:hover:text-white cursor-pointer ${selectedCategory === index ? 'text-black md:text-white border-b-2 border-blue-500 md:border-white' : ''}`}
                        onClick={() => selectCategory(index)}
                    >
                        {item.title}
                    </li>
                ))}
            </ul>
        </nav>
    )
}