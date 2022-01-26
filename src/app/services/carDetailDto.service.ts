import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailDto } from '../models/carDetailDto';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarDetailDtoService {
  apiUrl="https://localhost:44322/api/"

  constructor(private httpClient:HttpClient) { }
  getCars():Observable<ListResponseModel<CarDetailDto>>{
    let newPath=this.apiUrl+"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }
  getCarsByBrand(brandName:string):Observable<ListResponseModel<CarDetailDto>>{
    let newPath=this.apiUrl+ "cars/getcarsbybrand?BrandName="+brandName
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);   
   }
   getCarsByColor(colorName:string):Observable<ListResponseModel<CarDetailDto>>{
    let newPath=this.apiUrl+ "cars/getcarsbycolor?colorName="+colorName
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);   
   }
   getCarById(carId:number):Observable<ListResponseModel<CarDetailDto>>{
     let newPath=this.apiUrl+"cars/getcarsbyid?CarId="+carId
     return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
   }
   getCarByImage(carId:number):Observable<ListResponseModel<CarImage>>{
     let newPath=this.apiUrl+"carImages/getimagesbycarid?CarId="+carId
     return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
   }

}
