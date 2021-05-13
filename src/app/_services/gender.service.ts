import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gender } from '../_models/gender';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  private baseUrl = environment.endpoint;
  private urlGender = this.baseUrl + "apputils/genders";

  private currentUserSource = new ReplaySubject<Gender>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  getGenders() : Observable<Gender[]> {
    return this.http.get<Gender[]>(this.urlGender);
  }
}
