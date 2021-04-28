import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from 'src/app/account/register/register.component';
import { SigninComponent } from 'src/app/account/signin/signin.component';
import { ProfileComponent } from 'src/app/account/myaccount/profile/profile/profile.component';
import { ProfileEditComponent } from 'src/app/account/myaccount/profile-edit/profile-edit.component';
import { ProfilePwComponent } from 'src/app/account/myaccount/profile-pw/profile-pw/profile-pw.component';
import { MyhistoryComponent } from 'src/app/account/myaccount/myhistory/myhistory/myhistory.component';
import { AdminHomeComponent } from 'src/app/admin/admin-home/admin-home.component';
import { HomeComponent } from 'src/app/home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard } from './_guards/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'login', component: SigninComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'admin', component: AdminHomeComponent, canActivate: [AdminGuard] },
    ]
  },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile-edit', component: ProfileEditComponent },
  { path: 'profile-password', component: ProfilePwComponent },
  { path: 'myhistory', component: MyhistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
