import { Router } from "express";
import { routesUser } from "./user.routes";
import { routesCategory } from "./category.routes";

const router = Router();

// Call all routes here
router.use(routesUser); 
router.use(routesCategory);

export default router;