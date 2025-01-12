import { Router } from "express";
import { routesUser } from "./user.routes";
import { routesLogin } from "./login.routes";
import { routesCategory } from "./category.routes";
import { routesProduct } from "./product.routes";
import { routesCatalog } from "./catalog.routes";

const router = Router();

// Call all routes here
router.use(routesUser); 
router.use(routesLogin); 
router.use(routesCategory);
router.use(routesProduct);
router.use(routesCatalog);

export default router;