export interface CategoryModel{
    id            :string
    title         :string,
    ownerId       :string,
    description   :string,
}

export interface CategoryCreateModel{
    title         :string,
    ownerId       :string,
    description   :string,
}