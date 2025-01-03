import * as fs from 'fs';
import * as path from 'path';
import { Catalog, CatalogCategories, CatalogProducts } from '../models/catalog.model';
import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';
import isValidId from '../utils/valid.id';
import { HttpError } from '../errors/http-error';
import { HttpStatusCodes } from '../errors/http-status-codes';


const productCachePath = path.resolve(__dirname, '../data/product-cache.json');
const categoryCachePath = path.resolve(__dirname, '../data/category-cache.json');

export class CatalogService {
  private readJsonFile<T>(filePath: string): T[] {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }



  public getCatalog(ownerId: string): Catalog | null {

    if(!isValidId(ownerId)){
        throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Invalid ID!");
    }

    const products: ProductModel[] = this.readJsonFile<ProductModel>(productCachePath);
    const categories: CategoryModel[] = this.readJsonFile<CategoryModel>(categoryCachePath);

    // Filtra categorias pelo ownerId
    const catalogCategories: CatalogCategories[] = categories
      .filter(category => category.ownerId === ownerId)
      .map(category => {
        const items: CatalogProducts[] = products
          .filter(product => product.categoryId === category.id && product.ownerId === ownerId)
          .map(product => ({
            title: product.title,
            description: product.description,
            price: product.price,
          }));

        return {
          category_title: category.title,
          category_description: category.description,
          itens: items,
        };
      });

    if (catalogCategories.length === 0) {
      return null; // Caso não haja categorias para o ownerId fornecido
    }

    return {
      owner: ownerId,
      catalog: catalogCategories,
    };
  }
}

