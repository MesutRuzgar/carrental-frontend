import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  

  constructor(private httpClient:HttpClient) { }
  apiUrl="https://localhost:44322/api/"
  imgUrl="https://localhost:44322"


  getImagePath(imagePath: string) {
    return this.imgUrl + imagePath
  }
}
