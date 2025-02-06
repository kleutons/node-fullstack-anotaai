export interface OwnerModel{
    id            :string
    name          :string,
    storeId       :string,
    imgUrl?       :string
}

export interface CatalogProducts {
    id: string;
    title: string;
    description: string;
    price: number;
    imgUrl?: string
}
  
export interface CatalogCategories {
    category_title: string;
    category_description: string;
    itens: CatalogProducts[];
}

export interface Catalog {
    owner: OwnerModel;
    catalog: CatalogCategories[];
}

