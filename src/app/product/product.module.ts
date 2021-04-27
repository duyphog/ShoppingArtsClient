import { ListComponent } from './list/list.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { ProductRoutes } from './product.routing';
import { DetailsComponent } from './details/details.component';
import { OverviewComponent } from './overview/overview.component';


@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ProductRoutes),
    MatPaginatorModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    FormsModule
  ],
  exports: [],
})
export class ProductModule { }
