import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from 'src/app/account/register/register.component'
import { SigninComponent } from 'src/app/account/signin/signin.component'
import { HomeComponent } from 'src/app/home/home.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: '', pathMatch: 'full', redirectTo: 'signin' },
  // { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
