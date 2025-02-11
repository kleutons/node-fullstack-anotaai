import { CatalogDataType, CatalogItemType } from "../../types/CatalogyType";
import Spinner from "../dashboard/Spinner";
import CatalogProductItem from "./CatalogProductItem";

interface CatalogProductListProps {
    data: CatalogDataType | null;
    isLoading?: boolean;
    actionAddCart: (newItem: CatalogItemType) => void;
}

export default function CatalogProductList({ data, isLoading, actionAddCart }: CatalogProductListProps) {
    if (isLoading) 
        return <div className="flex gap-2 justify-center items-center"><Spinner theme="dark" /> Carregando...</div>;

    if (data === null || data.catalog.length === 0)
        return <p>Nenhum Produto Encontrado.</p>;

    return (
        <>
            {
                data.catalog.map((product, index) => (
                    product.itens.length > 0 ? (
                        <div key={`product-${index}`} id={`category-${index}`} className="pb-8">
                            <h4 className="text-blue-500 font-bold pb-3">{product.category_title}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {
                                    product.itens.map((item, key) => (
                                        <div key={`products-${key}`} className="p-2 border rounded-xl flex justify-between gap-2 h-full transform hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg"
                                            onClick={() => actionAddCart(item)}
                                        >
                                            <CatalogProductItem item={item} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ) : (
                        data.catalog.length === 1 ? <p key={`product-${index}`}>Nenhum Produto Encontrado.</p> : null
                    )
                ))
            }
        </>
    );
}
