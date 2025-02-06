export interface OwnerType{
    id            :string
    name          :string,
    storeId       :string,
    imgUrl?       :string
}

export interface CatalogItemType{
    id: string,
    title: string
    description: string,
    price: number,
    imgUrl?: string
}

export interface CatalogType{
    category_title: string,
    category_description: string
    itens: CatalogItemType[]
}

export interface CatalogDataType{
    owner: OwnerType,
    catalog: CatalogType[]
}

export interface CatalogCartItemType extends CatalogItemType{
    quantity: number
}

export interface CatalogCategoryType{
    title: string
}