import { Catalog, CatalogCategories, CatalogProducts, OwnerModel } from '../models/catalog.model';
import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';
import { HttpError } from '../errors/http-error';
import { HttpStatusCodes } from '../errors/http-status-codes';
import { OwnerCache } from '../data/owner.cache';
import { ProductCache } from '../data/product.cache.';
import { CategoryCache } from '../data/category.cache';
import { UserService } from './user/user.service';
import { ProductService } from './product/product.service';
import { UserModel } from '../models/user.model';
import { CategoryService } from './category/category.service';


export class CatalogService {
  // Declaração das variáveis de serviço e cache
  private ownerCache: OwnerCache;
  private userService: UserService;

  private productCache: ProductCache;
  private productService: ProductService;

  private categoryCache: CategoryCache;
  private categoryService: CategoryService;
  
  constructor() {
     // Inicialização dos serviços e caches
    this.ownerCache             = OwnerCache.getInstance();
    this.userService            = new UserService();

    this.productCache           = ProductCache.getInstance();
    this.productService         = new ProductService;

    this.categoryCache          = CategoryCache.getInstance();
    this.categoryService        = new CategoryService();
  }

  // Função auxiliar para criar OwnerModel a partir do resultado do banco de dados
  private createOwnerModelFromUserDB(userDB: UserModel): OwnerModel {
    return {
      id: userDB.id,
      name: userDB.name,
      storeId: userDB.storeId,
      imgUrl: userDB.imgUrl || undefined
    };
  }

  // Função que busca um owner por ownerId ou storeId
  private async findById(ownerIdOrStoreId: string):Promise<OwnerModel | undefined>{
    
    // Recupera todos os owners do cache
    const ownerCache: OwnerModel[] = await this.ownerCache.getAll();
    // Procura no cache pelo owner com storeId ou id igual ao parâmetro fornecido
    let dataOwner: OwnerModel | undefined = ownerCache.find(owner => (owner.storeId === ownerIdOrStoreId || owner.id === ownerIdOrStoreId));

    if (!dataOwner){
       // Se não encontrar no cache, busca no banco de dados
      const userDB = await this.userService.findById(ownerIdOrStoreId);
      if(userDB){
        dataOwner = this.createOwnerModelFromUserDB(userDB);
        this.ownerCache.addOrUpdate(dataOwner);
      }else{
        throw new HttpError(HttpStatusCodes.ERRO_BAD_REQUEST, "Catalog Not Found!");
      }
    }
    return dataOwner;
  }

  // Função que busca categorias por ownerId ou storeId
  private async findByCategory(ownerId: string):Promise<CategoryModel[]>{
     // Recupera todas as categorias do cache e filtra
    let dataCategory: CategoryModel[] = await this.categoryCache.getAll();
    dataCategory = dataCategory.filter(item => item.ownerId === ownerId);

    if(dataCategory.length === 0){
      // Se não encontrar no cache, busca no banco de dados
      dataCategory = await this.categoryService.listByOwnerId(ownerId, true);
      if(dataCategory.length > 0 )
        this.categoryCache.updateAllCategory(dataCategory);
    }
    return dataCategory
  }

  private async findByProduct(ownerId: string):Promise<ProductModel[]>{
     // Recupera todos os produtos do cache
    let dataProducts: ProductModel[] = await this.productCache.getAll();
    dataProducts = dataProducts.filter(item => item.ownerId === ownerId);

    if(dataProducts.length === 0){
      // Se não encontrar no cache, busca no banco de dados
      dataProducts = await this.productService.listByOwnerAndCategoryId(ownerId, undefined, true);
      if(dataProducts.length > 0 )
        this.productCache.updateAllProduct(dataProducts);
    }
    return dataProducts
  }

  public async getCatalog(ownerIdOrStoreId: string): Promise<Catalog | null> {
    const dataOwner = await this.findById(ownerIdOrStoreId);
    if(!dataOwner)
      return null;
    
    const categories = await this.findByCategory(dataOwner.id);
    const products = await this.findByProduct(dataOwner.id);

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