export interface ProductModel{
    id            :string
    title         :string,
    ownerId       :string,
    categoryId    :string,
    price         :number
    description   :string,
    imgUrl?       :string | null//opcional
}

export interface ProductCreateModel{
    title         :string,
    ownerId       :string,
    categoryId    :string,
    price         :number
    description   :string,
    imgUrl?       :string | null //opcional
}