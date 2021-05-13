import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home//home.component';
import { ToastrModule } from 'ngx-toastr';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { CategoryService } from './_services/category.service';
import { CartService } from './_services/cart.service';
import { GenderService } from './_services/gender.service';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { RegisterComponent } from './account/register/register.component';
import { SigninComponent } from './account/signin/signin.component';
import { ProductService } from './_services/product.service';
import { PaginationService } from './_services/pagination.service';
import { HttpBaseService } from './_services/http-base.service';
import { AdminProductModule } from './admin/admin-product/admin-product.module';
import { ProductModule } from './product/product.module';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ProfileComponent } from './profile/profile.component';

import { CategoryModule } from './category/category.module';
import { AccountsModule } from './accounts/accounts.module';
import { AccountsService } from './_services/accounts.service';
import { RoleService } from './_services/role.service';
import { DEFAULT_TIMEOUT, JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { NotFoundErrorComponent } from './errors/not-found-error/not-found-error.component';
import { CartComponent } from './cart/cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContactUsService } from './_services/contact-us.service' 



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    SigninComponent,
    ServerErrorComponent,
    NotFoundErrorComponent,
    CartComponent,
    ProfileComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    [FormsModule, ReactiveFormsModule],
    FlexLayoutModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2000,
      extendedTimeOut: 1000,
      progressBar: true,
      positionClass: 'toast-top-right',
    }),
    TabsModule.forRoot(),
    ProductModule,
    CategoryModule,
    AccountsModule,
    AdminProductModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [
    HttpBaseService,
    AccountService,
    GenderService,
    ProductService,
    AccountsService,
    RoleService,
    PaginationService,
    CategoryService,
    ContactUsService,
    CartService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: DEFAULT_TIMEOUT, useValue: 10000 }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
