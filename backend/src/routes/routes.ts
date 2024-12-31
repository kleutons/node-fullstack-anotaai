import { Router } from "express";
import { routesUser } from "./user.routes";

const router = Router();

// Call all routes here
router.use(routesUser); 

export default router;