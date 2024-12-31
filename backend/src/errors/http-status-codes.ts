export enum HttpStatusCodes {
    // Success responses (200–299)
    SUCC_OK = 200,
    SUCC_CREATED = 201,

    // Client error responses (400–499)
    ERRO_BAD_REQUEST = 400,
    ERRO_UNAUTHORIZED = 401,
    ERRO_NOT_FOUND = 404,
    ERRO_FORBIDDEN = 403,

    // Server error responses (500–599)
    SERV_INTERNAL_ERROR = 500,
    SERV_NOT_IMPLEMENTED = 501,
}