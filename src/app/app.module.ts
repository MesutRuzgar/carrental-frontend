import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CarComponent } from './component/car/car.component';
import { ColorComponent } from './component/color/color.component';
import { BrandComponent } from './component/brand/brand.component';
import { CustomerComponent } from './component/customer/customer.component';
import { NaviComponent } from './component/navi/navi.component';
import { RentalComponent } from './component/rental/rental.component';
import { CarDetailComponent } from './component/car-detail/car-detail.component';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { CarFilterPipePipe } from './pipes/car-filter-pipe.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CartSummaryComponent } from './component/cart-summary/cart-summary.component';





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

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
