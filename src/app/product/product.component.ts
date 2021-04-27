import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../_models/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { PaginationService } from '../_services/pagination.service';

const ELEMENT_DATA: Product[] = [
];

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'productName', 'longDescription', 'stock', 'details', 'update', 'delete'];

  constructor(private productService: ProductService,
    private router: Router, private toastr: ToastrService,
    public paginationService: PaginationService) {

  }
  ngOnInit() {
    this.loadDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadDataSource() {
    this.dataSource = new MatTableDataSource();
    this.productService.getProduct().then(data => {
      this.dataSource.data = data.body;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public redirectToDetails = (id: string) => {

  }
  public redirectToUpdate = (id: string) => {

  }
  public redirectToDelete = (id: string) => {

  }

  @Input() totalCount: number;
  @Output() onDeleteCustomer = new EventEmitter();
  @Output() onPageSwitch = new EventEmitter();

}
