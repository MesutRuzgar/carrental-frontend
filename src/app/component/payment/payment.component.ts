import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/cart.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { DateTimeService } from 'src/app/services/date-time.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  
  sonuc:boolean=false; 
  cartItems:CartItem[]=[]; 
  saveCreditCardForm:FormGroup;
  paymentForm:FormGroup;
  rememberMe:boolean=false;  
 

  constructor(
    private creditCardService:CreditCardService,
    private toastrService:ToastrService,
    private cartService:CartService,
    private dateTimeService:DateTimeService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router:Router) { }

  ngOnInit(): void {
   this.getCart();
   this.createPaymentForm();
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardHolder: ["", [Validators.required]],
      cardNumber: ["", [Validators.required]],
      cvv: ["", [Validators.required]],
      expirationMonth: ["", [Validators.required]],
      expirationYear: ["", [Validators.required]],         
    })
  }
 
  payment(){
    this.spinner.show();
    if(this.rememberMe){
      this.saveCreditCard();
    }
    if(this.paymentForm.valid){
      let payment = Object.assign({},this.paymentForm.value);
      this.creditCardService.getCheckCreditCard(payment.cardHolder,payment.cardNumber,payment.cvv,payment.expirationMonth,payment.expirationYear)
      .subscribe(response=>{        
        this.sonuc=response.data          
      if(this.sonuc){
        this.toastrService.success("Kart bilgileriniz onaylandı.");
        this.router.navigate(["/payment-success"])
        this.spinner.hide();               
      }
      else{       
        this.toastrService.error("Lütfen kart bilgilerinizi kontrol ediniz.","Kart bilgileriniz onaylanmadı.");
        this.spinner.hide();
      }
      })      
    }
  }

  saveCreditCard(){
    if(this.paymentForm.valid){
      let newUserCreditCard =Object.assign({},this.paymentForm.value);
      this.creditCardService.saveCreditCard(newUserCreditCard).subscribe(response=>{
        this.toastrService.success(response.message);
      },responseError=>{
        console.log(responseError)
        if(responseError.error.success==false){
          this.toastrService.error(responseError.error.message,"İşlem sırasında hata oluştu.")      
        }
        else if(responseError.error.ValidationErrors.length>0){          
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası")            
          }          
        }      
      })      
    }else{
      this.toastrService.error("Formunuz eksik","Lütfen gerekli alanları doldurunuz");
    }    
  }
  

  // createRentals(customerId: number): Rental[] {
  //   let rentals: Rental[] = [];
  //   this.cartItems.forEach(cartItem => {
  //     let rental: Rental = new Rental;
  //     rental.carId = cartItem.car.carId;
  //     rental.customerId = customerId;
  //     rental.rentDate = cartItem.rentDate;
  //     rental.returnDate = cartItem.returnDate;      
  //     rentals.push(rental);
  //   });
  //   return rentals;
  // }

  calculateRent():number{
    let totalRentalPeriod: number = 0;
    this.cartItems.forEach(cartItem=>{
      let rentalPeriod:number = this.dateTimeService.calculateRent(cartItem.returnDate,cartItem.rentDate);
      totalRentalPeriod += rentalPeriod;
    });
    return totalRentalPeriod;    
   }  
   calculateTotalAmount():number{
    let totalAmount: number = 0;
    this.cartItems.forEach(cartItem=>{
      let calculateDay = this.calculateRent()
      let amount = cartItem.car.dailyPrice * calculateDay
      totalAmount += amount;
    })
    return totalAmount;
  }

    getCart(){
      this.cartItems=this.cartService.list();     
    }

    
}
