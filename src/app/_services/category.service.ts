import { Injectable } from '@angular/core';
import { Category } from '../_models/category';
import { HttpBaseService } from './http-base.service';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends HttpBaseService {
  private urlPatch = "category";
  private url = this.endpoint + this.urlPatch;

  getList(){
    return this.httpClient.get(this.url, { observe: 'response' });
  }

  getSingle(id: string) {
    const mergedUrl = `${this.url}/${id}`;
    return this.httpClient.get(mergedUrl);
  }

  
  save(id: string, data: Category, method: string) {
    switch (method) {
      case "POST":
        return this.httpClient.post<Category>(this.url, data, { headers: this.headers });
      case "PUT":
        return this.httpClient.put<Category>(`${this.url}/${id}`, data, { headers: this.headers });
      default:
        console.log(`${method} not found!!!`);
        break;
    }
  }


  delete(id: string) {
    const mergedUrl = `${this.url}/${id}`;
    return this.httpClient.delete(mergedUrl);
  }
}
