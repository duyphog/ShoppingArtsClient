import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ContactUs } from '../../../_models/contact-us';
import { PageEvent } from '@angular/material/paginator';

import { PaginationService } from 'src/app/_services/pagination.service';
import { ContactUsService } from 'src/app/_services/contact-us.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  dataSource: ContactUs[];
  private contactUs = new ContactUs;
  constructor(
    private contactUsService: ContactUsService,
    private paginationService: PaginationService
  ) { } 

  ngOnInit(): void {
    this.getAllContactUs();
  }
  switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.getAllContactUs();
  }
  getAllContactUs() {
    this.contactUsService.getList().subscribe(
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

  queryData(data: ContactUs){
    this.contactUs = data;
    this.getAllContactUs(); 
  }
  delete(contactUs: ContactUs) {
    this.contactUsService.delete(contactUs.id).subscribe(
      () => {
        let index = this.dataSource.indexOf(contactUs);
        // contactUs.status = false;
        this.dataSource[index] = contactUs;
      }
    )
  }


}
