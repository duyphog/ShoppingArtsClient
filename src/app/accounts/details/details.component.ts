import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { AccountService } from '../../_services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Role } from 'src/app/_models/role';
import { Account } from '../../_models/account';
import { RoleService } from '../../_services/role.service';


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
    'roleId': null,
  },
    
  );

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog 
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
            role: account.role,
          });
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
    // if (!this.formDetail.valid) {
    //   this.toastr.warning("Invalid form");
    //   return;
    // }

    const data : Account = this.formDetail.value;
    console.log(data);
    return;

    const method = data.id == undefined ? 'POST' : 'PUT';
    const accountId = this.formDetail.controls["id"] == undefined ? null : this.formDetail.controls["id"].value;
    this.accountService.save(accountId, data, method).subscribe(
      () => {
        this.toastr.success(`${this.formDetail.controls["id"] ? "Create" : "Update"} success`);
        this.router.navigateByUrl("account");
      }
    );
  }

  
  deleteSelected(index: number) {
    if (index == -1)
      return;
    this.urlSelect.splice(index, 1);
    // this.filesToUpload.splice(index, 1);
  }


  

}
