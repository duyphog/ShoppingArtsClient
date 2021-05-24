import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CartItem } from 'src/app/_models/cart-item';
import { CartService } from 'src/app/_services/cart.service';
import { PaginationService } from 'src/app/_services/pagination.service';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product';
import { ProductQuery } from 'src/app/_models/productQuery';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  private productQuery = new ProductQuery;
  categoryId: string;
  products: Product[]

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public paginationService: PaginationService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: any) => {
        this.categoryId = params.get('id');
        this.paginationService.pageNumber = 1;
        this.paginationService.pageSize = 20;
        this.getAllProduct();
      }
    )
  }

  addCart(item: Product) {
    const cartItem: CartItem = {
      productId: item.id,
      productName: item.productName,
      photoUrl: item.photoUrl,
      price: item.price,
      quantity: 1
    };

    this.cartService.addItem(cartItem);
  }

  onPageChage(event: any) {
    window.scroll(0, 0);
    this.paginationService.change(event);
    this.getAllProduct();
  }

  getAllProduct(){
    this.productService.getForCategory(this.categoryId, this.productQuery).subscribe(
      (result: any) => {
        this.products = result.body;
        const paginationHeader = JSON.parse(result.headers.get('X-Pagination'));
        this.paginationService.totalItems = paginationHeader.totalItems;
        this.paginationService.totalPages = paginationHeader.totalPages;
        this.paginationService.pageNumber = paginationHeader.currentPage;
        this.paginationService.pageSize = paginationHeader.pageSize
        this.paginationService.hasNext = paginationHeader.hasNext
        this.paginationService.hasPrevious = paginationHeader.hasPrevious
      });
  }
}
