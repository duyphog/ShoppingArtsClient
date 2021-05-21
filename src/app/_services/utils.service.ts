import { Injectable } from '@angular/core';
import { Gender } from '../_models/gender';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';
import { DeliveryType } from '../_models/delivery-type';
import { PaymentType } from '../_models/payment-type';
import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class UtilService extends HttpBaseService {
  private pathUtil = "apputils/"
  private pathGender = this.pathUtil + "genders";
  private pathDeliveryType = this.pathUtil + "delivery-type";
  private pathPaymentType = this.pathUtil + "payment-type";
  private pathCatetory = this.pathUtil + "category";

  getGenders(): Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(this.endpoint + this.pathGender);
  }

  getDeliveryType(): Observable<DeliveryType[]> {
    return this.httpClient.get<DeliveryType[]>(this.endpoint + this.pathDeliveryType);
  }

  getPaymentType(): Observable<PaymentType[]> {
    return this.httpClient.get<PaymentType[]>(this.endpoint + this.pathPaymentType);
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.endpoint + this.pathCatetory);
  }
}
