import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_models/product';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.mainUrl;
  private urlProduct = this.baseUrl + "product";
  constructor(private http: HttpClient) { }

  getProduct() : Promise<any>{
    return this.http.get<Product[]>(this.urlProduct).toPromise();;
  }
}
