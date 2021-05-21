import { Injectable } from '@angular/core';
import { Product } from '../_models/product';
import { HttpBaseService } from '../_services/http-base.service';
import { HttpParams } from '@angular/common/http';
import { ProductQuery } from '../_models/productQuery';

@Injectable({
  providedIn: 'root'
})

export class ProductService extends HttpBaseService {
  private urlPatch = "product";
  private urlPatchPhoto = "productphoto";
  private url = this.endpoint + this.urlPatch;
  private urlPhoto = this.endpoint + this.urlPatchPhoto;
  private urlForCategory = this.urlPatch + "/category";

  getAll(productQuery: ProductQuery) {
    let params = new HttpParams();
    params = params.append("pageNumber", this.paginationService.pageNumber.toString())
    params = params.append("pageSize", this.paginationService.pageSize.toString());
    //query params
    params = productQuery.statusType
      ? params.append("statusType", productQuery.statusType.toString())
      : params;

    params = productQuery.productId
      ? params.append("productId", productQuery.productId)
      : params;

    params = productQuery.productName
      ? params.append("productName", productQuery.productName)
      : params;

    if(productQuery.stockValue != null){
      params = params.append("prefixStock", productQuery.prefixStock.toString());
      params = params.append("stockValue", productQuery.stockValue);
    }

    const mergedUrl = this.endpoint + this.urlPatch;
    return this.httpClient.get(mergedUrl, { params, observe: 'response' });
  }

  getForCategory(categoryId: string, productQuery: ProductQuery){
    let params = new HttpParams();
    params = params.append("pageNumber", this.paginationService.pageNumber.toString())
    params = params.append("pageSize", this.paginationService.pageSize.toString());
    params = params.append("categoryId", categoryId);

    const mergedUrl = this.endpoint + this.urlForCategory;
    return this.httpClient.get(mergedUrl, { params, observe: 'response' });
  }

  getSingle(id: string) {
    const mergedUrl = `${this.url}/${id}`;
    return this.httpClient.get(mergedUrl);
  }

  save(id: string, data: FormData, method: string) {
    switch (method) {
      case "POST":
        return this.httpClient.post<Product>(this.url, data, { headers: this.headers });
      case "PUT":
        return this.httpClient.put<Product>(`${this.url}/${id}`, data, { headers: this.headers });
      default:
        console.log(`${method} not found!!!`);
        break;
    }
  }

  delete(id: string) {
    const mergedUrl = `${this.url}/${id}`;
    return this.httpClient.delete(mergedUrl);
  }

  addPhotos(id: string, files: FormData) {
    const mergedUrl = this.urlPhoto + "/" + id;
    return this.httpClient.post(mergedUrl, files, { headers: this.headers });
  }

  deletePhoto(id: string) {
    const mergedUrl = this.urlPhoto + "/" + id;
    return this.httpClient.delete(mergedUrl);
  }

  setPhotoIsMain(productId: string, photoId: string) {
    const mergedUrl = this.urlPhoto;
    const data = {
      productId: productId,
      photoId: photoId
    }
    return this.httpClient.post(mergedUrl, data);
  }
}
