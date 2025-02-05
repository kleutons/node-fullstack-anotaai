import * as fs from 'fs';
import * as path from 'path';
import { Catalog, CatalogCategories, CatalogProducts, OwnerModel } from '../models/catalog.model';
import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';
import { HttpError } from '../errors/http-error';
import { HttpStatusCodes } from '../errors/http-status-codes';



const ownerCachePath = path.resolve(__dirname, '../data/owner-cache.json');
const productCachePath = path.resolve(__dirname, '../data/product-cache.json');
const categoryCachePath = path.resolve(__dirname, '../data/category-cache.json');

export class CatalogService {
  private readJsonFile<T>(filePath: string): T[] {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }



  public getCatalog(ownerIdOrStoreId: string): Catalog | null {

    const owner: OwnerModel[] = this.readJsonFile<OwnerModel>(ownerCachePath);
    let dataOwner: OwnerModel | undefined;
   
    // Filtra Owner pelo StoreId  
    dataOwner = owner.find(owner => (owner.storeId === ownerIdOrStoreId || owner.id === ownerIdOrStoreId))
   
    
    if(!dataOwner)
      throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Catalog Not Found!");

    

    const products: ProductModel[] = this.readJsonFile<ProductModel>(productCachePath);
    const categories: CategoryModel[] = this.readJsonFile<CategoryModel>(categoryCachePath);

    // Filtra categorias pelo ownerId
    const catalogCategories: CatalogCategories[] = categories
      .filter(category => category.ownerId === dataOwner.id)
      .map(category => {
        const items: CatalogProducts[] = products
          .filter(product => product.categoryId === category.id && product.ownerId === dataOwner.id)
          .map(product => ({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            imgUrl: product.imgUrl ?? undefined
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
      owner: dataOwner,
      catalog: catalogCategories,
    };
  }
}

