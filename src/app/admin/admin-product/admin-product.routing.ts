import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { OverviewComponent } from './overview/overview.component';

export const AdminProductRoutes: Routes = [
    { path: 'admin/product', component: OverviewComponent },
    { path: 'admin/product/details', component: DetailsComponent},
    { path: 'admin/product/details/:id', component: DetailsComponent },
];
