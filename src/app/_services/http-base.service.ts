import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaginationService } from './pagination.service';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {
  private headers = new HttpHeaders();
  private endpoint = environment.endpoint;

  constructor(
    private httpClient: HttpClient,
    private paginationService: PaginationService
  ) {
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
  }

  getAll<T>(patch: string) {
    const mergedUrl =
      `${this.endpoint}` + patch +
      `?pageNumber=${this.paginationService.page}&pageSize=${this.paginationService.pageSize}`;

    return this.httpClient.get<T>(mergedUrl, { observe: 'response' });
  }

  getSingle<T>(patch: string, id: string) {
    const mergedUrl =
    `${this.endpoint}${patch}/${id}`;
    
    return this.httpClient.get<T>(mergedUrl);
  }

  add<T>(toAdd: T) {
    return this.httpClient.post<T>(this.endpoint, toAdd, {
      headers: this.headers
    });
  }

  update<T>(url: string, toUpdate: T) {
    return this.httpClient.put<T>(url, toUpdate);
  }

  delete(url: string) {
    return this.httpClient.delete(url);
  }
}
