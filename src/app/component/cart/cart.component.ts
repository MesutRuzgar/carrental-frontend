import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 
  cartItems:CartItem[]=[]; 
  imgUrl="https://localhost:44322"; 

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.getCart();
  }
  getCart(){
    this.cartItems=this.cartService.list();
  }
  goToPayment():void{}
  
  getPath(path:string){
    return this.imgUrl+path;
  }
}
