import { Router } from "express";
import { routesUser } from "./user.routes";
import { routesCategory } from "./category.routes";
import { routesProduct } from "./product.routes";

const router = Router();

// Call all routes here
router.use(routesUser); 
router.use(routesCategory);
router.use(routesProduct);

export default router;