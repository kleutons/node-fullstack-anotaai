import { ShoppingCart, Store } from "lucide-react";
import ContentLayout from "./ContentLayout";

interface FooterCatalogProps{
    totalItems: number,
    toggleSidebar: () => void;
}

export default function FooterCatalog({totalItems, toggleSidebar}:FooterCatalogProps){

    const scrollToTop = () => {
        scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    
    return(
        <footer className=" md:hidden sticky bottom-0 border-t px-4 flex justify-center items-center bg-white/95 w-full">
            <ContentLayout addClass="p-3 flex justify-between">
                <button className="flex justify-center items-center rounded-lg p-2" onClick={() => scrollToTop()}>
                    <Store />
                </button>
                <button className="bg-blue-500 text-white flex justify-center items-center rounded-lg p-2 relative cursor-pointer"
                onClick={toggleSidebar}>
                    {totalItems > 0 && (
                        <span className="bg-rose-500 rounded-full w-5 h-5 absolute -top-1 -right-1 text-xs flex items-center justify-center">{totalItems}</span>
                    )}
                    <ShoppingCart />
                </button>
            </ContentLayout>
        </footer>
    )
}