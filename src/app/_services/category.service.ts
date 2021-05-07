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

  getCategory(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(this.url);
  }

  delete(id: string) {
    const mergedUrl = `${this.url}/${id}`;
    return this.httpClient.delete(mergedUrl);
  }
}
