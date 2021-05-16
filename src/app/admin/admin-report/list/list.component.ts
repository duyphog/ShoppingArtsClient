import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ContactUs } from '../../../_models/contact-us';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { DialogComfirmDeleteComponent } from '../dialog-comfirm-delete/dialog-comfirm-delete.component';

import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { PaginationService } from 'src/app/_services/pagination.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  dataSource = new MatTableDataSource<ContactUs>();
  @Input('dataSource')
    set dataSourceForTable(value: ContactUs[]) {
    this.dataSource = new MatTableDataSource<ContactUs>(value);
    this.dataSource.sort = this.sort;
  }
  @ViewChild(MatSort) sort: MatSort;
  @Input() totalCount: number;
  @Output() onDeleteProduct = new EventEmitter();
  @Output() onPageSwitch = new EventEmitter();
  @Output() onQueryData = new EventEmitter<ContactUs>();

  constructor(
    public pagitionService: PaginationService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(contactUS: ContactUs): void {
    const dialogRef = this.dialog.open(DialogComfirmDeleteComponent, {
      width: '300px',
      data: contactUS
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDeleteProduct.emit(result);
      }
    });
  }

  queryForm = this.formBuilder.group({
    productId: null,
    productName: null,
    prefixStock: "-1",
    stockValue: null,
    statusType: "-1"
  });

  submitQuery() {
    this.onQueryData.emit(this.queryForm.value);
  }

  clearQuery() {
    this.queryForm.reset();
  }


}
