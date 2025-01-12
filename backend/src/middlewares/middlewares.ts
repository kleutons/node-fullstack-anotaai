import { Application } from "express";
import { routeNotFound } from "./routeNotFound";
import jsonErrors from "./jsonErros";

export const middlewares = (app: Application) => {
    app.use(routeNotFound);
    app.use(jsonErrors);
};
