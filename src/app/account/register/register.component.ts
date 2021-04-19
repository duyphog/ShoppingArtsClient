import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { GenderService } from 'src/app/_services/gender.service';
import { Gender } from 'src/app/_models/gender';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from './password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  model : any = {};
  Genders : Gender[];
  public hidePw : boolean = true;

  constructor(private accountService : AccountService, private genderService : GenderService, private formBuilder: FormBuilder,
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
    this.genderService.getGenders().subscribe(x => this.Genders = x);
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
