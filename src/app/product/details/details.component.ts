import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from '../../_models/product';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product = new Product();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService
        .getSingle<Product>(id)
        .subscribe(product => { this.product = product });
    }
  }

  save() {
    const method = this.product.id ? 'PUT' : 'POST';

    this.productService
      .fireRequest(this.product, method)
      .subscribe(() => this.router.navigate(['product']));
  }
}
