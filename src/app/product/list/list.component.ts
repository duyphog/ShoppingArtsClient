import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/_models/product';
import { PaginationService } from 'src/app/_services/pagination.service';
import {MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['photo', 'id', 'productName', 'price', 'stock', 'actions'];

  @Input('dataSource')
  set dataSourceForTable(value: Product[]) {
      this.dataSource = new MatTableDataSource<Product>(value);
  }

  @Input() totalCount: number;
  @Output() onDeleteCustomer = new EventEmitter();
  @Output() onPageSwitch = new EventEmitter();

  constructor(public pagitionService: PaginationService ) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
