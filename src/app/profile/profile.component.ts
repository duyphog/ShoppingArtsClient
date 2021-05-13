import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { AccountsService } from '../_services/accounts.service';
import { User } from '../_models/user';
import { Account } from '../_models/account';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser$: Observable<User>;
  currentAccount$: Observable<Account>;
  AccountLogin: Observable<Account[]>;
  user: Account[];
  userName: string;

  formDetail = this.formBuilder.group({
    'id': null,
    'userName': [null, Validators.required],
    'email': [null, Validators.required],
    'dateOfBirth': [null, Validators.required],
    'gender': null,
    'status': true,
    'createDate' : null,
    'version': null,    
    'createBy': null,
    'modifyBy' : null,
    'modifyDate': null,
   
  });


  constructor( 
    public accountService: AccountService, 
    private router: Router, 
    private toastr: ToastrService, 
    public accountsService: AccountsService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$; 
    this.AccountLogin = this.accountService.AccountLogin;
    this.currentUser$.subscribe(r => {
        this.userName =  r.username;
        console.log(r.username);
    })
   
    console.log(this.AccountLogin);
  }


}
