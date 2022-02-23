import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule  } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner"; 



import { CarComponent } from './component/car/car.component';
import { ColorComponent } from './component/color/color.component';
import { BrandComponent } from './component/brand/brand.component';
import { CustomerComponent } from './component/customer/customer.component';
import { NaviComponent } from './component/navi/navi.component';
import { CarDetailComponent } from './component/car-detail/car-detail.component';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { CarFilterPipePipe } from './pipes/car-filter-pipe.pipe';
import { CartSummaryComponent } from './component/cart-summary/cart-summary.component';
import { RentalComponent } from './component/rental/rental.component';
import { RentModalComponent } from './component/rent-modal/rent-modal.component';
import { CartComponent } from './component/cart/cart.component';
import { PaymentComponent } from './component/payment/payment.component';
import { PaymentSuccessComponent } from './component/payment-success/payment-success.component';
import { BrandAddComponent } from './component/brand-add/brand-add.component';
import { ColorAddComponent } from './component/color-add/color-add.component';
import { CarAddComponent } from './component/car-add/car-add.component';
import { BrandManagerComponent } from './component/brand-manager/brand-manager.component';
import { BrandUpdateComponent } from './component/brand-update/brand-update.component';
import { BrandDeleteComponent } from './component/brand-delete/brand-delete.component';
import { ColorDeleteComponent } from './component/color-delete/color-delete.component';
import { ColorUpdateComponent } from './component/color-update/color-update.component';
import { ColorManagerComponent } from './component/color-manager/color-manager.component';
import { CarDeleteComponent } from './component/car-delete/car-delete.component';
import { CarUpdateComponent } from './component/car-update/car-update.component';
import { CarManagerComponent } from './component/car-manager/car-manager.component';
import { LoginComponent } from './component/login/login.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { RegisterComponent } from './component/register/register.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ProfileComponent } from './component/profile/profile.component';
import { UserRentalsDetailsComponent } from './component/user-rentals-details/user-rentals-details.component';
import { CompanyDetailComponent } from './component/company-detail/company-detail.component';
import { HomeComponent } from './component/home/home.component';
import { FooterComponent } from './component/footer/footer.component'; 






@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    ColorComponent,
    BrandComponent,
    CustomerComponent,    
    NaviComponent,
    RentalComponent,
    CarDetailComponent,
    BrandFilterPipePipe,
    ColorFilterPipePipe,
    CarFilterPipePipe,
    CartSummaryComponent,
    RentModalComponent,
    CartComponent,
    PaymentComponent,
    PaymentSuccessComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    BrandManagerComponent,
    BrandUpdateComponent,
    BrandDeleteComponent,
    ColorDeleteComponent,
    ColorUpdateComponent,
    ColorManagerComponent,
    CarDeleteComponent,
    CarUpdateComponent,
    CarManagerComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UserRentalsDetailsComponent,
    CompanyDetailComponent,
    HomeComponent,
    FooterComponent,
    
  

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,    
    BrowserAnimationsModule,
    NgbModule,
    MatDialogModule,    
    ReactiveFormsModule,
    NgxSpinnerModule,

    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
   
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
