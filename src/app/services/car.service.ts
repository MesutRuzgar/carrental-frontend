import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModule';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44322/api/"

  constructor(private httpClient:HttpClient) { }
  getCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrandId(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+ "cars/getcarsbybrandid?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);   
   }
   getCarsByColorId(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+ "cars/getcarsbycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);   
   }
   getCarById(carId:number):Observable<ListResponseModel<Car>>{
     let newPath=this.apiUrl+"cars/getcarsbyid?CarId="+carId
     return this.httpClient.get<ListResponseModel<Car>>(newPath);
   }
   getCarByImage(carId:number):Observable<ListResponseModel<CarImage>>{
     let newPath=this.apiUrl+"carImages/getimagesbycarid?CarId="+carId
     return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
   }
   getCarsWithBrandAndColor(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
     let newPath=this.apiUrl+"cars/getcarswithbrandandcolor?brandId="+brandId+"&colorId="+colorId
     return this.httpClient.get<ListResponseModel<Car>>(newPath);
   }
   add(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Cars/add";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
  delete(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Cars/delete";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
  update(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Cars/update";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

}
