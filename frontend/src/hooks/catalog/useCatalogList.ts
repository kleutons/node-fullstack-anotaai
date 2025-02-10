import { useEffect, useState } from "react";
import { CatalogCategoryType, CatalogDataType, OwnerType } from "../../types/CatalogyType";
import { useCatalogService } from "./useCatalogService";


// Hook para listar categorias
export const useCatalogList = () => {
    // Armazena a lista catalogo para exibição 
    const [dataCatalog, setDataCatalog]       = useState<CatalogDataType|null>(null); 
    const [dataOwner, setDataOwner]           = useState<OwnerType|null>(null); 
    // Armazena a lista original da Base de dados   
    const [dbCatalog, setDbCatalog]   = useState<CatalogDataType|null>(null); 
    const [catalogCategory, setCatalogCategory] = useState<CatalogCategoryType[]>([{title: 'Todos'}]);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [isLoading, setILoading]  = useState(true);
    
    //Armazenar Catálogo
    useEffect(() => {
        if (dbCatalog) {
            const categories = dbCatalog.catalog.map(item => ({ title: item.category_title }));
            setCatalogCategory([{ title: 'Todos' }, ...categories]);
            setDataOwner(dbCatalog.owner);
            setILoading(false);
        }
    },[dbCatalog])

    // Chamae instância do serviço
    const catalogService = useCatalogService();
    
    // Função para buscar o Catálogo
    const getCatalog = async (ownerIdOrStoreId?:string) => {
        if(ownerIdOrStoreId){
            setILoading(true);
                const data = await catalogService.getCatalog(ownerIdOrStoreId);
                setDataCatalog(data);
                setDbCatalog(data);
            setILoading(false)
        }
    };

    //Função para Buscar uma produto
    const searchProducts = (findText: string) => {        
        //Seleciona todos os produto para realizar a busca
        selectCategory(0);
        if (findText.length <= 2 ) {
            // Restaura a lista original do banco de dados
            setDataCatalog(dbCatalog); 
        } else {
            // Filtra as categorias e itens correspondentes ao texto de busca
            const filteredCatalog = dbCatalog?.catalog.map(products => ({
                ...products,
                itens: products.itens.filter(item =>
                    item.title.toLowerCase().includes(findText.toLowerCase()) ||
                    item.description.toLowerCase().includes(findText.toLowerCase())
                )
            })).filter(products => products.itens.length > 0);

            if (!dbCatalog || !filteredCatalog ) {
                setDataCatalog(null);
            } else {
                setDataCatalog({ owner: dbCatalog?.owner, catalog: filteredCatalog });
            }
        }
    };

    //Função para Selecionar uma Categoria
    const selectCategory = (index:number) => {
        const decreaseIndex = index - 1 ;
        setSelectedCategory(index)
        filterCategory(decreaseIndex);
    }

    //Função para Filtrar por Categoria
    const filterCategory = (index:number) => {
        // Seleciona Todas as Categorias
        if(index === -1 )
            setDataCatalog(dbCatalog);

        if(index >= 0 && dbCatalog){
            const filteredCatalog = {
                ...dbCatalog,
                catalog: [dbCatalog.catalog[index]]
            };
            setDataCatalog(filteredCatalog);
        }
            
    }

    return {
        data: {
            dataCatalog,
            dataOwner,
            catalogCategory,
            selectedCategory,
        },
        actionList:{
            getCatalog,
            selectCategory,
            searchProducts,
            isLoading
        }
    };
};