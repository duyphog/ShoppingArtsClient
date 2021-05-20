import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/_models/product';
import { PaginationService } from 'src/app/_services/pagination.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ProductQuery } from '../../_models/productQuery'
import { CartItem } from 'src/app/_models/cart-item';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['photo', 'id', 'productName', 'price', 'stock', 'warrantyPeriod', 'status', 'actions'];
  products : Product[]

  stockTypeQuery = [
    {"id" : -1, "value" : "="},
    {"id" : 0, "value" : "<="},
    {"id" : 1, "value" : ">="},
    {"id" : 2, "value" : "Unlimited"},
  ]

  statusTypeQuery = [
    {"id" : -1, "value" : "All"},
    {"id" : 0, "value" : "False"},
    {"id" : 1, "value" : "True"},
  ]

  @Input('dataSource')
  set dataSourceForTable(value: Product[]) {
    this.products = value;
    this.dataSource = new MatTableDataSource<Product>(value);
    this.dataSource.sort = this.sort;
  }
  @ViewChild(MatSort) sort: MatSort;

  @Input() totalCount: number;
  @Output() onDeleteProduct = new EventEmitter();
  @Output() onPageSwitch = new EventEmitter();
  @Output() onQueryData = new EventEmitter<ProductQuery>();
  @Output() onAddCart = new EventEmitter<Product>();

  constructor(
    public pagitionService: PaginationService, 
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  queryForm = this.formBuilder.group({
    productId: null,
    productName: null,
    prefixStock: "-1",
    stockValue: null,
    statusType: "1"
  });

  onPageChage(event: any){
    window.scroll(0,0);
    this.onPageSwitch.emit(event);
  }

  submitQuery(){
    this.onQueryData.emit(this.queryForm.value);
  }

  clearQuery(){
    this.queryForm.reset();
  }

}
