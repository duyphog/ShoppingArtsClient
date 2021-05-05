import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from '../../_models/product';
import { Category } from '../../_models/category';
import { CategoryService } from 'src/app/_services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmDeletePhotoComponent } from '../dialog-confirm-delete-photo/dialog-confirm-delete-photo.component';
import { Photo } from 'src/app/_models/photo';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  categories: Category[];
  product = new Product();
  public title = "Add Product";
  fileAttr = 'Choose File';
  isCreate: boolean = true;
  urlSelect: Array<string> = [];
  filesToUpload: Array<File> = [];

  uploadForm: FormGroup;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  validations_form = this.formBuilder.group({
    productName: new FormControl(null, Validators.required,),
    price: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")])
    // email: new FormControl('', Validators.compose([
    //   Validators.required,
    //   Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    // ]))
  });

  getErrorMessage() {
    // if (this.validations_form.productName.hasError('required')) {
    //   return 'You must enter a value';
    // }
    // if(this.price.hasError('pattern')){
    //   return 'you input number';
    // }

    // return this.productName.hasError('productName') ? 'Not a valid productName' : '';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService
        .getSingle(id)
        .subscribe((product: Product) => { this.product = product });

      this.title = "Edit Product";
      this.isCreate = false;
    }

    this.categoryService.getList().subscribe(
      (result: any) => {
        this.categories = result.body;
      });
  }

  save() {
    const method = this.isCreate ? 'POST' : 'PUT';
    let errors = "";
    this.productService.save(this.product, method).subscribe(
      () => {
        this.toastr.success("Save product success");

        if (this.filesToUpload.length > 0) {

          const formData = new FormData();
          for (let file of this.filesToUpload) {
            formData.append('files', file, file.name);
          }

          this.productService.addPhotos(this.product.id, formData).subscribe(
            () => {
              this.toastr.success("Save photo success");
            },
          );
          this.router.navigateByUrl("product");
        } else {
          this.router.navigateByUrl("product");
        }
      }
    );
  }

  uploadFileEvt(event: any) {
    if (event.target.files && event.target.files[0]) {
      Array.from(event.target.files).forEach((file: File) => {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.urlSelect.push(event.target.result);
        }
        reader.readAsDataURL(file);
        this.filesToUpload.push(file);
      });
    }
  }

  deleteSelected(index: number) {
    if (index == -1)
      return;
    this.urlSelect.splice(index, 1);
    this.filesToUpload.splice(index, 1);
  }

  openDialogPhotoDelete(photo: Photo): void {
    const dialogRef = this.dialog.open(DialogConfirmDeletePhotoComponent, {
      width: '300px',
      data: {
        type: 0,
        data: photo
      }
    });

    dialogRef.afterClosed().subscribe((result: Photo) => {
      if (result) {
        this.productService.deletePhoto(photo.id).subscribe(
          () => {
            this.toastr.success("Success", "Delete Photo");
            this.product.photos = this.product.photos.filter(x => x.id != result.id);
          }
        );
      }
    });
  }

  openDialogIsMain(photo: Photo): void {
    const dialogRef = this.dialog.open(DialogConfirmDeletePhotoComponent, {
      width: '300px',
      data: {
        type: 1,
        data: photo
      }
    });

    dialogRef.afterClosed().subscribe((result: Photo) => {
      if (result) {
        this.productService.setPhotoIsMain(this.product.id, result.id).subscribe(
          (photos: Photo[]) => {
            this.toastr.success("Success", "Set image main");
            this.product.photos = photos;
          }
        );
      }
    });
  }


}
function data(data: any) {
  throw new Error('Function not implemented.');
}

