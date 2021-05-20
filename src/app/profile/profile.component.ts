import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Account } from '../_models/account';
import { ChangePassword } from '../_models/change-password';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  account = new Account;
  change = false;


  formDetail = this.formBuilder.group({
    'passwordOld': [null, Validators.required],
    'passwordNew': [null, Validators.required],
  });


  constructor( 
    private router: Router, 
    private toastr: ToastrService, 
    public accountService: AccountService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {   
    this.accountService.getProfile().subscribe((account: Account) => {
      this.account = account;
    });
  }

  btnChange(){
    this.change = true;
  }

  save(){
    const data : ChangePassword = this.formDetail.value;
    this.accountService.changePassword(data).subscribe(
      () => {
        this.toastr.success(`success`);
        this.change = !this.change;
      }
    );
  }
  cancel(){
    this.change = !this.change;
  }

}
