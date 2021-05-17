import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { from, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from '../_models/register';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';
import { Account } from '../_models/account';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private endpoint = environment.endpoint;
  private patchLogin = this.endpoint + 'account/login';
  private patchRegister = this.endpoint + "account";
  private urlPatch = "account";
  private url = this.endpoint + this.urlPatch;
  
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  AccountLogin: Observable<Account[]>;


  constructor(private http: HttpClient) { }
  
  signIn(model: any) {
    return this.http.post<User>(this.patchLogin, model).pipe(
      map((user: User) => {
        if (user) {
         this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: Register) {
    return this.http.post<User>(this.patchRegister, JSON.stringify(model)).pipe(
      map((user: User) => {
        if (user) {
         this.setCurrentUser(user);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
    const mergedUrl = `${this.url}/${user.username}`;
    this.AccountLogin = this.http.get<Account[]>(mergedUrl);
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

 
}