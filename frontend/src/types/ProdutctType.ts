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