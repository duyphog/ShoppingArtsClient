import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from '../_models/register';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private endpoint = environment.endpoint;
  private patchLogin = this.endpoint + 'account/login';
  private patchRegister = this.endpoint + "account";

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

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
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}