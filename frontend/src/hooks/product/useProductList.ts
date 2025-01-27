import { useCallback, useEffect, useState } from "react";
import { useProductService } from "./useProductService ";
import { ProductFullType } from "../../types/ProdutctType";


// Hook para listar Produtos
export const useProductList = () => {
    // Armazena a lista de exibição 
    const [products, setProducts]       = useState<ProductFullType[]>([]); 
    // Armazena a lista original da Base de dados   
    const [dbProducts, setDbProducts]   = useState<ProductFullType[]>([]); 
    const [isLoading, setILoading]  = useState(false);

    // Chamar instância do serviço
    const productService = useProductService();
    
    // Função para buscar produtos da API
    const getProducts = useCallback(async () => {
        setILoading(true);
            const data = await productService.get();
            setProducts(data);
            setDbProducts(data);
        setILoading(false)
    }, [productService]);


    useEffect(() => {
        getProducts();
    }, [getProducts]);

    //Função para Buscar um produto
    const searchProduct = (findText: string) => {
        if (findText === "") {
            // Restaura a lista original do banco de dados
            setProducts(dbProducts); 
        } else {
            // Lista com filtro
            setProducts(dbProducts.filter(item =>
                item.title.toLowerCase().includes(findText.toLowerCase()) ||
                item.description.toLowerCase().includes(findText.toLowerCase())
            ));
        }
    };

    //Função para Buscar um produto
    const filterByCategory = (categoryId: string) => {
        if (categoryId === "") {
            // Restaura a lista original do banco de dados
            setProducts(dbProducts); 
        } else {
            // Lista com filtro
            setProducts(dbProducts.filter(item => item.categoryId == categoryId));
        }
    };

    // Função para adicionar ou atualizar um produto específico na lista
    const addOrUpdateItemList = (item: ProductFullType) => {
        const exists = products.some(product => product.id === item.id);
        // Atualiza Base de Dados
        setDbProducts(prevData => {
            const updatedProducts = exists
                ? prevData.map(product => product.id === item.id ? item : product)
                : [item, ...prevData];
            return updatedProducts;
        })

        //Atualiza item exibido
        setProducts(prevData => {
            const updatedProducts = exists
                ? prevData.map(product => product.id === item.id ? item : product)
                : [item, ...prevData];
            return updatedProducts;
        })
    
    };

    const deleteIdList = (id:string) =>{
        
        // Remove da Base de Dados
        setDbProducts(prevData => { 
            const updatedListProducts = prevData.filter(item => item.id !== id); 
            return updatedListProducts
        })

        // Remove da Exibição
        setProducts(prevData => { 
            const updatedListProducts = prevData.filter(item => item.id !== id); 
            return updatedListProducts
        });
    }

    return {
        data: {
            products,
            searchProduct,
            filterByCategory
        },
        actionList:{
            addOrUpdateItemList,
            deleteIdList,
            isLoading
        }
    };
};