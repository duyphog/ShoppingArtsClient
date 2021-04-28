import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home//home.component';
import { ToastrModule } from 'ngx-toastr';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { GenderService } from './_services/gender.service';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { RegisterComponent } from './account/register/register.component';
import { SigninComponent } from './account/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { SlideComponent } from './slide/slide.component';
import { Slider1Component } from './home/slider1/slider1.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TabsComponent } from './home/tabs/tabs.component';
import {MatTabsModule} from '@angular/material/tabs';
import { Slider2Component } from './home/slider2/slider2.component';
import { FooterComponent } from './footer/footer.component';

import { ProfileEditComponent } from './account/myaccount/profile-edit/profile-edit.component';
import { ProfilePwComponent } from './account/myaccount/profile-pw/profile-pw/profile-pw.component';
import { MyhistoryComponent } from './account/myaccount/myhistory/myhistory/myhistory.component';
import { ProfileComponent } from './account/myaccount/profile/profile/profile.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';

import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    SigninComponent,
    AboutUsComponent,
    ContactUsComponent,
    AdminHomeComponent,
    ProfileComponent,
    MyhistoryComponent,
    ProfilePwComponent,
    ProfileEditComponent,
    TabsComponent,
    Slider1Component,
    FooterComponent,
    HeaderComponent,
    SlideComponent,
    Slider2Component


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatTabsModule,
    [FormsModule, ReactiveFormsModule],
    FlexLayoutModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    TabsModule.forRoot()

  ],
  providers: [
    AccountService,
    GenderService,
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
