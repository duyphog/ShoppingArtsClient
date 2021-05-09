import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/_models/cart-item';
import { Product } from 'src/app/_models/product';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product = new Product();
  urlImageShow: string;

  @Output() onAddCart = new EventEmitter<Product>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getSingle(id).subscribe((product: Product) => {
      this.product = product;
      this.urlImageShow = product.photoUrl;
    });
  }

  showImage(url: string){
    this.urlImageShow = url;
  }

  addCart(){
    const cartItem: CartItem = {
      productId: this.product.id,
      productName: this.product.productName,
      photoUrl: this.product.photoUrl,
      price: this.product.price,
      quantity: 1
    };
    
    this.cartService.addItem(cartItem);
  }
}
