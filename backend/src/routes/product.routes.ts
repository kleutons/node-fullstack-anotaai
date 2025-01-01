import { NextFunction, Request, Response, Router } from "express";
import { ROUTERS } from "./definition.routes";
import { ProductController } from "../controllers/product.controller";

const  routesProduct = Router();

routesProduct.get(ROUTERS.PRODUCTS, async (req:Request, res:Response) => {
    new ProductController().listAll(req,res);
});

routesProduct.post(ROUTERS.PRODUCT, async (req:Request, res:Response) => {
    new ProductController().create(req,res);
});

routesProduct.put(ROUTERS.PRODUCT+"/:id", async (req:Request, res:Response) => {
    new ProductController().update(req,res);
});

routesProduct.delete(ROUTERS.PRODUCT+"/:id", async (req:Request, res:Response) => {
    new ProductController().delete(req,res);
});

export {routesProduct};