import { Request, Response, Router } from "express";
import { ROUTERS } from "./definition.routes";
import { UserController } from "../controllers/user.controller";
import AuthController from "../controllers/auth.controller";

const  routesUser = Router();

const authController = new AuthController();

routesUser.get(ROUTERS.USER, authController.verifyToken, authController.isAdmin, async (req:Request, res:Response) => {
    new UserController().listAll(req,res);
});

routesUser.post(ROUTERS.USER, authController.verifyToken, authController.isAdmin, async (req:Request, res:Response) => {
    new UserController().create(req,res);
});

routesUser.put(ROUTERS.USER+"/:id", authController.verifyToken, authController.isAdmin, authController.ValidateGetIdUserToken, async (req:Request, res:Response) => {
    new UserController().update(req,res);
});

routesUser.delete(ROUTERS.USER+"/:id", authController.verifyToken, authController.isAdmin, async (req:Request, res:Response) => {
    new UserController().delete(req,res);
});

export {routesUser};