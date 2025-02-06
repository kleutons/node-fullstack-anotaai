import { ReactNode } from "react";
import ContentLayout from "./ContentLayout";

interface HeaderCatalogProps{
    children: ReactNode
}

export function HeaderCatalog({children}:HeaderCatalogProps){
    return(
        <header className="bg-blue-500 relative flex flex-col items-center">
            <div className="md:hidden bg-white absolute bottom-0 left-0 right-0 h-[6.4rem] rounded-t-3xl z-0">
            </div>
            
            <ContentLayout addClass="pt-5 px-4 z-10">
                {children}
            </ContentLayout>
        </header>
    )
}