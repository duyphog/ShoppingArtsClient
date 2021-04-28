import { Component } from '@angular/core';
import { AccountService } from '../app/_services/account.service'
import { User } from './_models/user';

 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Client';
  user: any;

  constructor(private accountService: AccountService){
  }

  ngOnInit(): void {
    this.setcurrentUser();
  }

  setcurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

}
