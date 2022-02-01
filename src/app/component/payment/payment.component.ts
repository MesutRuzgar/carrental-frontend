import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cardHolder:string;
  cardNumber:string;
  cvv:string;
  expirationMonth:string;
  expirationYear:string;
  sonuc:boolean=false; 
  cartItems:CartItem[]=[]; 
 

  constructor(private creditCardService:CreditCardService,
    private toastrService:ToastrService,private cartService:CartService) { }

  ngOnInit(): void {
   this.getCart();
  }


  checkCreditCard(cardHolder:string,cardNumber:string,cvv:string,expirationMonth:string,expirationYear:string){
    this.creditCardService.getCheckCreditCard(cardHolder,cardNumber,cvv,expirationMonth,expirationYear).subscribe(result=>{
      this.sonuc=result.data          
      if(this.sonuc){
        this.toastrService.success("Kart bilgileriniz onaylandı.","Ödeme yapılıyor")        
      }
      else{
        this.toastrService.error("Lütfen kart bilgilerinizi kontrol ediniz.","Kart bilgileriniz onaylanmadı.")
      }
    })
    }
    getCart(){
      this.cartItems=this.cartService.list();     
    }
}
