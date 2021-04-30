import { Injectable } from '@angular/core';
import { Category } from '../_models/category';
import { HttpBaseService } from './http-base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends HttpBaseService {
  public patchUrl = "category";

  fireRequest(category: Category, method: string) {
    const links = category.links
      ? category.links.find(x => x.method === method)
      : null;

    switch (method) {
      case "DELETE": {
        return super.delete(links.href);
      }
      case 'POST': {
        return super.add<Category>(category);
      }
      case 'PUT': {
        return super.update<Category>(links.href, category);
      }
      default: {
        console.log(`${links.method} not found!!!`);
        break;
      }
    }
  }
  
}
