import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';
import { DateTimeService } from 'src/app/services/date-time.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  cartItems:CartItem[]=[];
  

  constructor(private cartService:CartService,
    private dateTimeService:DateTimeService) { }

  ngOnInit(): void {
    this.getCart();
    this.getFullDateTimeNow();
  }
 getCart(){
      this.cartItems=this.cartService.list();     
    }
    calculateTotalRent():number{
      let totalRentalDay: number = 0;
      this.cartItems.forEach(cartItem=>{
        let rentalPeriod:number = this.dateTimeService.calculateRent(cartItem.returnDate,cartItem.rentDate);
        totalRentalDay += rentalPeriod;
      });
      return totalRentalDay;    
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
    getFullDateTimeNow(){
      let rentalDate=this.dateTimeService.getFullDateTimeNow();
      return rentalDate;
    }
}
