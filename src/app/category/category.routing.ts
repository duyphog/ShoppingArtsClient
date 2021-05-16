import { Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { DetailsComponent } from './details/details.component'

export const CategoryRoutes: Routes = [
    { path: 'category', component: OverviewComponent },
    { path: 'category/details', component: DetailsComponent },
    { path: 'category/details/:id', component: DetailsComponent }
];
