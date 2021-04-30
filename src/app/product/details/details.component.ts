import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from '../../_models/product';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/_services/category.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  categories: Category[];
  product = new Product();
  public title = "Add product";
  fileAttr = 'Choose File';

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService
        .getSingle<Product>('product', id)
        .subscribe(product => { this.product = product });

      this.title = "Edit Product";
    }

    this.categoryService.getList<Category[]>(this.categoryService.patchUrl).subscribe(
      (result: any) => {
        this.categories = result.body;
      });
  }

  save() {
    const method = this.product.id ? 'PUT' : 'POST';
    console.log(this.product);
    return;

    this.productService
      .fireRequest(this.product, method)
      .subscribe(() => this.router.navigate(['product']));
  }

  uploadFileEvt(imgFile: any) {

    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  deletePhoto(id: any) {
    console.log(id);
  }
}
