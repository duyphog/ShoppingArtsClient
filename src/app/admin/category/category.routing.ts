import { Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { DetailsComponent } from './details/details.component'

export const CategoryRoutes: Routes = [
    { path: 'admin/category', component: OverviewComponent },
    { path: 'admin/category/details', component: DetailsComponent },
    { path: 'admin/category/details/:id', component: DetailsComponent }
];
