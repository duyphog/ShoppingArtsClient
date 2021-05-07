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
    // if (id) {
    //   this.categoryService.
    //     .getSingle(id)
    //     .subscribe((product: Product) => { this.product = product });

    //   this.title = "Edit Product";
    //   this.isCreate = false;
    // }

    this.categoryService.getList().subscribe(
      (result: any) => {
        this.categories = result.body;
      });
  }


  save() {
    // const method = this.isCreate ? 'POST' : 'PUT';
    // let errors = "";
    // this.categoryService.save(this.product, method).subscribe(
    //   () => {
    //     this.toastr.success("Save product success");

    //     if (this.filesToUpload.length > 0) {

    //       const formData = new FormData();
    //       for (let file of this.filesToUpload) {
    //         formData.append('files', file, file.name);
    //       }

    //       this.productService.addPhotos(this.product.id, formData).subscribe(
    //         () => {
    //           this.toastr.success("Save photo success");
    //         },
    //       );
    //       this.router.navigateByUrl("product");
    //     } else {
    //       this.router.navigateByUrl("product");
    //     }
    //   }
    // );
  }

  deleteSelected(index: number) {
    // if (index == -1)
    //   return;
    // this.urlSelect.splice(index, 1);
    // this.filesToUpload.splice(index, 1);
  }

 
  

}
