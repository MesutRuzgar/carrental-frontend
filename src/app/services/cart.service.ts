import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from '../models/car';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { DateTimeService } from './date-time.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private toastrService:ToastrService,
    private dateTimeService:DateTimeService) { }
  
  addToCart(car:Car,rentDate:Date,returnDate:Date){
    let item = CartItems.find(c=>c.car.carId===car.carId);
    if(item){
      this.toastrService.error("Araç Tekrar eklenemez","Araç daha önce sepete eklenmiş!")
    }else{
      let cartItem=new CartItem();
      cartItem.car= car;
      cartItem.rentDate=rentDate;
      cartItem.returnDate=returnDate;
     
      CartItems.push(cartItem)
      this.toastrService.success("Sepete eklendi.",car.modelName);
      this.toastrService.success("Ödeme için sepetinize gidiniz. "); 
      
    }
  }
  removeFromCart(car:Car){
    let item:CartItem = CartItems.find(c=>c.car.carId===car.carId);
    CartItems.splice(CartItems.indexOf(item),1);
  }

    list():CartItem[]{
        return CartItems;
    }
 
}
