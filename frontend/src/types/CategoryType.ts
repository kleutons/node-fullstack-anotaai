export interface CategoryType{
    id: string,
    title: string,
    ownerId: string,
    description: string
}

export interface CategoryDataInput{
    id?: string,
    title: string,
    ownerId?: string,
    description: string
}