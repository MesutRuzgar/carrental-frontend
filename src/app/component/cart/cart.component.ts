import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CartItem } from 'src/app/models/cartItem';
import { CarImageService } from 'src/app/services/car-image.service';
import { CartService } from 'src/app/services/cart.service';
import { DateTimeService } from 'src/app/services/date-time.service';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  paymentForm: FormGroup;
  cartItems:CartItem[]=[];  
  


  constructor(private cartService:CartService,
    private carImageService:CarImageService,
    private dateTimeService:DateTimeService) { }

  ngOnInit(): void {
    this.getCart();
 
  }
  getCart(){
    this.cartItems=this.cartService.list();
   
  }
 
  goToPayment():void{
    
  }
  getImagePath(imagePath:string){ 
    return this.carImageService.getImagePath(imagePath);
   }
   
 calculateRent(returnDate:Date,rentDate:Date):number{
    let totalRentalPeriod: number = 0;  
     let rentalPeriod:number = this.dateTimeService.calculateRent(returnDate,rentDate);
        totalRentalPeriod += rentalPeriod;     
          return totalRentalPeriod;  
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
