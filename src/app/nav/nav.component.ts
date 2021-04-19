import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  currentUser$: Observable<User>
 
  constructor(public accountService: AccountService, private router: Router, 
    private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;    
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/home')
  }
}