import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './component/brand/brand.component';
import { CarDetailComponent } from './component/car-detail/car-detail.component';
import { CarComponent } from './component/car/car.component';
import { ColorComponent } from './component/color/color.component';


const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path : "brands" , component : BrandComponent},
  {path : "colors" , component : ColorComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/car-detail/:carId",component:CarDetailComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

