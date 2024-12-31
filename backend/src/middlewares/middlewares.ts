import { Application } from "express";
import { routeNotFound } from "./routeNotFound";

export const middlewares = (app: Application) => {
    app.use(routeNotFound);
};
