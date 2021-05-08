import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { AccountsService } from '../../_services/accounts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Role } from 'src/app/_models/role';
import { Account } from '../../_models/account';
import { RoleService } from '../../_services/role.service';
export class InfoAccount{
  id: string;
  role: Role[];
  createBy: string;
  createDate: Date;
  modifyBy: string;
  modifyDate: Date;
}


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  role = [
    {"id" : -1, "value" : "Member"},
    {"id" : 0, "value" : "Staff"},
    {"id" : 1, "value" : "Admin"},
  ]
  infoEntity = new InfoAccount;

  urlSelect: Array<string> = [];

  formDetail = this.formBuilder.group({
    'id': null,
    'userName': [null, Validators.required],
    'email': [null, Validators.required],
    'dateOfBirth': [null, Validators.required],
    'gender': null,
    'version': null,
    'status': true,
  },
    
  );

  constructor(
    private accountsService: AccountsService,
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
      this.accountsService
        .getSingle(id)
        .subscribe((account: Account) => {
          this.infoEntity = {
            id: account.id,
            role: account.role,
            createBy : account.createBy,
            createDate : new Date(account.createDate),
            modifyBy : account.modifyBy,
            modifyDate : new Date(account.modifyDate)
          }

          this.formDetail.setValue({
            id: account.id,
            userName: account.userName,
            email: account.email,
            dateOfBirth: account.dateOfBirth,
            gender: account.gender,
            version: account.version ?? null,
            status: account.status ?? null
          });
          // this.formDetail.controls["categoryId"].disable();
        });
    }

    // this.roleService.getList().subscribe(
    //   (result: any) => {
    //     this.role = result.body;
    //   });
  }

  save() {
    if (!this.formDetail.valid) {
      this.toastr.warning("Invalid form");
      return;
    }

    let formData = new FormData();
    const data = this.formDetail.value;
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    // if (this.filesToUpload.length > 0) {
    //   for (let file of this.filesToUpload) {
    //     formData.append('files', file, file.name);
    //   }
    // }

    const method = this.infoEntity.id == undefined ? 'POST' : 'PUT';
    const productId = this.infoEntity.id == undefined ? null : this.infoEntity.id;
    // this.productService.save(productId, formData, method).subscribe(
    //   () => {
    //     this.toastr.success(`${this.infoEntity.id ? "Create" : "Update"} success`);
    //     this.router.navigateByUrl("product");
    //   }
    // );
  }

  
  deleteSelected(index: number) {
    if (index == -1)
      return;
    this.urlSelect.splice(index, 1);
    // this.filesToUpload.splice(index, 1);
  }


  
  openDialogPhotoDelete(): void {
    // const dialogRef = this.dialog.open(DialogConfirmDeletePhotoComponent, {
    //   width: '300px',
    //   data: {
    //     type: 0,
    //     data: photo
    //   }
    // });

    // dialogRef.afterClosed().subscribe((result: Photo) => {
    //   if (result) {
    //     this.productService.deletePhoto(photo.id).subscribe(
    //       () => {
    //         this.toastr.success("Success", "Delete Photo");
    //         this.infoEntity.photos = this.infoEntity.photos.filter(x => x.id != result.id);
    //       }
    //     );
    //   }
    // });
  }

}
