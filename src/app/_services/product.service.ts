import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_models/product';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PaginationService } from '../_services/pagination.service';
import { HttpBaseService } from '../_services/http-base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends HttpBaseService {
  fireRequest(product: Product, method: string) {
    const links = product.links
      ? product.links.find(x => x.method === method)
      : null;

    switch (method) {
      case "DELETE": {
        return super.delete(links.href);
      }
      case 'POST': {
        return super.add<Product>(product);
      }
      case 'PUT': {
        return super.update<Product>(links.href, product);
      }
      default: {
        console.log(`${links.method} not found!!!`);
        break;
      }
    }
  }
}
