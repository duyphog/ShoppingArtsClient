import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { ListComponent } from './list/list.component';
import { HomeRoutes } from './home.routing';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list';
import {LayoutModule} from '@angular/cdk/layout';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    OverviewComponent, 
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatTooltipModule,
    MatGridListModule,
    LayoutModule,
    MatDividerModule,
  ]
})
export class HomeModule { }

