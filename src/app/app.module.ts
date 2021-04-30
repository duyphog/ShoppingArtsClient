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
import { GenderService } from './_services/gender.service';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { RegisterComponent } from './account/register/register.component';
import { SigninComponent } from './account/signin/signin.component';
import { ProductService } from './_services/product.service';
import { PaginationService } from './_services/pagination.service';
import { HttpBaseService } from './_services/http-base.service';
import { ProductModule } from './product/product.module';
import { MatSelect } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    SigninComponent
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
      positionClass: 'toast-top-right'
    }),
    TabsModule.forRoot(),
    ProductModule
  ],
  providers: [
    HttpBaseService,
    AccountService,
    GenderService,
    ProductService,
    PaginationService,
    CategoryService,
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
