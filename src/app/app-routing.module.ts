import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrandManagerComponent } from './component/brand-manager/brand-manager.component';
import { BrandComponent } from './component/brand/brand.component';
import { CarAddComponent } from './component/car-add/car-add.component';
import { CarDetailComponent } from './component/car-detail/car-detail.component';
import { CarManagerComponent } from './component/car-manager/car-manager.component';
import { CarComponent } from './component/car/car.component';
import { CartComponent } from './component/cart/cart.component';
import { ColorManagerComponent } from './component/color-manager/color-manager.component';
import { ColorComponent } from './component/color/color.component';
import { CompanyDetailComponent } from './component/company-detail/company-detail.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { PaymentSuccessComponent } from './component/payment-success/payment-success.component';
import { PaymentComponent } from './component/payment/payment.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import { RentalComponent } from './component/rental/rental.component';
import { UserRentalsDetailsComponent } from './component/user-rentals-details/user-rentals-details.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {path:"",pathMatch:"full",component:HomeComponent},
  {path:"cars",component:CarComponent, canActivate:[LoginGuard]},
  {path : "brands" , component : BrandComponent, canActivate:[LoginGuard]},
  {path : "colors" , component : ColorComponent, canActivate:[LoginGuard]},
  {path:"cars/brand/:brandId",component:CarComponent, canActivate:[LoginGuard]},
  {path:"cars/color/:colorId",component:CarComponent, canActivate:[LoginGuard]},
  {path:"cars/car-detail/:carId",component:CarDetailComponent, canActivate:[LoginGuard]},
  {path:"cart",component:CartComponent, canActivate:[LoginGuard]},
  {path:"payment",component:PaymentComponent, canActivate:[LoginGuard]},
  {path:"payment-success",component:PaymentSuccessComponent, canActivate:[LoginGuard]},
  {path:"cars/add",component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"brands/manager",component:BrandManagerComponent, canActivate:[LoginGuard]},
  {path:"colors/manager",component:ColorManagerComponent, canActivate:[LoginGuard]},
  {path:"cars/manager",component:CarManagerComponent, canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profile",component:ProfileComponent, canActivate:[LoginGuard]},
  {path:"user-rental-detail",component:UserRentalsDetailsComponent, canActivate:[LoginGuard]},
  {path:"rentals",component:RentalComponent, canActivate:[LoginGuard]},
  {path:"company-detail",component:CompanyDetailComponent, canActivate:[LoginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

