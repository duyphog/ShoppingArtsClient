import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { from, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from '../_models/register';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';
import { Account } from '../_models/account';
import { ChangePassword } from '../_models/change-password';
@Injectable({
  providedIn: 'root'
})
export class AccountService extends HttpBaseService {

  private patchLogin = this.endpoint + 'account/login';
  private patchRegister = this.endpoint + "account";

  private urlPatch = "account";
  private url = this.endpoint + this.urlPatch;
  
  private urlPatchAdmin = "admin/AccountManager";
  private urlPatchProfile = "account/profile";
  private urlPatchChangePassword = "account/change-password"
  
  private urlAdmin = this.endpoint + this.urlPatchAdmin;
  private urlProfile = this.endpoint + this.urlPatchProfile;
  private urlChangePassword = this.endpoint + this.urlPatchChangePassword;

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  AccountLogin: Observable<Account[]>;
  
  signIn(model: any) {
    return this.httpClient.post<User>(this.patchLogin, model).pipe(
      map((user: User) => {
        if (user) {
         this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: Register) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };

    return this.httpClient.post<User>(this.patchRegister, JSON.stringify(model), options).pipe(
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
    this.AccountLogin = this.httpClient.get<Account[]>(mergedUrl);
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  getList(){
    return this.httpClient.get(this.url, { observe: 'response' });
  }
  getAccount(): Observable<Account[]>{
    return this.httpClient.get<Account[]>(this.url);
  }
  getSingle(id: string) {
    const mergedUrl = `${this.url}/${id}`;
    return this.httpClient.get(mergedUrl);
  }

  save(id: string, data: Account, method: string) {
    switch (method) {
      case "POST":
        return this.httpClient.post<Account>(this.urlAdmin, data, { headers: this.headers });
      case "PUT":
        return this.httpClient.put<Account>(`${this.urlAdmin}/${id}`, data, { headers: this.headers });
      default:
        console.log(`${method} not found!!!`);
        break;
    }
  }
  delete(id: string) {
    const mergedUrl = `${this.urlAdmin}/${id}`;
    return this.httpClient.delete(mergedUrl);
  }

  getProfile(){
    return this.httpClient.get(this.urlProfile);
  }

  getCurrentAccount() {
    let accounts: Account[] = JSON.parse(localStorage.getItem('carts'));
    if (accounts == null) {
      accounts = new Array<Account>()
    }
    return accounts;
  }

  changePassword(data: ChangePassword){
    return this.httpClient.put<Account>(`${this.urlChangePassword}`, data, { headers: this.headers });
  }


}