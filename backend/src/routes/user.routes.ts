import { Request, Response, Router } from "express";
import { ROUTERS } from "./definition.routes";
import { UserController } from "../controllers/user.controller";

const  routesUser = Router();

routesUser.get(ROUTERS.USER, async (req:Request, res:Response) => {
    new UserController().listAll(req,res);
});

routesUser.post(ROUTERS.USER, async (req:Request, res:Response) => {
    new UserController().create(req,res);
});

routesUser.put(ROUTERS.USER+"/:id", async (req:Request, res:Response) => {
    new UserController().update(req,res);
});

routesUser.delete(ROUTERS.USER+"/:id", async (req:Request, res:Response) => {
    new UserController().delete(req,res);
});

export {routesUser};