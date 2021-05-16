import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  model: any = {}

  constructor(
    private accountService: AccountService,
    private router: Router,
    private location: Location,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    if(!this.accountService.currentUser$){
      this.router.navigateByUrl('signin');
    }

  }

  signIn() {
    this.accountService.signIn(this.model).subscribe(response => {
      this.toastrService.success("Success", "Login");
      this.location.back();
    })
  }

}
