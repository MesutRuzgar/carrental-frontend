import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetailDto } from '../models/customerDetailDto';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CustomerDetailDtoService {  
  apiUrl="https://localhost:44322/api/customers/getcustomerdetails"

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<CustomerDetailDto>>{
    return this.httpClient.get<ListResponseModel<CustomerDetailDto>>(this.apiUrl);
  }
}
