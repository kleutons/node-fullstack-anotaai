import * as fs from 'fs';
import * as path from 'path';
import { ProductModel } from '../../models/product.model';


const jsonFile = path.resolve(__dirname, '../../data/product-cache.json');

export class ProductCacheService {
  constructor() {
    if (!fs.existsSync(jsonFile)) {
      fs.writeFileSync(jsonFile, JSON.stringify([]));
    }
  }

  async getAll(): Promise<ProductModel[]> {
    try{
      const data = fs.readFileSync(jsonFile, 'utf-8');

      if(data.trim() == ''){
        return [];
      }
      return JSON.parse(data);
    }catch(err){
      console.error('File JSON Not Found!', err);
      return [];
    }
  }

  async addOrUpdate(newData: ProductModel) {
    const currentData = await this.getAll();
    const index = currentData.findIndex(item => item.id === newData.id);
    
    if (index === -1) {
      // Adiciona o item
      currentData.push(newData);
    } else {
      // Atualiza o item existente
      currentData[index] = { ...currentData[index], ...newData };
    }

    fs.writeFileSync(jsonFile, JSON.stringify(currentData, null, 2));
  }

  async delete(id: string): Promise<void> {
    const currentData = await this.getAll();
    const newData = currentData.filter(item => item.id !== id);
    fs.writeFileSync(jsonFile, JSON.stringify(newData, null, 2));
  }
}
