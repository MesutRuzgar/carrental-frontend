import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './component/car/car.component';
import { ColorComponent } from './component/color/color.component';
import { BrandComponent } from './component/brand/brand.component';
import { CustomerComponent } from './component/customer/customer.component';
import { NaviComponent } from './component/navi/navi.component';
import { RentalComponent } from './component/rental/rental.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    ColorComponent,
    BrandComponent,
    CustomerComponent,    
    NaviComponent, RentalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
