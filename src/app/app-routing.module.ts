import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from 'src/app/account/register/register.component'
import { SigninComponent } from 'src/app/account/signin/signin.component'
import { HomeComponent } from 'src/app/home/home.component'
import { ContactUsComponent } from 'src/app/contact-us/contact-us.component'
import { AboutUsComponent } from 'src/app/about-us/about-us.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contactus', component: ContactUsComponent},
  { path: 'aboutus', component: AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
