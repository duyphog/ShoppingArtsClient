import { Routes } from '@angular/router';
import { from } from 'rxjs';
import { OverviewComponent } from './overview/overview.component';
import { DetailsComponent } from './details/details.component';
export const AdminReportRoutes: Routes = [
    { path: 'admin/report', component: OverviewComponent},
    { path: 'admin/report/details', component: DetailsComponent},
    { path: 'admin/report/details/:id', component: DetailsComponent },
];
