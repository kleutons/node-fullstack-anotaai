import * as fs from 'fs';
import * as path from 'path';
import { UserModel } from '../../models/user.model';
import { OwnerModel } from '../../models/catalog.model';

const jsonOwner = path.resolve(__dirname, '../../data/owner-cache.json');

export class OwnerCacheService {
  constructor() {
    if (!fs.existsSync(jsonOwner)) {
      fs.writeFileSync(jsonOwner, JSON.stringify([]));
    }
  }

  async getAll(): Promise<OwnerModel[]> {
    try{
      const data = fs.readFileSync(jsonOwner, 'utf-8');

      if(data.trim() == ''){
        return [];
      }
      return JSON.parse(data);
    }catch(err){
      console.error('File JSON Not Found!', err);
      return [];
    }
  }

  async addOrUpdate(newData: UserModel) {
    const currentData = await this.getAll();
    const index = currentData.findIndex(item => item.id === newData.id);
    
    if (index === -1) {
      // Adiciona o item
      currentData.push({id: newData.id, storeId: newData.storeId, imgUrl: newData.imgUrl || undefined});
    } else {
      // Atualiza o item existente
      const addNew = {id: newData.id, storeId: newData.storeId, imgUrl: newData.imgUrl || undefined};
      currentData[index] = { ...currentData[index], ...addNew };
    }

    fs.writeFileSync(jsonOwner, JSON.stringify(currentData, null, 2));
  }

  async delete(id: string): Promise<void> {
    const currentData = await this.getAll();
    const newData = currentData.filter(item => item.id !== id);
    fs.writeFileSync(jsonOwner, JSON.stringify(newData, null, 2));
  }
}
