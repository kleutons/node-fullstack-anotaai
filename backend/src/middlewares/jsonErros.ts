import { NextFunction, Request, Response } from "express";

export default function jsonErrors(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof SyntaxError && 'body' in err) {
        res.status(400).json({ error: "Invalid JSON payload" });
        return;

    }
    next(err); // Passa o erro para o próximo middleware
    return;
}
