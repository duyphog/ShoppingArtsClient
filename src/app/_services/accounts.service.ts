import { Injectable } from '@angular/core';

import { HttpBaseService } from '../_services/http-base.service';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from '../_models/account';
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  })
}

@Injectable({
  providedIn: 'root'
})

export class AccountsService extends HttpBaseService{
  
  private urlPatch = "account";
  private urlPatchAdmin = "admin/AccountManager";
  private urlPatchProfile = "account/profile";
  private url = this.endpoint + this.urlPatch;
  private urlAdmin = this.endpoint + this.urlPatchAdmin;
  private urlProfile = this.endpoint + this.urlPatchProfile;
  
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

  getSingle(id: string) {
    const mergedUrl = `${this.url}/${id}`;
    return this.httpClient.get(mergedUrl);
  }

  save(id: string, data: Account, method: string) {
    switch (method) {
      case "POST":
        return this.httpClient.post<Account>(this.urlAdmin, data, { headers: this.headers });
      case "PUT":
        return this.httpClient.put<Account>(`${this.urlAdmin}/${id}`, data, { headers: this.headers });
      default:
        console.log(`${method} not found!!!`);
        break;
    }
  }
  delete(id: string) {
    const mergedUrl = `${this.urlAdmin}/${id}`;
    return this.httpClient.delete(mergedUrl);
  }

  getProfile(){
    return this.httpClient.get(this.urlProfile);
  }

  getCurrentAccount() {
    let accounts: Account[] = JSON.parse(localStorage.getItem('carts'));
    if (accounts == null) {
      accounts = new Array<Account>()
    }
    return accounts;
  }

}
