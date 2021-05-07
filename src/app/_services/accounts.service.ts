import { Injectable } from '@angular/core';

import { HttpBaseService } from '../_services/http-base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AccountsService extends HttpBaseService{
  
  private urlPatch = "account";
  private url = this.endpoint + this.urlPatch;
  
  getList(){
    return this.httpClient.get(this.url, { observe: 'response' });
  }
  getAccount(): Observable<Account[]>{
    return this.httpClient.get<Account[]>(this.url);
  }

  // getAll(productQuery: ProductQuery) {
  //   let params = new HttpParams();
  //   params = params.append("pageNumber", this.paginationService.pageNumber.toString())
  //   params = params.append("pageSize", this.paginationService.pageSize.toString());
  //   //query params
  //   params = productQuery.statusType
  //     ? params.append("statusType", productQuery.statusType.toString())
  //     : params;

  //   params = productQuery.productId
  //     ? params.append("productId", productQuery.productId)
  //     : params;

  //   params = productQuery.productName
  //     ? params.append("productName", productQuery.productName)
  //     : params;

  //   if(productQuery.stockValue != null){
  //     params = params.append("prefixStock", productQuery.prefixStock.toString());
  //     params = params.append("stockValue", productQuery.stockValue);
  //   }

  //   const mergedUrl = this.endpoint + this.urlPatch;
  //   return this.httpClient.get(mergedUrl, { params, observe: 'response' });
  // }

 

}
