import { Request, Response, Router } from "express";
import { ROUTERS } from "./definition.routes";
import { CatalogController } from "../controllers/catalog.controller";

const  routesCatalog = Router();

routesCatalog.get(ROUTERS.CATALOG+"/:ownerId", async (req:Request, res:Response) => {
    new CatalogController().list(req,res);
});

export {routesCatalog};