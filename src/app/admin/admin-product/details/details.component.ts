import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product';
import { Category } from 'src/app/_models/category';
import { CategoryService } from 'src/app/_services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmDeletePhotoComponent } from '../dialog-confirm-delete-photo/dialog-confirm-delete-photo.component';
import { Photo } from 'src/app/_models/photo';

export class InfoProduct{
  id: string;
  photos: Photo[];
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
  categories: Category[];
  infoEntity = new InfoProduct;

  urlSelect: Array<string> = [];
  filesToUpload: Array<File> = [];

  formDetail = this.formBuilder.group({
    'id': null,
    'productName': [null, Validators.required],
    'categoryId': [null, Validators.required],
    'shortDescription': [null, Validators.required],
    'longDescription': null,
    'origin': null,
    'stock': null,
    'unlimited': false,
    'warrantyPeriod': false,
    'location': null,
    'status': true,
    'price': [null, Validators.required]
  },
    // { validators: productDetailValidator }
  );

  constructor(
    private productService: ProductService,
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
      this.productService
        .getSingle(id)
        .subscribe((product: Product) => {
          this.infoEntity = {
            id: product.id,
            photos: product.photos,
            createBy : product.createBy,
            createDate : new Date(product.createDate),
            modifyBy : product.modifyBy,
            modifyDate : new Date(product.modifyDate)
          }

          this.formDetail.setValue({
            id: product.id,
            productName: product.productName,
            categoryId: product.categoryId,
            shortDescription: product.shortDescription ?? null,
            longDescription: product.longDescription ?? null,
            origin: product.origin ?? null,
            stock: product.stock ?? null,
            unlimited: product.unlimited ?? null,
            warrantyPeriod: product.warrantyPeriod ?? null,
            location: product.location ?? null,
            status: product.status ?? null,
            price: product.price ?? null,
          });
          this.formDetail.controls["categoryId"].disable();
        });
    }

    this.categoryService.getList().subscribe(
      (result: any) => {
        this.categories = result.body;
      });
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

    if (this.filesToUpload.length > 0) {
      for (let file of this.filesToUpload) {
        formData.append('files', file, file.name);
      }
    }

    const method = this.infoEntity.id == undefined ? 'POST' : 'PUT';
    const productId = this.infoEntity.id == undefined ? null : this.infoEntity.id;
    this.productService.save(productId, formData, method).subscribe(
      () => {
        this.toastr.success(`${this.infoEntity.id ? "Create" : "Update"} success`);
        this.router.navigateByUrl("admin/product");
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
            this.infoEntity.photos = this.infoEntity.photos.filter(x => x.id != result.id);
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
        this.productService.setPhotoIsMain(this.infoEntity.id, result.id).subscribe(
          (photos: Photo[]) => {
            this.toastr.success("Success", "Set image main");
            this.infoEntity.photos = photos;
          }
        );
      }
    });
  }
}