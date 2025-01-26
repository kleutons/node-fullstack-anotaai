export interface CategoryInputType{
    title: string,
    ownerId?: string
    description: string
}
export interface CategoryFullType extends CategoryInputType{
    id: string
}