import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Toast, ToastrService } from 'ngx-toastr';
import { CartItem } from '../_models/cart-item';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts = new Array<CartItem>();
  dataSource = new MatTableDataSource<CartItem>();
  displayedColumns: string[] = ['num', 'photo', 'productName', 'price', 'quantity', 'amount', 'action'];

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.cartService.currentCart$.subscribe(x => {
      this.carts = x;
      this.dataSource = new MatTableDataSource(x);
    });
  }

  getTotalAmount(){
    return this.carts.map(x => x.price * x.quantity).reduce((acc, value) => acc + value);
  }

  getTotalQuantity(){
    return this.carts.map(x => x.quantity).reduce((acc, value) => acc + value);
  }

  deleteRow(item: any){
    this.cartService.deleteItem(item);
  }
  
  subtrackOnRow(item: any){
    try {
      this.cartService.deleteOnItem(item);
    } catch (error) {
      this.toastr.error(error);
    }
  }

  addOnRow(item: any){
    this.cartService.addOnItem(item);
  }

  clearAllItem(){
    this.cartService.clearCarts();
  }

  checkout(){

  }
}
