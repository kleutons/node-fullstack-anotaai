import { HttpStatusCodes } from "./http-status-codes";


export class HttpError extends Error {
    statusCode: HttpStatusCodes;

    constructor(statusCode: HttpStatusCodes, menssage: string) {
        super(menssage);
        this.statusCode = statusCode;
        this.name = "HttpError";
    }

}
