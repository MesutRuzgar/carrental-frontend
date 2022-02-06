import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrandManagerComponent } from './component/brand-manager/brand-manager.component';
import { BrandComponent } from './component/brand/brand.component';
import { CarAddComponent } from './component/car-add/car-add.component';
import { CarDetailComponent } from './component/car-detail/car-detail.component';
import { CarManagerComponent } from './component/car-manager/car-manager.component';
import { CarComponent } from './component/car/car.component';
import { CartComponent } from './component/cart/cart.component';
import { ColorAddComponent } from './component/color-add/color-add.component';
import { ColorManagerComponent } from './component/color-manager/color-manager.component';
import { ColorComponent } from './component/color/color.component';
import { LoginComponent } from './component/login/login.component';
import { PaymentSuccessComponent } from './component/payment-success/payment-success.component';
import { PaymentComponent } from './component/payment/payment.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';


const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path : "brands" , component : BrandComponent},
  {path : "colors" , component : ColorComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/car-detail/:carId",component:CarDetailComponent},
  {path:"cart",component:CartComponent},
  {path:"payment",component:PaymentComponent},
  {path:"payment-success",component:PaymentSuccessComponent},
  {path:"colors/add",component:ColorAddComponent},
  {path:"cars/add",component:CarAddComponent},
  {path:"brands/manager",component:BrandManagerComponent},
  {path:"colors/manager",component:ColorManagerComponent},
  {path:"cars/manager",component:CarManagerComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profile",component:ProfileComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

