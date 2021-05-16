import { Routes } from '@angular/router';
import { from } from 'rxjs';
import { DetailsComponent} from './details/details.component'
import { OverviewComponent } from './overview/overview.component'



export const AccountRouter: Routes = [
    { path: 'account', component: OverviewComponent },
    { path: 'account/details', component: DetailsComponent },
    { path: 'account/details/:id', component: DetailsComponent }
];
