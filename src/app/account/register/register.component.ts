import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { Gender } from 'src/app/_models/gender';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from './password-validator';
import { UtilService } from 'src/app/_services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  model : any = {};
  Genders : Gender[];
  public hidePw : boolean = true;

  constructor(private accountService : AccountService, private utilService : UtilService, private formBuilder: FormBuilder,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadGenders();
  }

  registerForm = this.formBuilder.group({
    userName: ['', Validators.required],
    email: ['', Validators.required],
    dateOfBirth: null,
    gender: null,
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
      validators: PasswordValidation.MatchPassword
  }
  );

  loadGenders() {
    this.utilService.getGenders().subscribe(x => this.Genders = x);
  }

  onSubmit(){
    if(this.registerForm.valid){
      this.accountService.register(this.registerForm.value).subscribe( x => {
        this.toastr.success("Register Success!");
        this.router.navigateByUrl("/home");
      });
    } else {
      this.toastr.error("Data invalid", "Error");
    }
  }
}
