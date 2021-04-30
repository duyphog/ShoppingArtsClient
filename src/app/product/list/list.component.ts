import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/_models/product';
import { PaginationService } from 'src/app/_services/pagination.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterViewInit {
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['photo', 'id', 'productName', 'price', 'stock', 'actions'];
  isLoadingResults = true;

  @Input('dataSource')
  set dataSourceForTable(value: Product[]) {
    this.isLoadingResults = true;
    this.dataSource = new MatTableDataSource<Product>(value);
    this.isLoadingResults = false;
  }
  
  @Input() totalCount: number;
  @Output() onDeleteCustomer = new EventEmitter();
  @Output() onPageSwitch = new EventEmitter();

  constructor(public pagitionService: PaginationService) { 
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
