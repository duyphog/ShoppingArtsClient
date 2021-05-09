import { Component } from '@angular/core';
import { AccountService } from '../app/_services/account.service'
import { User } from './_models/user';

import { Spinkit } from 'ng-http-loader';
import { CartService } from './_services/cart.service';
import { CartItem } from './_models/cart-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Client';
  user: any;
  public spinkit = Spinkit;

  constructor(
    private accountService: AccountService,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.setcurrentUser();
    this.setShopingCart();
  }

  setcurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  setShopingCart() {
    const carts: CartItem[] = JSON.parse(localStorage.getItem('carts'));
    this.cartService.setCurrentCart(carts);
  }
}
