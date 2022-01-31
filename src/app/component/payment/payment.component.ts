import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  dataLoaded=false;
 

  constructor(private creditCardService:CreditCardService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    
  }
  checkCreditCard(cardHolder:string,cardNumber:string,cvv:string,expirationMonth:string,expirationYear:string){
    this.creditCardService.getCheckCreditCard(cardHolder,cardNumber,cvv,expirationMonth,expirationYear).subscribe(result=>{
          
      if(result.success===true){
        this.toastrService.success(result.message,"Ödeme yapılıyor")        
        this.dataLoaded=true;
      }else{
        this.toastrService.error(result.message,"Lütfen kart bilgilerinizi kontrol ediniz.")
      }
    })
    }
   
}
