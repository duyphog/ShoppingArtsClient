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
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProductRoutes } from './product.routing';
import { DetailsComponent } from './details/details.component';
import { OverviewComponent } from './overview/overview.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDivider, MatDividerModule } from '@angular/material/divider';


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
    FormsModule,
    MatCardModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatGridListModule,
    MatDividerModule
  ],
  exports: [],
})
export class ProductModule { }
