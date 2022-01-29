import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  
  addToCart(car:Car){
    let item = CartItems.find(c=>c.car.carId===car.carId);
    if(item){
      item.quantity+=1;
    }else{
      let carItem=new CartItem();
      carItem.car= car;
      carItem.quantity=1;
      CartItems.push(carItem)
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
