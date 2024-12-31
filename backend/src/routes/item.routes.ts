import { NextFunction, Request, Response, Router } from "express";
import { ROUTERS } from "./routeDefinition";
import { itemController } from "../controllers/item.controller";

const  routesItem = Router();

routesItem.get(ROUTERS.ITEM, async (req:Request, res:Response, next: NextFunction) => {
    new itemController().list(req,res,next);
});

routesItem.post(ROUTERS.ITEM, async (req:Request, res:Response, next: NextFunction) => {
    new itemController().post(req,res);
});

routesItem.put(ROUTERS.ITEM+"/:id", async (req:Request, res:Response, next: NextFunction) => {
    new itemController().put(req,res);
});

routesItem.delete(ROUTERS.ITEM+"/:id", async (req:Request, res:Response, next: NextFunction) => {
    new itemController().delete(req,res);
});


export {routesItem};