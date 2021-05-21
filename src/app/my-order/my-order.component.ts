import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderForMyOrder } from '../_models/order';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['orderNumber','id', 'orderDate','productName','quantity','amount', 'orderStatusName', 'paymentName', 'deliveryName', 'isPaid', 'isTradeOrReturn', 'actions' ];

  constructor(
    private orderService: OrderService
  ) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
     this.orderService.getMyOrder().subscribe((x: OrderForMyOrder[]) => {
       this.dataSource = new MatTableDataSource<OrderForMyOrder>(x);
       this.dataSource.sort = this.sort;
     });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
