import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Category } from '../../_models/category';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  categories: Category[];
  public title = "Add Product";
  isCreate: boolean = true;

  formDetail = this.formBuilder.group({
    'id': null,
    'name': [null, Validators.required],
    'description': [null, Validators.required],
    'status': true
  },
    // { validators: productDetailValidator }
  );

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryService
        .getSingle(id)
        .subscribe((category: Category) => { this.formDetail.setValue({
          id: category.id,
          name: category.name,
          description: category.description,
          status: category.status
        });
       });

      this.title = "Edit Product";
      this.isCreate = false;
    }

  
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


    const method = this.formDetail.controls["id"] == undefined ? 'POST' : 'PUT';
    const categoryId = this.formDetail.controls["id"] == undefined ? null : this.formDetail.controls["id"].value;
    this.categoryService.save(categoryId, formData, method).subscribe(
      () => {
        this.toastr.success(`${this.formDetail.controls["id"] ? "Create" : "Update"} success`);
        this.router.navigateByUrl("category");
      }
    );
  }

  deleteSelected(index: number) {
    // if (index == -1)
    //   return;
    // this.urlSelect.splice(index, 1);
    // this.filesToUpload.splice(index, 1);
  }

 
  

}
