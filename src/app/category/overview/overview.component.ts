import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_services/category.service';
import { PaginationService } from 'src/app/_services/pagination.service';
import { Category } from '../../_models/category';

import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  dataSource: Category[];
  private category = new Category;
  
  constructor(
    private CategoryService: CategoryService,
    private paginationService: PaginationService
  ) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.getAllCategory();
  }

  delete(category: Category) {
    this.CategoryService.delete(category.id).subscribe(
      () => {
        let index = this.dataSource.indexOf(category);
        category.status = false;
        this.dataSource[index] = category;
      }
    )
  }

  queryData(data: Category){
    this.category = data;
    this.getAllCategory();
  }
  getAllCategory() {
    this.CategoryService.getList().subscribe(
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
