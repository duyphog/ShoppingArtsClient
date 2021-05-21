import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from 'src/app/account/register/register.component';
import { SigninComponent } from 'src/app/account/signin/signin.component';

import { ServerErrorComponent } from 'src/app/errors/server-error/server-error.component';
import { NotFoundErrorComponent } from 'src/app/errors/not-found-error/not-found-error.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { CategoryComponent } from 'src/app/category/category.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'signin', component: SigninComponent },
  { path: 'cart', component: CartComponent },
  { path: 'check-out', component: CheckOutComponent},
  { path: 'my-order', component: MyOrderComponent},
  { path: 'category/:id', component: CategoryComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'aboutus', component: RegisterComponent },
  { path: 'server-error', component: ServerErrorComponent},
  { path: 'not-found', component: NotFoundErrorComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'contact-us', component: ContactUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
