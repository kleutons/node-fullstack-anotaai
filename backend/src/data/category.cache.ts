import { CategoryModel } from "../models/category.model";

export class CategoryCache {
  private static instance: CategoryCache;
  private cache: CategoryModel[];

  constructor() {
    // Inicializa o cache em memória
    this.cache = [];
  }

  public static getInstance(): CategoryCache {
    if (!CategoryCache.instance) {
      CategoryCache.instance = new CategoryCache();
    }
    return CategoryCache.instance;
  }

  async getAll(): Promise<CategoryModel[]> {
    return this.cache;
  }

  async updateFullCache(newDataList: CategoryModel[]): Promise<void> {
      this.cache = newDataList;
  }

  async updateAllCategory(newDataList: CategoryModel[]): Promise<void> {
    // Combine o cache atual com as novas categorias
    const combinedCategories = [...this.cache, ...newDataList];
  
    // Remova duplicatas com base no ID da categoria
    const uniqueCategories = combinedCategories.filter((category, index, self) =>
      index === self.findIndex((c) => c.id === category.id)
    );
  
    // Atualize o cache com a lista de categorias única
    this.cache = uniqueCategories;
  }

  async addOrUpdate(newData: CategoryModel): Promise<void> {
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
