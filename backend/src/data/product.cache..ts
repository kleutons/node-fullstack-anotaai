import { ProductModel } from "../models/product.model";

export class ProductCache {
  private static instance: ProductCache;
  private cache: ProductModel[];

  constructor() {
    // Inicializa o cache em memória
    this.cache = [];
  }

  public static getInstance(): ProductCache {
    if (!ProductCache.instance) {
      ProductCache.instance = new ProductCache();
    }
    return ProductCache.instance;
  }

  async getAll(): Promise<ProductModel[]> {
    return this.cache;
  }

  async updateFullCache(newDataList: ProductModel[]): Promise<void> {
    this.cache = newDataList;
  }

  async updateAllProduct(newDataList: ProductModel[]): Promise<void> {
    // Combine o cache atual com as novas
    const combined = [...this.cache, ...newDataList];
  
    // Remova duplicatas com base no ID 
    const unique = combined.filter((product, index, self) =>
      index === self.findIndex((c) => c.id === product.id)
    );
  
    // Atualize o cache com a lista de categorias única
    this.cache = unique;
  }

  async addOrUpdate(newData: ProductModel): Promise<void> {
    const index = this.cache.findIndex(item => item.id === newData.id);

    if (index === -1) {
      // Adiciona o item
      this.cache.push(newData);
    } else {
      // Atualiza o item existente
      this.cache[index] = { ...this.cache[index], ...newData };
    }
  }

  async delete(id: string): Promise<void> {
    this.cache = this.cache.filter(item => item.id !== id);
  }
}
