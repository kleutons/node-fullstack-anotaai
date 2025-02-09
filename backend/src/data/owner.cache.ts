import { OwnerModel } from "../models/catalog.model";
import { UserDataReturn } from "../models/user.model";


export class OwnerCache {
  private static instance: OwnerCache;
  private cache: OwnerModel[];

  constructor() {
    // Inicializa o cache em memória
    this.cache = [];
  }

  public static getInstance(): OwnerCache {
    if (!OwnerCache.instance) {
      OwnerCache.instance = new OwnerCache();
    }
    return OwnerCache.instance;
  }

  async getAll(): Promise<OwnerModel[]> {
    return this.cache;
  }

  async updateFullCache(newDataList: UserDataReturn[]): Promise<void> {
    this.cache = newDataList.map(data => ({
      id: data.id,
      name: data.name,
      storeId: data.storeId,
      imgUrl: data.imgUrl || undefined
    }));
  }

  async addOrUpdate(newData: OwnerModel): Promise<void> {
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
