import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [OverviewComponent, ListComponent, DetailsComponent],
  imports: [
    CommonModule
  ]
})
export class AdminSaleOrderModule { }
