import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {
  protected headers = new HttpHeaders();
  protected endpoint = environment.endpoint;

  constructor(
    protected httpClient: HttpClient,
    protected paginationService: PaginationService
  ) {
  }
}
