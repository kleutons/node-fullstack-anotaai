import { Request, Response, NextFunction } from "express";

// /middlewares/notFoundHandler.ts
export const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: '404 - Route not found' });
};
