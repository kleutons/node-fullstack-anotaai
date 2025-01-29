interface BaseUserType {
    name: string;
    storeId: string;
    email: string;
    imgUrl?: string;
}

export interface UserReturnType extends BaseUserType {
    id: string;
    password?: string;
    role: string;
    status: boolean;
}

export interface UserInputType extends BaseUserType {
    id?: string;
    password?: string;
}
