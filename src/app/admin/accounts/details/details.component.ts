import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormBuilder } from '@angular/forms';
import { Role } from 'src/app/_models/role';
import { Account } from 'src/app/_models/account';
import { RoleService } from 'src/app/_services/role.service';
import { Location } from '@angular/common';

export class role{
  role: Role[];
}


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  role: Role[];

  urlSelect: Array<string> = [];
  
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
    'roleIds': null,
  },);

  genderCreate = [
    {"id" : 0, "value" : "Male"},
    {"id" : 1, "value" : "Female"}
  ]

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public location: Location
  ) { }  

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.accountService
        .getSingle(id)
        .subscribe((account: Account) => {
            this.formDetail.setValue({
            id: account.id,
            userName: account.userName,
            email: account.email,
            dateOfBirth: account.dateOfBirth,
            gender: account.gender,            
            status: account.status ?? null,
            createDate: account.createDate,
            version: account.version ?? null,            
            createBy: account.createBy,
            modifyBy: account.modifyBy,
            modifyDate: account.modifyDate,
            roleIds: null
          }
          
          );
          
        });

        this.roleService.getList().subscribe(
          (result: any) => {
            this.role = result.body;
          });
    }

    this.roleService.getList().subscribe(
      (result: any) => {
        this.role = result.body;
      });
  }

  save() {
    const data : Account = this.formDetail.value;
    
    const method = data.id == undefined ? 'POST' : 'PUT';
    const accountId = this.formDetail.controls["id"] == undefined ? null : this.formDetail.controls["id"].value;
    this.accountService.save(accountId, data, method).subscribe(
      () => {
        this.toastr.success(`${this.formDetail.controls["id"] ? "Create" : "Update"} success`);
        this.location.back();
      }
    );
  }

  
  deleteSelected(index: number) {
    if (index == -1)
      return;
    this.urlSelect.splice(index, 1);
  }


  

}
