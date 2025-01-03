export interface CatalogProducts {
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
    owner: string;
    catalog: CatalogCategories[];
}
