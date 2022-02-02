import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  paymentForm: FormGroup;
  cartItems:CartItem[]=[];  
  returnDate:Date;
  rentDate:Date;
  imgUrl="https://localhost:44322"; 

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.getCart();
 
  }
  getCart(){
    this.cartItems=this.cartService.list();
   
  }
  // goToPayment(cartItems:CartItem[]):void{
  //   this.cartItems;
  // }
  goToPayment():void{
    
  }
  getPath(path:string){
    return this.imgUrl+path;
  }
 
  calculateRent(returnDate:Date,rentDate:Date):number{
   let date1 = new Date(returnDate);
   let date2 = new Date(rentDate);
   var kalangun = date1.getTime() - date2.getTime();
   var numberOfDays = Math.ceil(kalangun / (1000*3600*24))
   return numberOfDays;
  }
 
  calculateTotalAmount():number{
    let totalAmount: number = 0;
    this.cartItems.forEach(cartItem=>{
      let calculateDay = this.calculateRent(cartItem.returnDate,cartItem.rentDate)
      let amount = cartItem.car.dailyPrice * calculateDay
      totalAmount += amount;
    })
    return totalAmount;
  }
 
 
}
