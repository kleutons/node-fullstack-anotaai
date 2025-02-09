import { Request, Response, Router } from "express";
import { ROUTERS } from "./definition.routes";
import { CatalogController } from "../controllers/catalog.controller";
import { OwnerCache } from "../data/owner.cache";
import { ProductCache } from "../data/product.cache.";
import { CategoryCache } from "../data/category.cache";

const routesCatalog = Router();
const cacheOwner = OwnerCache.getInstance();
const cacheCategory = CategoryCache.getInstance();
const cacheProduct = ProductCache.getInstance();

routesCatalog.get(ROUTERS.CATALOG + "/:ownerId", async (req: Request, res: Response) => {
    new CatalogController().list(req, res);
});

// Rota de teste
routesCatalog.get(ROUTERS.CATALOG + "s/owner", async (req: Request, res: Response) => {
    res.status(200).json(await cacheOwner.getAll());
});

// Rota de teste
routesCatalog.get(ROUTERS.CATALOG + "s/category", async (req: Request, res: Response) => {
    res.status(200).json(await cacheCategory.getAll());
});

// Rota de teste
routesCatalog.get(ROUTERS.CATALOG + "s/product", async (req: Request, res: Response) => {
    res.status(200).json(await cacheProduct.getAll());
});
export { routesCatalog };
