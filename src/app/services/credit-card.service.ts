import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiUrl="https://localhost:44322/api/"

  constructor(private httpClient:HttpClient) { }

  getCheckCreditCard(cardHolder:string,cardNumber:string,cvv:string,expirationMonth:string,expirationYear:string):Observable<SingleResponseModel<boolean>>{
    let newPath=this.apiUrl+"creditcards/getcheckcreditcard?cardHolder="+cardHolder+"&cardNumber="+cardNumber+"&cvv="+cvv+"&expirationMonth="+expirationMonth+"&expirationYear="+expirationYear;
    return this.httpClient.get<SingleResponseModel<boolean>>(newPath);
  }  
}
