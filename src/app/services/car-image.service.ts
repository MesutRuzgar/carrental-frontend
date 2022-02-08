import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


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
