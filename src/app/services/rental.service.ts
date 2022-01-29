import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModule';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:44322/api/"

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath= this.apiUrl+"rentals/getrentaldetails";
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getCheckRentDate(carId:number,rentDate:string,returnDate:string):Observable<SingleResponseModel>{
    let newPath=this.apiUrl+"rentals/getcheckrentdate?carId="+carId+"&rentDate="+rentDate+"&returnDate="+returnDate;
    return this.httpClient.get<SingleResponseModel>(newPath);
  }
 
}
