import { Injectable } from '@angular/core';
import { Category } from '../_models/category';
import { HttpBaseService } from './http-base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends HttpBaseService {
  private urlPatch = "category";
  private url = this.endpoint + this.urlPatch;

  getList(){
    return this.httpClient.get(this.url, { observe: 'response' });
  }
}
