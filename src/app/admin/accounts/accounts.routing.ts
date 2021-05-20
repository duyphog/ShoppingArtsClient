import { Routes } from '@angular/router';
import { from } from 'rxjs';
import { DetailsComponent} from './details/details.component'
import { OverviewComponent } from './overview/overview.component'



export const AccountRouter: Routes = [
    { path: 'admin/account', component: OverviewComponent },
    { path: 'admin/account/details', component: DetailsComponent },
    { path: 'admin/account/details/:id', component: DetailsComponent }
];
