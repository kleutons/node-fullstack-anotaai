import { Router } from "express";
import { routesItem } from "./item.routes";
import { routesUser } from "./user.routes";

const router = Router();

// Call all routes here
router.use(routesItem); 
router.use(routesUser); 

export default router;