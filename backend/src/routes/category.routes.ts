import { NextFunction, Request, Response, Router } from "express";
import { ROUTERS } from "./definition.routes";
import { CategoryController } from "../controllers/category.controller";

const  routesCategory = Router();

routesCategory.get(ROUTERS.CATEGORY, async (req:Request, res:Response, next: NextFunction) => {
    new CategoryController().listAll(req,res);
});

routesCategory.post(ROUTERS.CATEGORY, async (req:Request, res:Response, next: NextFunction) => {
    new CategoryController().create(req,res);
});

routesCategory.put(ROUTERS.CATEGORY+"/:id", async (req:Request, res:Response, next: NextFunction) => {
    new CategoryController().update(req,res);
});

routesCategory.delete(ROUTERS.CATEGORY+"/:id", async (req:Request, res:Response, next: NextFunction) => {
    new CategoryController().delete(req,res);
});

export {routesCategory};