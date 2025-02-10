import { useCallback, useEffect, useState } from "react";
import { CatalogDataType } from "../types/CatalogyType";
import { useCatalogService } from "./catalog/useCatalogService";

export default function useTotal(ownerIdOrStoreId?: string){
    const [categories, setCategories] = useState<number>(0);
    const [products, setProducts] = useState<number>(0);
    const [isLoading, setILoading]  = useState(true);

    // Chamae instância do serviço
    const catalogService = useCatalogService();
    
    // Função para buscar categorias da API
    const getCatalog = useCallback(async () => {
        if(ownerIdOrStoreId){
            setILoading(true);
                const data:CatalogDataType | null = await catalogService.getCatalog(ownerIdOrStoreId);
                if(data){
                    setCategories(data.catalog.length);
                    
                    // Inicializando totalProducts
                    let totalProducts: number = 0;
                    data.catalog.map((item) => {
                        totalProducts = totalProducts + item.itens.length;
                    })
                    setProducts(totalProducts);
                }
            setILoading(false)
        }
    }, [catalogService, ownerIdOrStoreId]);

    useEffect(() => {
        getCatalog();
    }, [getCatalog]);

    return {categories,  products, isLoading}
}