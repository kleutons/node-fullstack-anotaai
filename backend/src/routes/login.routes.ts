import { Request, Response, Router } from "express";
import { ROUTERS } from "./definition.routes";
import AuthController from "../controllers/auth.controller";


const  routesLogin = Router();

routesLogin.post(ROUTERS.LOGIN, async (req:Request, res:Response) => {
    new AuthController().login(req,res);
});

export {routesLogin};