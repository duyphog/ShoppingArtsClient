import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginationService } from 'src/app/_services/pagination.service';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from '../../_models/product'

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  private patch = "product/link";
  dataSource: Product[];
  totalCount: number;

  constructor(
    private productService: ProductService,
    private paginationService: PaginationService
  ) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.getAllProduct();
  }

  delete(product: Product) {
    this.productService.fireRequest(product, 'DELETE')
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(x => x.id !== product.id);
      });
  }
  getAllProduct() {
    this.productService.getAll<Product[]>(this.patch)
      .subscribe((result: any) => {
        this.dataSource = result.body.value;       
        this.totalCount = JSON.parse(result.headers.get('X-Pagination')).TotalItems;
      });
  }
}
