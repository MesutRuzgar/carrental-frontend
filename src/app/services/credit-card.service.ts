import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { CustomerCreditCard } from '../models/customerCreditCard';
import { ListResponseModel } from '../models/listResponseModel';
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

  getSavedCreditCards(customerId: number): Observable<ListResponseModel<CreditCard>> {
    let newPath = this.apiUrl + 'customercreditcards/getcreditcardsbycustomerid'
    return this.httpClient.post<ListResponseModel<CreditCard>>(newPath, customerId);
  }

  saveCreditCard(customerCreditCard: CustomerCreditCard) {
    let newPath = this.apiUrl + 'customercreditcards/savecreditcard'
    return this.httpClient.post<ListResponseModel<CreditCard>>(newPath, customerCreditCard);
  }

  deleteCreditCard(customerCreditCard: CustomerCreditCard) {
    let newPath = this.apiUrl + 'customercreditcards/deletecreditcard'
    return this.httpClient.post<ListResponseModel<CreditCard>>(newPath, customerCreditCard);
  }
}
