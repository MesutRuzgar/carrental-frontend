import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerDetailDto } from '../models/customerDetailDto';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {  
  apiUrl="https://localhost:44322/api/customers/"

  constructor(private httpClient:HttpClient) { }

  getCustomerDetails():Observable<ListResponseModel<CustomerDetailDto>>{
    let newPath = this.apiUrl + 'getcustomerdetails'
    return this.httpClient.get<ListResponseModel<CustomerDetailDto>>(newPath);
  }
  getCustomersAll(): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  getCustomerByUserId(userId: number): Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + 'getbyuserid?userid=' + userId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }
  addCustomer(customer: Customer): Observable<SingleResponseModel<number>> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<SingleResponseModel<number>>(newPath, customer);
  }
}
