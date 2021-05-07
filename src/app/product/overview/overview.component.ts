import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { PaginationService } from 'src/app/_services/pagination.service';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from '../../_models/product';
import { ProductQuery } from '../../_models/productQuery';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {
  dataSource: Product[];
  private productQuery = new ProductQuery;

  constructor(
    private productService: ProductService,
    private paginationService: PaginationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.getAllProduct();
  }

  queryData(data: ProductQuery){
    this.productQuery = data;
    this.paginationService.pageNumber =1;
    this.getAllProduct();
  }

  delete(product: Product) {
    this.productService.delete(product.id).subscribe(
      () => {
        let index = this.dataSource.indexOf(product);
        product.status = false;
        this.dataSource[index] = product;
        this.toastr.success("Success");
      }
    )
  }

  getAllProduct() {
    this.productService.getAll(this.productQuery).subscribe(
        (result: any) => {
          this.dataSource = result.body;

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
