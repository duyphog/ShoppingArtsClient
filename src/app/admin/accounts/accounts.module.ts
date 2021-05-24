import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AccountRouter } from './accounts.routing'
import { OverviewComponent } from './overview/overview.component';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { DialogConfirmDeleteComponent } from './dialog-confirm-delete/dialog-confirm-delete.component';
import { MatListModule } from '@angular/material/list';

import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
  declarations: [
    OverviewComponent,
    ListComponent,
    DetailsComponent,
    DialogConfirmDeleteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AccountRouter),
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
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatTabsModule,
    MatRadioModule,
    MatListModule
  ],
   exports: [],
})
export class AccountsModule { }
