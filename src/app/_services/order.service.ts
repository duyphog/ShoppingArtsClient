import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { OrderSucess } from 'src/app/_models/order-success';
import { OrderForMyOrder } from 'src/app/_models/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService extends HttpBaseService {

  private patchOrder = this.endpoint + "salesOrder";
  private patchPayment = this.patchOrder + "/payment";
  private patchMyOrder= this.patchOrder + "/my-orders";

  save(data: any){
    return this.httpClient.post<OrderSucess>(this.patchOrder, data);
  }

  payment(data: any){
    return this.httpClient.post(this.patchPayment, data);
  }

  getMyOrder(){
    return this.httpClient.get<OrderForMyOrder[]>(this.patchMyOrder);
  }
}
