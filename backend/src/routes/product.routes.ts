import { Request, Response, Router } from "express";
import { ROUTERS } from "./definition.routes";
import { ProductController } from "../controllers/product.controller";
import AuthController from "../controllers/auth.controller";

const  routesProduct = Router();
const authController = new AuthController();

routesProduct.get(ROUTERS.PRODUCT, authController.verifyToken, async (req:Request, res:Response) => {
    new ProductController().listByOwnerId(req,res);
});


routesProduct.post(ROUTERS.PRODUCT, authController.verifyToken, async (req:Request, res:Response) => {
    new ProductController().create(req,res);
});

routesProduct.put(ROUTERS.PRODUCT+"/:id", authController.verifyToken, async (req:Request, res:Response) => {
    new ProductController().update(req,res);
});

routesProduct.delete(ROUTERS.PRODUCT+"/:id", authController.verifyToken, async (req:Request, res:Response) => {
    new ProductController().delete(req,res);
});

export {routesProduct};