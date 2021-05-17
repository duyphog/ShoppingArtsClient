import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  model: any;
  account = new Account;
  change = false;
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
    private router: Router, 
    private toastr: ToastrService, 
    public accountsService: AccountsService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {   
    this.accountsService.getProfile().subscribe((account: Account) => {
      this.account = account;
    });
  }

  btnChange(){
    this.change = true;
  }

}
