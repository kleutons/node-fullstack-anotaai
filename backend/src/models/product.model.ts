export interface ProductModel{
    id            :string
    title         :string,
    ownerId       :string,
    categoryId    :string,
    price         :number
    description   :string,
}

export interface ProductCreateModel{
    title         :string,
    ownerId       :string,
    categoryId    :string,
    price         :number
    description   :string,
}