import { Injectable } from '@angular/core';
import { PaginationModel } from '../_models/pagination.model';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private paginationModel: PaginationModel;

  constructor() {
    this.paginationModel = new PaginationModel();
  }

  get selectItemsPerPage(): number[] {
    return this.paginationModel.selectItemsPerPage;
  }

  set totalItems(value: number) {
    this.paginationModel.totalItems = value;
  }

  get totalItems(){
    return this.paginationModel.totalItems;
  }

  set pageSize(data: number) {
    this.paginationModel.pageSize = data;
  }

  get pageSize(): number {
    return this.paginationModel.pageSize;
  }

  set pageNumber(data: number) {
    this.paginationModel.pageNumber = data;
  }

  get pageNumber(): number {
    return this.paginationModel.pageNumber;
  }

  set totalPages(data: number) {
    this.paginationModel.totalPages = data;
  }

  get totalPages(): number {
    return this.paginationModel.totalPages;
  }

  set hasPrevious(data: boolean) {
    this.paginationModel.hasPrevious = data;
  }

  get hasPrevious(): boolean {
    return this.paginationModel.hasPrevious;
  }

  set hasNext(data: boolean) {
    this.paginationModel.hasNext = data;
  }

  get hasNext(): boolean {
    return this.paginationModel.hasNext;
  }

  change(pageEvent: PageEvent) {
    console.log(pageEvent);
    this.paginationModel.pageNumber = pageEvent.pageIndex + 1;
    this.paginationModel.pageSize = pageEvent.pageSize;
  }
}
