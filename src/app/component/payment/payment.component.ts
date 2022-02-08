import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/cart.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UserForLogin } from 'src/app/models/userForLogin';
import { AuthService } from 'src/app/services/auth.service';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import { RentModel } from 'src/app/models/rentModel';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  currentUser: UserForLogin;
  sonuc:boolean=false; 
  cartItems:CartItem[]=[]; 
  saveCreditCardForm:FormGroup;
  paymentForm:FormGroup;
  rememberMe:boolean=false; 
  customerId:number;
 
  
  
 

  constructor(
    private customerService:CustomerService,
    private creditCardService:CreditCardService,
    private toastrService:ToastrService,
    private cartService:CartService,
    private dateTimeService:DateTimeService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router:Router,
    private authService:AuthService,
    private rentalService:RentalService) { }

  ngOnInit(): void {
   this.getCart();
   this.createPaymentForm();
   this.currentUser = this.authService.getUser()!;
   this.getCustomerId();
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
    
    if(this.rememberMe){
      this.saveCreditCard();
    }
    if(this.paymentForm.valid){
      let payment = Object.assign({},this.paymentForm.value);
      this.creditCardService.getCheckCreditCard(payment.cardHolder,payment.cardNumber,payment.cvv,payment.expirationMonth,payment.expirationYear)
      .subscribe(response=>{        
        this.sonuc=response.data          
      if(this.sonuc){
        this.toastrService.success("Ödeme Başarılı."); 
        this.getCustomerId().then(customerId => {   
            this.cartItems.forEach(cartItem=>{
              let rent : RentModel={
                carId:cartItem.car.carId,
                rentDate:cartItem.rentDate,
                returnDate:cartItem.returnDate,
                customerId:customerId,
                totalAmount : this.calculateTotalAmount()
              }; 
              this.rentalService.rent(rent).subscribe(response=>{   
                this.toastrService.success("Bizi Ettiğiniz İçin Teşekkür Ederiz.")             
            })          
         });  
                         
        })       
        this.router.navigate(["/payment-success"])
                     
      }
      else{       
        this.toastrService.error("Lütfen kart bilgilerinizi kontrol ediniz.","Kart bilgileriniz onaylanmadı.");       
      }
      })      
    }
  }

  saveCreditCard(){
    if(this.paymentForm.valid){
      let newUserCreditCard =Object.assign({},this.paymentForm.value);
      this.creditCardService.saveCreditCard(newUserCreditCard).subscribe(response=>{
        newUserCreditCard.customerId=this.getCustomerId();
        this.toastrService.success(response.message);
      },responseError=>{
          if(responseError.error){
          this.toastrService.error("Kart Bilgileri Mevcut!","Ödeme Bilgileri Kaydedilemedi!")      
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
  
  getCustomerId(): Promise<number> {
    return new Promise<number>((methodResolve) => {
      this.customerService.getCustomerByUserId(this.currentUser.id).subscribe(successResult => {
        methodResolve(successResult.data.id);      
      }, () => {  //If the user is not a customer, save it as a customer
        let addedCustomer = new Customer;
        addedCustomer.userId = this.currentUser.id;
        addedCustomer.companyName = " Rent A Car ";
        this.customerService.addCustomer(addedCustomer).subscribe(successAddedResult => {
          methodResolve(successAddedResult.data);
        })
      })
    })
  }

  createRentals(customerId: number){
   let rentals: RentModel[]=[];    
    this.cartItems.forEach(cartItem => {
      let rental: RentModel={        
        carId : cartItem.car.carId,
        customerId : customerId,
        rentDate : cartItem.rentDate,
        returnDate : cartItem.returnDate,
        totalAmount : this.calculateTotalAmount()   
      };            
      rentals.push(rental);    
    });
    return rentals;
  }

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