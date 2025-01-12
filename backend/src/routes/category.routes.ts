import { Request, Response, Router } from "express";
import { ROUTERS } from "./definition.routes";
import { CategoryController } from "../controllers/category.controller";
import AuthController from "../controllers/auth.controller";

const  routesCategory = Router();
const authController = new AuthController();

routesCategory.get(ROUTERS.CATEGORY, authController.verifyToken, authController.isAdmin, async (req:Request, res:Response) => {
    new CategoryController().listAll(req,res);
});

routesCategory.get(ROUTERS.CATEGORY+"/:ownerId", authController.verifyToken, async (req:Request, res:Response) => {
    new CategoryController().listByOwnerId(req,res);
});

routesCategory.post(ROUTERS.CATEGORY, authController.verifyToken, async (req:Request, res:Response) => {
    new CategoryController().create(req,res);
});

routesCategory.put(ROUTERS.CATEGORY+"/:id", authController.verifyToken, async (req:Request, res:Response) => {
    new CategoryController().update(req,res);
});

routesCategory.delete(ROUTERS.CATEGORY+"/:id", authController.verifyToken, async (req:Request, res:Response) => {
    new CategoryController().delete(req,res);
});

export {routesCategory};