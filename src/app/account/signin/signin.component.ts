import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private accountService : AccountService,private router: Router, private toastr: ToastrService) { }

  model : any = {}
  currentUser$: Observable<User>

  ngOnInit(): void {
  }

  signIn() {
    this.accountService.signIn(this.model).subscribe(response => {
      this.router.navigateByUrl('/home');
    })
  }

}
