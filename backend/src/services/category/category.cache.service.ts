import * as fs from 'fs';
import * as path from 'path';
import { CategoryModel } from "../../models/category.model";

const jsonCategory = path.resolve(__dirname, '../../data/category-cache.json');

export class CategoryCacheService {
  constructor() {
    if (!fs.existsSync(jsonCategory)) {
      fs.writeFileSync(jsonCategory, JSON.stringify([]));
    }
  }

  async getAll(): Promise<CategoryModel[]> {
    try{
      const data = fs.readFileSync(jsonCategory, 'utf-8');

      if(data.trim() == ''){
        return [];
      }
      return JSON.parse(data);
    }catch(err){
      console.error('File JSON Not Found!', err);
      return [];
    }
  }

  async addOrUpdate(newData: CategoryModel) {
    const currentData = await this.getAll();
    const index = currentData.findIndex(item => item.id === newData.id);
    
    if (index === -1) {
      // Adiciona o item
      currentData.push(newData);
    } else {
      // Atualiza o item existente
      currentData[index] = { ...currentData[index], ...newData };
    }

    fs.writeFileSync(jsonCategory, JSON.stringify(currentData, null, 2));
  }

  async delete(id: string): Promise<void> {
    const currentData = await this.getAll();
    const newData = currentData.filter(item => item.id !== id);
    fs.writeFileSync(jsonCategory, JSON.stringify(newData, null, 2));
  }
}
