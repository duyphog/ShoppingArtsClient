import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { from } from 'rxjs';
import { AccountsService } from 'src/app/_services/accounts.service';
import { PaginationService } from 'src/app/_services/pagination.service';
import { Account } from '../../_models/account'
import { Observable } from 'rxjs';

import { User } from '../../_models/user';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  currentUser$: Observable<User>
  dataSource: Account[];
  private accountQuery = new Account;
  constructor(
    private accountsService: AccountsService,
    private paginationService: PaginationService 
  ) { }

  ngOnInit(): void {
    this.getAllAccount();
  }

  switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.getAllAccount();
  }

  queryData(data: Account){
    this.accountQuery = data;
    this.getAllAccount();
  }

  getAllAccount() {
    this.accountsService.getList().subscribe(
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
  delete(account: Account) {
    this.accountsService.delete(account.id).subscribe(
      () => {
        let index = this.dataSource.indexOf(account);
        account.status = false;
        this.dataSource[index] = account;
      }
    )
  }



}
