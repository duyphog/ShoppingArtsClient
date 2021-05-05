import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { OverviewComponent } from './overview/overview.component';

export const ProductRoutes: Routes = [
    { path: 'product', component: OverviewComponent },
    { path: 'product/details', component: DetailsComponent },
    { path: 'product/details/:id', component: DetailsComponent }
];
