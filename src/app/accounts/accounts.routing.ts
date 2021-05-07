import { Routes } from '@angular/router';
import { from } from 'rxjs';


import { OverviewComponent } from './overview/overview.component'



export const AccountRouter: Routes = [
    { path: 'account', component: OverviewComponent },
];
