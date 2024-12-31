import { UserRole } from "@prisma/client"

export interface UserModel{
    id            :string
    name          :string,
    storeId       :string,
    email         :string,
    password      :string,
    role          :UserRole
    status        :boolean
    imgUrl        :string | null
}
export interface UserCreateModel{
    name          :string,
    storeId       :string,
    email         :string,
    password      :string,
    role?         :UserRole
    status?       :boolean
    imgUrl?       :string
}
