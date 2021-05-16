import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { Cart } from '../_models/cart';
import { CartItem } from '../_models/cart-item';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private currentCart = new ReplaySubject<CartItem[]>(1);
  currentCart$ = this.currentCart.asObservable();

  constructor() { }

  getCurrentCart() {
    let carts: CartItem[] = JSON.parse(localStorage.getItem('carts'));
    if (carts == null) {
      carts = new Array<CartItem>()
    }
    return carts;
  }

  setCurrentCart(carts: CartItem[]) {
    localStorage.setItem('carts', JSON.stringify(carts));
    this.currentCart.next(carts);
  }

  addItem(item: CartItem) {
    let carts: CartItem[] = JSON.parse(localStorage.getItem('carts'));
    if (carts == null) {
      carts = new Array<CartItem>();
      carts.push(item);
    } else {
      const index = carts.findIndex(x => x.productId == item.productId);
      if (index < 0) {
        carts.push(item);
      }
      else {
        carts[index].quantity += 1;
      }
    }

    this.setCurrentCart(carts);
  }

  deleteItem(item: CartItem) {
    let carts = this.getCurrentCart();
    carts = carts.filter(x => x.productId != item.productId);
    if (carts.length == 0)
      this.clearCarts();
    else
      this.setCurrentCart(carts);
  }

  deleteOnItem(item: CartItem) {
    let carts = this.getCurrentCart();
    const index = carts.findIndex(x => x.productId == item.productId);
    if (carts[index].quantity == 1) {
      throw "Minimun = 1";
    }
    carts[index].quantity -= 1;
    this.setCurrentCart(carts);
  }

  addOnItem(item: CartItem) {
    let carts = this.getCurrentCart();
    const index = carts.findIndex(x => x.productId == item.productId);
    carts[index].quantity += 1;
    this.setCurrentCart(carts);
  }

  clearCarts() {
    this.currentCart.next();
    localStorage.removeItem('carts');
  }

  clearStorageCart(){
    localStorage.removeItem('carts');
  }
}
