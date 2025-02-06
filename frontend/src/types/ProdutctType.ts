export interface ProductInputType{
    title: string,
    ownerId?: string,
    categoryId: string,
    price?: number,
    description: string,
    imgUrl?: string
}
export interface ProductFullType extends ProductInputType{
    id: string
}

export interface ProductCatalogType{
    id: string,
    title: string,
    description: string,
    price: number,
    imgUrl?: string
}

export interface ProductCartType extends ProductCatalogType{
    quantity: number
}